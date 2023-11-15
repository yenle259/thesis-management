export function getTopicModuleColor(topicModule: string): string | undefined {
  const topicModuleColor: Record<string, string> = {
    ["CT554"]: "orange",
    ["CT666"]: "primary",
    ["TN408"]: "cyan",
    ["CT270"]: "green",
  };
  return topicModuleColor[topicModule];
}
