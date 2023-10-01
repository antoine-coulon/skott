import { Group, RingProgress, Text } from "@mantine/core";

const languagesBindings: Record<string, Record<string, string>> = {
  ts: {
    label: "TypeScript",
    color: "#2d79c8",
  },
  js: {
    label: "JavaScript",
    color: "#f0dc4e",
  },
};

function getMostDominantLanguage(files: Map<string, string[]>) {
  let dominantLanguage = "";
  let dominantSizeToBeat = 0;

  for (const [key, value] of files) {
    if (value.length > dominantSizeToBeat) {
      dominantLanguage = key;
      dominantSizeToBeat = value.length;
    }
  }
  return dominantLanguage;
}

export function LanguageRing({
  numberOfFiles,
  files,
}: {
  numberOfFiles: number;
  files: Map<string, string[]>;
}) {
  function computeFilePercentage(fileType: string) {
    const percentage = (files.get(fileType)!.length / numberOfFiles) * 100;

    if (Number.isNaN(percentage)) {
      return 0;
    }

    return percentage;
  }

  return (
    <>
      {files.size > 0 ? (
        <Group position="center">
          <RingProgress
            size={100}
            thickness={12}
            label={
              <Text
                size="xs"
                align="center"
                px="xs"
                sx={{ pointerEvents: "none" }}
              >
                {getMostDominantLanguage(files).toUpperCase()}
              </Text>
            }
            sections={[...files.keys()].map((key) => {
              const percentage = computeFilePercentage(key);
              return {
                value: percentage,
                color: languagesBindings[key].color,
                tooltip: `${languagesBindings[key].label} - ${percentage}%`,
              };
            })}
          />
        </Group>
      ) : (
        <Group position="center">
          <RingProgress size={100} thickness={12} sections={[]} />
        </Group>
      )}
    </>
  );
}
