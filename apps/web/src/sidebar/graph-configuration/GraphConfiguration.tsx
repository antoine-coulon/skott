import React from "react";
import {
  Box,
  Button,
  Divider,
  Group,
  Navbar,
  ScrollArea,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  Text,
} from "@mantine/core";
import { createFormContext } from "@mantine/form";
import * as Option from "@effect/data/Option";

import { callUseCase, notify } from "@/store/store";
import { updateConfiguration } from "@/core/network/update-configuration";
import { useStoreSelect } from "@/store/react-bindings";
import { NetworkLayout, storeDefaultValue } from "@/store/state";
import { Documentation } from "@/sidebar/graph-configuration/Documentation";

const availableLayouts = ["cluster", "hierarchical"] as const;
const hierarchicalDirections = ["UD", "DU", "LR", "RL"] as const;

type AvailableLayouts = (typeof availableLayouts)[number];

interface FormValues {
  layout: {
    selected: NetworkLayout["type"];
    smooth_edges: NetworkLayout["smooth_edges"];
    cluster: {
      spacing_algorithm: "barnes_hut" | "force_atlas_2" | "repulsion";
    };
    hierarchical: {
      direction: (typeof hierarchicalDirections)[number];
      spacing_algorithm: "directed" | "hubsize";
    };
    node_spacing: NetworkLayout["node_spacing"];
  };
}

const initialValue: FormValues = {
  layout: {
    selected: storeDefaultValue.ui.network.layout.type,
    smooth_edges: storeDefaultValue.ui.network.layout.smooth_edges,
    cluster: {
      spacing_algorithm: storeDefaultValue.ui.network.layout.spacing_algorithm,
    },
    hierarchical: {
      direction: "UD",
      spacing_algorithm: "hubsize",
    },
    node_spacing: storeDefaultValue.ui.network.layout.node_spacing,
  },
};

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

function ClusterOptions() {
  const form = useFormContext();

  return (
    <Box m="md">
      <Text size="sm" mb="md">
        Spacing algorithm
      </Text>
      <Select
        data={[
          { label: "Barnes Hut", value: "barnes_hut" },
          { label: "Force Atlas 2", value: "force_atlas_2" },
          { label: "Repulsion", value: "repulsion" },
        ]}
        placeholder="Spacing algorithm"
        {...form.getInputProps("layout.cluster.spacing_algorithm")}
      />
      <Divider mt="lg" />
    </Box>
  );
}

function HierarchicalOptions() {
  const form = useFormContext();
  return (
    <Box m="md">
      <Text size="sm" mt="md">
        Direction
      </Text>

      <SegmentedControl
        mt="md"
        defaultValue={"UD"}
        data={hierarchicalDirections.map((direction) => ({
          value: direction,
          label: direction,
        }))}
        {...form.getInputProps("layout.hierarchical.direction")}
      />

      <Text size="sm" mt="md" mb="md">
        Spacing algorithm
      </Text>

      <Select
        data={[
          { label: "Hubsize", value: "hubsize" },
          { label: "Directed", value: "directed" },
        ]}
        placeholder="Spacing algorithm"
        {...form.getInputProps("layout.hierarchical.spacing_algorithm")}
      />

      <Divider mt="lg" />
    </Box>
  );
}

function GraphOptions({ layout }: { layout: AvailableLayouts }) {
  switch (layout) {
    case "cluster":
      return <ClusterOptions />;

    case "hierarchical":
      return <HierarchicalOptions />;

    default:
      return <>unknown_layout</>;
  }
}

export function GraphConfiguration() {
  const cycles = useStoreSelect("data", "cycles");
  const network = useStoreSelect("ui", "network");

  const [selectedLayout, setSelectedLayout] = React.useState<
    AvailableLayouts | undefined
  >(undefined);

  const form = useForm({
    initialValues: initialValue,
  });

  React.useEffect(() => {
    if (Option.isNone(network)) {
      return;
    }

    const { layout } = network.value;

    if (layout.type === "cluster") {
      form.setValues({
        layout: {
          selected: layout.type,
          smooth_edges: layout.smooth_edges,
          cluster: {
            spacing_algorithm: layout.spacing_algorithm,
          },
          hierarchical: initialValue.layout.hierarchical,
          node_spacing: layout.node_spacing,
        },
      });
    } else {
      form.setValues({
        layout: {
          selected: layout.type,
          smooth_edges: layout.smooth_edges,
          cluster: initialValue.layout.cluster,
          hierarchical: {
            direction: layout.direction,
            spacing_algorithm: layout.spacing_algorithm,
          },
          node_spacing: layout.node_spacing,
        },
      });
    }

    if (!selectedLayout) {
      setSelectedLayout(layout.type);
    }
  }, [network]);

  function dispatchConfiguration(value: FormValues) {
    notify({ action: "network_refresh" });
    const invokeUseCase = callUseCase(updateConfiguration);

    if (value.layout.selected === "cluster") {
      invokeUseCase({
        type: value.layout.selected,
        smooth_edges: value.layout.smooth_edges,
        node_spacing: value.layout.node_spacing,
        spacing_algorithm: value.layout.cluster.spacing_algorithm,
      });
    } else {
      invokeUseCase({
        type: value.layout.selected,
        smooth_edges: value.layout.smooth_edges,
        direction: value.layout.hierarchical.direction,
        node_spacing: value.layout.node_spacing,
        spacing_algorithm: value.layout.hierarchical.spacing_algorithm,
      });
    }
  }

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Group position="apart" p="md">
          <Text>Graph configuration</Text>
          <Documentation />
        </Group>

        <FormProvider form={form}>
          <form onSubmit={form.onSubmit(dispatchConfiguration)}>
            <Box mr="md" ml="md">
              <Text size="sm">Layout type</Text>

              <SegmentedControl
                mt="md"
                {...form.getInputProps("layout.selected")}
                onChange={(value) => {
                  setSelectedLayout(value as AvailableLayouts);
                  form.getInputProps("layout.selected").onChange(value);
                }}
                data={availableLayouts.map((layout) => ({
                  value: layout,
                  label:
                    layout.charAt(0).toUpperCase() +
                    layout.slice(1).toLowerCase(),
                }))}
              />

              <Divider mt="lg" />
            </Box>

            {selectedLayout ? <GraphOptions layout={selectedLayout} /> : null}

            <Box m="md">
              <Switch
                mt="md"
                w="100%"
                checked={form.values.layout.smooth_edges}
                labelPosition="left"
                label="Improve Spacing"
                {...form.getInputProps("layout.smooth_edges")}
              />
              <Divider mt="lg" />
            </Box>

            <Box m="md">
              <Text size="sm" mt="lg" mb="xl">
                Node Spacing
              </Text>
              <Slider
                step={100}
                min={100}
                max={1000}
                showLabelOnHover
                {...form.getInputProps("layout.node_spacing")}
              />
            </Box>

            {selectedLayout === "hierarchical" &&
            cycles._tag === "Some" &&
            cycles.value.length > 0 ? (
              <Box m="md">
                <Text size="sm" mt="xl" mb="md">
                  Hierarchical layout is discouraged when the{" "}
                  <Text span c="orange" inherit>
                    graph is not acyclic.
                  </Text>{" "}
                  Current cycles:{" "}
                  <Text span c="red" inherit>
                    {cycles.value.length}
                  </Text>
                </Text>
              </Box>
            ) : null}

            <Group mt="xl" position="center">
              <Button type="submit" variant="gradient" radius="xs">
                Apply changes
              </Button>
            </Group>
          </form>
        </FormProvider>
      </Navbar.Section>
    </ScrollArea.Autosize>
  );
}
