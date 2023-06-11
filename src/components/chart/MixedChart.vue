<template>
  <BarChart
    :chartData="chartData"
    :options="chartOptions"
    :plugins="chartPlugins"
    ref="chart"
    style="flex: 1"
    class="mixed-chart"
    :id="name"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import { BarChart } from "vue-chart-3";
import {
  black,
  lightGrey,
  primaryColor,
  primaryColorLighter,
  white,
} from "@/helpers/colors";

import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartAnnotations from "chartjs-plugin-annotation";

import {
  Chart,
  BarController,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";
import { useDataState } from "@/state/Data";
import { formatMetricValue, getMetricValue } from "@/helpers/metric";
import { AutomaticDatasetType, AxisType, VisualSettings } from "./Chart.vue";
import { getChartColor } from "./helper";
import { getCssVariable } from "@/helpers/getCssVariable";
import { chunkifyText } from "@/helpers/display";
import { sortedUniq } from "lodash";

Chart.register(
  PointElement,
  LineController,
  LineElement,
  BarController,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  ChartAnnotations
);
export default defineComponent({
  name: "MixedChart",
  setup(props, { expose, emit }) {
    const { metrics } = useDataState();

    const inputDatasets = computed<MixedChartDatasetType[]>(() => {
      if (props.datasets) {
        return props.datasets;
      } else {
        if (props.automaticDatasets === "companySpecialMetric") {
          const newDatasets: MixedChartDatasetType[] = [];

          Object.keys(
            metrics.value?.[props.companyId ?? "??"]?.[
              props.specialMetricId ?? "??"
            ] ?? {}
          )
            .sort()
            .map((specialMetricKey) => {
              if (specialMetricKey !== "_meta") {
                const specialMetricNames =
                  metrics.value?.[props.companyId ?? "??"]?.[
                    props.specialMetricId ?? "??"
                  ]?.["_meta"]?.["labels"]?.[specialMetricKey];
                const specialMetricName =
                  specialMetricNames?.[
                    Object.keys(specialMetricNames ?? {})[0]
                  ]?.["en"];

                newDatasets.push({
                  label: specialMetricName,
                  type: "companyMetricDevelopment",
                  metric: props.specialMetricId ?? "??",
                  specialMetricKey,
                  company: props.companyId ?? "??",
                });
              }
            });

          return newDatasets;
        } else {
          return [
            {
              label: "test",
              type: "companyMetricDevelopment",
              metric: props.specialMetricId ?? "unknown",
              company: "test",
            },
          ];
        }
      }
    });
    const colorScheme = computed<MixedChartColorSchemes>(() => {
      const amountOfBars =
        inputDatasets.value?.filter(
          (dataset) => dataset.display === "bar" || !dataset.display
        )?.length ?? 0;
      const amountOfLines =
        inputDatasets.value?.filter((dataset) => dataset.display === "line")
          ?.length ?? 0;

      if (props.xAxisGrouping === "dataset") {
        return "timescale";
      } else if (amountOfLines === 0 && amountOfBars === 1) {
        return "bar";
      } else if (amountOfBars === 0 && amountOfLines === 1) {
        return "line";
      } else if (
        amountOfBars === 0 &&
        (amountOfLines === 2 || amountOfLines === 4)
      ) {
        return "2-lines";
      } else if (amountOfBars === 1 && amountOfLines === 1) {
        return "bar-line";
      } else if (amountOfBars === 2 && amountOfLines === 1) {
        return "2bar-line";
      } else {
        return "default";
      }
    });
    const chartData = computed(() => {
      const datasets: {
        label: string;
        data: number[] | { [key: string]: number };
        backgroundColor?: string | string[];
        type?: string;
        borderColor?: string;
        borderWidth?: number;
        order?: number;
        yAxisID?: string;
        groupKey?: string;
      }[] = [];

      // Get labels
      const labels: string[] = [];

      if (props.xAxisGrouping === "year") {
        // Group per year
        // Find the years for the first metric
        const incompleteLabels = sortedUniq(
          (inputDatasets.value ?? [])
            .map((ds) => {
              return Object.keys(
                metrics.value?.[props.companyId ?? ""]?.[ds.metric] ?? {}
              );
            })
            .flat()
            .sort()
        );
        for (
          let i = parseInt(incompleteLabels[0]);
          i <= parseInt(incompleteLabels[incompleteLabels.length - 1]);
          i++
        ) {
          labels.push(`${i}`);
        }
      }
      // Get data
      if (props.xAxisGrouping === "year") {
        // Group data per year
        // Add datasets per dataset
        let years: string[] = [];
        inputDatasets.value.map((datasetInfo, datasetIndex) => {
          const data: { [key: string]: number } = {};
          if (datasetInfo.type === "companyMetricDevelopment") {
            const companyMetric =
              metrics.value?.[props.companyId ?? ""]?.[datasetInfo.metric];
            years = sortedUniq(
              [...years, Object.keys(companyMetric ?? {})].flat().sort()
            );

            const fullYears: number[] = [];
            for (
              let i = parseInt(years[0]);
              i <= parseInt(years[years.length - 1]);
              i++
            ) {
              fullYears.push(i);
            }
            fullYears.map((year) => {
              data[`${year}`] = getMetricValue(
                companyMetric?.[year],
                datasetInfo.metric
              );
            });
          } else {
            console.error(`Unknown data set type ${datasetInfo.type}`);
          }

          // Perform dataset value based checks
          let showDataset = true;

          // Process hideWhenAllValuesAreZero, hides dataset if all values are literally zero
          if (datasetInfo.hideWhenAllValuesAreZero) {
            let allValuesAreZero = true;
            Object.keys(data).map((dataKey) => {
              if (data[dataKey] !== 0) {
                allValuesAreZero = false;
              }
            });
            showDataset = !allValuesAreZero;
          }

          if (showDataset)
            datasets.push({
              label: datasetInfo.label,
              data: data,
              backgroundColor:
                datasetInfo.color ??
                getChartColor(datasetIndex, colorScheme.value),
              borderColor:
                datasetInfo.color ??
                getChartColor(datasetIndex, colorScheme.value),
              borderWidth: datasetInfo.display === "line" ? 3 : 0,
              type: datasetInfo.display ?? "bar",
              order: datasetIndex - (datasetInfo.display === "line" ? 10 : 0), // Always put lines on top
              yAxisID: datasetInfo.axis ?? "y",
            });
        });
      }

      return {
        labels,
        datasets,
      };
    });

    watch(chartData, (newVal, oldVal) => {
      if (newVal.labels.length !== oldVal.labels.length) {
        chart.value.chartInstance.config.data.labels = newVal.labels;
      }
    });

    const chartOptions = computed(() => {
      // To prevent overhead, find the first dataset for each axis only once
      const firstYAxisDataset = inputDatasets.value.filter(
        (ds) => ds.axis === "y" || !ds.axis
      )?.[0];
      const firstY1AxisDataset = inputDatasets.value.filter(
        (ds) => ds.axis === "y1"
      )?.[0];

      return {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.77777777778,
        spanGaps: true,
        animation: {
          delay: (context) =>
            context.dataIndex * 50 + context.datasetIndex * 100,
        },
        scales: {
          x: props.axes?.x
            ? // Customized x axis
              {}
            : // Default x axis
              {
                grid: {
                  drawBorder: false,
                  drawTicks: false,
                  drawOnChartArea: false,
                  color: (context) =>
                    context.tick?.value === 0 ? "#BBBBBB" : null,
                },
                ticks: {
                  maxRotation: 0,
                  callback: (labelIndex: number) => {
                    // Determine chunk size based on the amount of ticks on the X axis
                    const xAxisSize = chartData.value.labels.length;
                    return chunkifyText(
                      chartData.value.labels[labelIndex] ?? "",
                      xAxisSize > 10 ? 5 : xAxisSize > 5 ? 14 : 20
                    );
                  },
                },
              },
          y: props.axes?.y
            ? // Customized y axis
              {
                display: false,
                position: props.axes.y.position ?? "left",
                beginAtZero: true,
                grace: "20%",
                title: {
                  display: !!props.axes.y.label,
                  text: props.axes.y.label,
                },
                grid: {
                  drawTicks: false,
                  drawOnChartArea: true,
                  drawBorder: false,
                  color: (context) =>
                    context.tick?.value === 0 ? "#e5e5e5" : null,
                },
                ticks: {
                  callback: (value: number) =>
                    firstYAxisDataset?.metric
                      ? formatMetricValue(value, firstYAxisDataset.metric, {
                          formatAs: props.numberFormatting,
                          decimals: 0,
                        })
                      : value,
                },
              }
            : // Default Y axis
              {
                display: true,
                beginAtZero: true,
                grace: "20%",
                /*title: {
                  display:
                    props.numberFormatting !== 'auto' &&
                    getMetricInfo(firstYAxisDataset.metric).type === 'currency',
                  text:
                    props.numberFormatting !== 'auto' &&
                    t(`global.numbers.${props.numberFormatting}.long`),
                },*/
                grid: {
                  drawBorder: false,
                  drawTicks: false,
                  drawOnChartArea: true,
                  color: (context) =>
                    context.tick?.value === 0 ? "#e5e5e5" : null,
                },
                ticks: {
                  display: false,
                },
              },
          ...(props.axes?.y1
            ? {
                y1: {
                  display: false,
                  beginAtZero: true,
                  grace: "20%",
                  position: props.axes.y1.position ?? "right",
                  title: {
                    display: !!props.axes.y1.label,
                    text: props.axes.y1.label,
                  },
                  grid: {
                    drawBorder: false,
                    drawTicks: false,
                    drawOnChartArea: false,
                    color: (context) =>
                      context.tick?.value === 0 ? "#BBBBBB" : null,
                  },
                  ticks: {
                    callback: (value: number) =>
                      firstY1AxisDataset?.metric
                        ? formatMetricValue(value, firstY1AxisDataset.metric, {
                            formatAs: props.numberFormatting,
                            decimals: 0,
                          })
                        : value,
                  },
                },
              }
            : {}),
        },
        datasets: {
          line: { tension: props.visual?.line?.tension ?? 0 },
          bar: {
            barPercentage: props.visual?.bar?.width ?? 0.6,
            barThickness: "flex",
          },
        },
        plugins: {
          datalabels: {
            color: "black",
            anchor: "end",
            align: "end",
            offset: 5,
            display: "auto",
            formatter: (value, context) => {
              let metric, itemValue;
              if (props.xAxisGrouping === "year") {
                metric = inputDatasets.value[context.datasetIndex].metric;
                itemValue =
                  context.dataset.data &&
                  context.dataset.data[
                    Object.keys(context.dataset.data)?.[context.dataIndex]
                  ];
              }
              return !itemValue &&
                inputDatasets.value[context.datasetIndex]?.hideNulls
                ? ""
                : metric
                ? formatMetricValue(itemValue, metric, {
                    formatAs: props.numberFormatting,
                    skipFormatPrefix: props.numberFormatting !== "auto",
                  })
                : itemValue;
            },
          },
          legend: {
            display: (context) => context.chart.data.datasets.length > 1,

            labels: {
              fontFamily: "Proxima Nova",
              fontSize: "6.25rem",
              boxWidth: 20,
              boxHeight: 20,
              // In the datasets we have reshuffled the items for line charts to always appear on top, yet we do not want this reflected in the legend, so we substract 10 during the sorting process
              sort: (a, b) => {
                let aIndex = a.datasetIndex;
                if (inputDatasets.value?.[a.datasetIndex]?.type === "line")
                  aIndex -= 10;
                let bIndex = b.datasetIndex;
                if (inputDatasets.value?.[b.datasetIndex]?.type === "line")
                  bIndex -= 10;
                return aIndex - bIndex;
              },
            },
            onClick: (_, legendItem, legend) => {
              // If this dataset is visible, then we only focus on this dataset (hide other datasets)
              if (legendItem.hidden === false) {
                // If all other datasets are visible, we will hide them (focus on this dataset)
                // If this is the only visible dataset, we will show all other datasets (undo focus)
                if (
                  legend.chart.data.datasets.filter((ds) => ds.hidden === true)
                    .length === 0
                ) {
                  // Hide all other datasets
                  legend.chart.data.datasets.map((ds) => {
                    ds.hidden = ds.label !== legendItem.text;
                  });
                } else if (
                  legend.chart.data.datasets.filter((ds) => ds.hidden !== true)
                    .length === 1
                ) {
                  // Make all datasets visible
                  legend.chart.data.datasets.map((ds) => {
                    ds.hidden = false;
                  });
                } else {
                  legend.chart.data.datasets[legendItem.datasetIndex].hidden =
                    true;
                }
              } else {
                // If this dataset is hidden then we make ONLY this dataset visible again
                legend.chart.data.datasets[legendItem.datasetIndex].hidden =
                  false;
              }
              legend.chart.update();
            },
          },
          tooltip: {
            yAlign: "bottom",
            xAlign: "center",
            backgroundColor: white(),
            borderColor: lightGrey(),
            borderWidth: 1,
            bodyColor: black(),
            titleColor: primaryColor(),
            titleMarginBottom: 10,
            footerColor: primaryColorLighter(),
            displayColors: false,
            yPadding: 10,
            xPadding: 14,
            cornerRadius: 4,
            bodyFontSize: getCssVariable("--font-size-body"),
            bodyFontStyle: getCssVariable("--font-weight-bold"),
            footerFontSize: 0,
            padding: 10,
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${formatMetricValue(
                  item.raw ?? item.parsed.y,
                  inputDatasets.value[
                    props.xAxisGrouping === "dataset"
                      ? item.dataIndex
                      : item.datasetIndex
                  ].metric,
                  { formatAs: props.numberFormatting }
                )}`,
            },
          },
          annotation: {
            drawTime: "afterDraw",
            annotations: props.referenceLine
              ? [
                  {
                    type: "line",
                    scaleID: "y",
                    value: props.referenceLine().value,
                    endValue: props.referenceLine().value,
                    borderColor:
                      props.referenceLine().color ??
                      getCssVariable("--secondary-color"),
                    borderWidth: 1,
                    label: {
                      content: props.referenceLine().title,
                      position: "end",
                      backgroundColor: "white",
                      borderRadius: 0,
                      padding: 2,
                      color:
                        props.referenceLine().color ??
                        getCssVariable("--secondary-color"),
                      enabled: !!props.referenceLine().title,
                      yAdjust: -10,
                      font: { weight: "regular" },
                    },
                  },
                ]
              : [],
          },

          title: {
            display: props.numberFormatting !== "auto" || props.sizeIndicator,
            text: props.sizeIndicator ?? "",
            align: "start",
            font: { weight: "default" },
          },
        },
      };
    });
    const WhiteBackgroundColor = {
      id: "custom_canvas_background_color",
    };

    const chartPlugins = [
      ChartDataLabels,
      WhiteBackgroundColor,
      ChartAnnotations,
    ];

    const chart = ref();
    expose({ chart });

    onMounted(() => {
      if (
        (inputDatasets?.value ?? []).length < 1 ||
        chartData.value.datasets.length < 1
      ) {
        emit("chart-is-empty");
      } else {
        // Since we do have datasets, we can now check if there actually is data within the datasets
        let hasData = false;
        chartData.value.datasets.map((data) => {
          if (data.data.length > 0 || Object.keys(data.data).length > 0) {
            hasData = true;
          }
        });
        if (!hasData) emit("chart-is-empty");
      }
    });
    watch(inputDatasets, () => {
      if (
        (inputDatasets?.value ?? []).length < 1 ||
        chartData.value.datasets.length < 1
      ) {
        emit("chart-is-empty");
      } else {
        // Since we do have datasets, we can now check if there actually is data within the datasets
        let hasData = false;
        chartData.value.datasets.map((data) => {
          if (data.data.length > 0 || Object.keys(data.data).length > 0) {
            hasData = true;
          }
        });
        if (!hasData) emit("chart-is-empty");
      }
    });

    return { chartData, chartOptions, chartPlugins, chart, colorScheme };
  },
  props: {
    name: { required: true, type: String },
    datasets: {
      required: false,
      type: Array as PropType<MixedChartDatasetType[]>,
    },
    visual: { required: false, type: Object as PropType<VisualSettings> },
    numberFormatting: {
      type: String as PropType<"k" | "m" | "b" | "auto">,
      required: true,
    },
    sizeIndicator: { type: String, required: false },
    axes: { required: false, type: Object as PropType<AxisType> },
    xAxisGrouping: {
      type: String as PropType<"year" | "dataset">,
      required: true,
    },
    automaticDatasets: {
      type: String as PropType<AutomaticDatasetType>,
      required: false,
    },
    companyId: { type: String, required: false },
    specialMetricId: { type: String, required: false },
    referenceLine: {
      type: Function as PropType<
        () => { title?: string; value: number; color?: string }
      >,
      required: false,
    },
  },
  emits: ["chart-is-empty"],
  components: { BarChart },
});
export type MixedChartColorSchemes =
  | "default"
  | "timescale"
  | "customer"
  | "bar-line"
  | "2bar-line"
  | "bar"
  | "multiple-bar"
  | "line"
  | "2-lines";

export interface MixedChartDatasetType {
  label: string;
  type: "companyMetricDevelopment" | string;
  metric: string;
  specialMetricKey?: string;
  company: string;
  color?: string;
  colorScheme?: MixedChartColorSchemes;
  display?: "bar" | "line" | null | undefined;
  axis?: "y" | "y1";
  hideWhenAllValuesAreZero?: true;
  // Don't label nulls
  hideNulls?: true;
}
</script>
<style lang="scss" scoped>
.mixed-chart {
  width: 100%;
  transition: all 0.3s;
  height: 100%;
}
</style>
