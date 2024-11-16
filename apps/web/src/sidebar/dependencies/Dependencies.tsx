import { toggleDependencies } from "@/core/network/toggle-dependencies";
import { useAppStore, useStoreSelect } from "@/store/react-bindings";
import { callUseCase } from "@/store/store";
import { Box, Checkbox, Navbar, ScrollArea } from "@mantine/core";
import * as Option from "@effect/data/Option";

export function Dependencies() {
  const maybeNetwork = useStoreSelect("ui", "network");
  const state = useAppStore().getState();

  if (Option.isNone(maybeNetwork)) {
    return null;
  }

  const network = maybeNetwork.value;

  const { hasThirdParty, hasBuiltin } = {
    hasThirdParty: Object.values(state.data.graph).some(
      (node) => node.body.thirdPartyDependencies.length > 0
    ),
    hasBuiltin: Object.values(state.data.graph).some(
      (node) => node.body.builtinDependencies.length > 0
    ),
  };

  function toggleDepsVisualizationOption(
    option: "deep" | "circular" | "thirdparty" | "builtin"
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
            label="Deep dependencies"
            disabled={state.data.cycles.length === 0}
            radius="md"
            color="cyan"
            checked={network?.dependencies.deep.active ?? false}
            onChange={() => {
              toggleDepsVisualizationOption("deep");
            }}
          />
        </Box>
        <Box p="md">
          <Checkbox
            label="Circular dependencies"
            disabled={state.data.cycles.length === 0}
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
            disabled={!hasThirdParty}
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
            disabled={!hasBuiltin}
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
