import { toggleDependencies } from "@/core/network/toggle-dependencies";
import { useStoreSelect } from "@/store/react-bindings";
import { callUseCase } from "@/store/store";
import { Box, Checkbox, Navbar, ScrollArea } from "@mantine/core";

export function Dependencies() {
  const network = useStoreSelect("ui", "network");

  function toggleDepsVisualizationOption(
    option: "circular" | "thirdparty" | "builtin"
  ) {
    const invokeUseCase = callUseCase(toggleDependencies);
    invokeUseCase({ target: option });
  }

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Box p="md">Dependencies visualization</Box>

        <Box p="md">
          <Checkbox
            label="Circular dependencies"
            radius="md"
            color="red"
            checked={network?.dependencies.circular.active ?? false}
            onChange={() => {
              toggleDepsVisualizationOption("circular");
            }}
          />
        </Box>
        <Box p="md">
          <Checkbox
            label="Third-party dependencies"
            radius="md"
            color="grape"
            checked={network?.dependencies.thirdparty.active ?? false}
            onChange={() => {
              toggleDepsVisualizationOption("thirdparty");
            }}
          />
        </Box>
        <Box p="md">
          <Checkbox
            label="Built-in dependencies"
            radius="md"
            color="lime"
            checked={network?.dependencies.builtin.active ?? false}
            onChange={() => {
              toggleDepsVisualizationOption("builtin");
            }}
          />
        </Box>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
