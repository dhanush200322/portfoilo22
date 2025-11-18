import * as React from "react";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType<any>;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/**
 * ChartContainer
 * - children: ReactNode inside ResponsiveContainer
 * - config: ChartConfig that drives legend/tooltip colors/labels
 */
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

/**
 * ChartStyle
 * Injects CSS custom properties (--color-<key>) based on config
 */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, cfg]) => Boolean((cfg as any).theme) || Boolean((cfg as any).color)
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `\
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      (itemConfig as any).theme?.[theme as keyof typeof itemConfig.theme] ||
      (itemConfig as any).color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}`
          )
          .join("\n"),
      }}
    />
  );
};

// -------------------- TOOLTIP ----------------------
// Use the recharts Tooltip component but keep our tooltip content typed loosely.

const ChartTooltip = Tooltip;

type RechartsPayloadItem = {
  value?: any;
  name?: string;
  dataKey?: string | number;
  color?: string;
  payload?: Record<string, any>;
};

/**
 * ChartTooltipContent
 * - Uses loose typing for Tooltip props/payload to avoid version typing mismatches
 */
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean;
    payload?: RechartsPayloadItem[] | null;
    className?: string;
    indicator?: "line" | "dot" | "dashed";
    hideLabel?: boolean;
    hideIndicator?: boolean;
    label?: string | React.ReactNode;
    labelFormatter?: (label: any, payload?: any) => React.ReactNode;
    labelClassName?: string;
    formatter?: (value: any, name?: string, payload?: any, index?: number) => React.ReactNode;
    color?: string;
    nameKey?: string;
    labelKey?: string;
  }
>((props, ref) => {
  const {
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
  } = props;

  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    const key = `${labelKey || item.dataKey || item.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);

    const val =
      !labelKey && typeof label === "string"
        ? (config[label as keyof typeof config]?.label as any) || label
        : itemConfig?.label;

    if (labelFormatter) return <div className={cn("font-medium", labelClassName)}>{labelFormatter(val, payload)}</div>;
    if (!val) return null;
    return <div className={cn("font-medium", labelClassName)}>{val}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div ref={ref} className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color || "currentColor";

          return (
            <div key={String(item.dataKey ?? index)} className={cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center")}>
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                !hideIndicator && (
                  <div
                    className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                      "h-2.5 w-2.5": indicator === "dot",
                      "w-1": indicator === "line",
                      "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                      "my-0.5": nestLabel && indicator === "dashed",
                    })}
                    style={
                      {
                        ["--color-bg" as any]: indicatorColor,
                        ["--color-border" as any]: indicatorColor,
                      } as React.CSSProperties
                    }
                  />
                )
              )}

              <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                <div className="grid gap-1.5">
                  {nestLabel ? tooltipLabel : null}
                  <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                </div>

                {item.value !== undefined && (
                  <span className="font-mono font-medium tabular-nums text-foreground">{typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltip";

/* ChartLegend and content */

const ChartLegend = Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  {
    payload?: Array<{ value?: any; dataKey?: string | number; color?: string }>;
    verticalAlign?: "top" | "bottom" | "middle";
    className?: string;
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, hideIcon = false, payload, nameKey, verticalAlign = "bottom" }, ref) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
      {payload.map((item, idx) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, (item as any), key);

        return (
          <div key={String(item.value ?? idx)} className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground">
            {!hideIcon ? <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} /> : null}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

/* Helpers */

function getPayloadConfigFromPayload(config: ChartConfig, payload: any, key: string) {
  if (!payload || typeof payload !== "object") return undefined;

  const payloadObj = payload.payload && typeof payload.payload === "object" ? payload.payload : undefined;

  let configKey: string = key;

  if (key in payload && typeof payload[key] === "string") {
    configKey = payload[key];
  } else if (payloadObj && key in payloadObj && typeof payloadObj[key] === "string") {
    configKey = payloadObj[key];
  }

  return (config as any)[configKey] ?? (config as any)[key];
}

/* Exports */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
