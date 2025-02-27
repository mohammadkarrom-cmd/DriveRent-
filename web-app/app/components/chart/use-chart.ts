import LODASH from "lodash";
import { ApexOptions } from "apexcharts";
import { useSettingsContext } from "@/lib/context/settings/setting-context";

interface Options extends ApexOptions {
  [key: string]: unknown;
}

export interface AreaAndBarChartProps {
  categories: string[] | number[] | Date[];
  series: { name: string; data: number[] }[];
}

export interface RadialAndDonutAndPieChartProps {
  labels: string[];
  series: number[];
}

// Define your Tailwind colors here
const colors = {
  primary: {
    light: "#a5d6a7",
    main: "#4caf50",
    dark: "#388e3c"
  },
  secondary: {
    light: "#ddd6fe",
    main: "#a78bfa",
    dark: "#7c3aed"
  },
  info: {
    light: "#bae6fd",
    main: "#38bdf8",
    dark: "#0284c7"
  },
  success: {
    light: "#bbf7d0",
    main: "#4ade80",
    dark: "#16a34a"
  },
  warning: {
    light: "#fde68a",
    main: "#fbbf24",
    dark: "#d97706"
  },
  error: {
    light: "#fecaca",
    main: "#f87171",
    dark: "#dc2626"
  },
  background: {
    default: {
      light: "#f1f1f1",
      dark: "#161C24"
    },
    card: {
      light: "#ffffff",
      dark: "#212B36"
    }
  },
  text: {
    light: {
      primary: "#212B36",
      secondary: "#637381",
      disabled: "#919EAB"
    },
    dark: {
      primary: "#FFFFFF",
      secondary: "#919EAB",
      disabled: "#637381"
    }
  }
};

const useChart = (options: Options): ApexOptions => {
  const { theme } = useSettingsContext();

  const LABEL_TOTAL = {
    show: true,
    label: "total",
    color: theme === "dark" ? colors.text.dark.secondary : colors.text.light.secondary,
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  };

  const LABEL_VALUE = {
    offsetY: 10,
    color: theme === "dark" ? colors.text.dark.secondary : colors.text.light.secondary,
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: '2.5rem',
  };

  const baseOptions: ApexOptions = {
    theme: {
      mode: theme
    },
    colors: theme === "light"
      ? [colors.primary.main, colors.secondary.main, colors.warning.main, colors.error.main, colors.info.main]
      : [colors.primary.dark, colors.secondary.dark, colors.warning.dark, colors.error.dark, colors.info.dark],
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: theme === "dark" ? colors.text.dark.disabled : colors.text.light.disabled,
      fontFamily: 'ui-sans-serif, system-ui, -apple-system',
      background: 'transparent'
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
        }
      },
      active: {
        filter: {
          type: "darken",
        }
      }
    },
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme === "dark" ? colors.text.dark.secondary : colors.text.light.secondary,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    markers: {
      size: 0,
      strokeColors: theme === "dark" ? '#000000' : '#FFFFFF'
    },
    tooltip: {
      followCursor: true,
      x: {
        show: true,
      }
    },
    legend: {
      show: true,
      fontSize: '16px',
      position: "top",
      horizontalAlign: "right",
      markers: {
      },
      fontWeight: 500,
      itemMargin: {
        horizontal: 8,
      },
      labels: {
        colors: theme === "dark" ? colors.text.dark.primary : colors.text.light.primary,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 1.5,
        columnWidth: "28%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: theme === "dark" ? colors.background.default.dark : colors.background.default.light,
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  };

  return LODASH.merge(baseOptions, options);
}

export default useChart;
