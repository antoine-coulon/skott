import React from "react";
import {
  Box,
  Button,
  Group,
  Navbar,
  ScrollArea,
  SegmentedControl,
  Select,
  Slider,
  Text,
} from "@mantine/core";
import { createFormContext } from "@mantine/form";

import { callUseCase } from "@/store/store";
import { updateConfiguration } from "@/core/network/update-configuration";
import { useStoreSelect } from "@/store/react-bindings";

const availableLayouts = ["cluster", "hierarchical"] as const;
type AvailableLayouts = (typeof availableLayouts)[number];

const hierarchicalDirections = ["UD", "DU", "LR", "RL"] as const;

interface FormValues {
  layout: {
    selected: "cluster" | "hierarchical";
    cluster: {
      spacing_algorithm: "barnes_hut" | "force_atlas_2" | "repulsion";
    };
    hierarchical: {
      direction: (typeof hierarchicalDirections)[number];
      spacing_algorithm: "directed" | "hubsize";
    };
    node_spacing: number;
  };
}

const initialValue: FormValues = {
  layout: {
    selected: "cluster",
    cluster: {
      spacing_algorithm: "repulsion",
    },
    hierarchical: {
      direction: "UD",
      spacing_algorithm: "hubsize",
    },
    node_spacing: 500,
  },
};

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

function ClusterOptions() {
  const form = useFormContext();

  return (
    <Box m="md">
      <Text size="sm" mt="xl" mb="md">
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
    </Box>
  );
}

function HierarchicalOptions() {
  const form = useFormContext();
  return (
    <Box m="md">
      <Text size="sm" mt="xl" mb="md">
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
    if (!network) {
      return;
    }

    const layout = network.layout;

    if (layout.type === "cluster") {
      form.setValues({
        layout: {
          selected: layout.type,
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
    const invokeUseCase = callUseCase(updateConfiguration);

    if (value.layout.selected === "cluster") {
      invokeUseCase({
        type: value.layout.selected,
        node_spacing: value.layout.node_spacing,
        spacing_algorithm: value.layout.cluster.spacing_algorithm,
      });
    } else {
      invokeUseCase({
        type: value.layout.selected,
        direction: value.layout.hierarchical.direction,
        node_spacing: value.layout.node_spacing,
        spacing_algorithm: value.layout.hierarchical.spacing_algorithm,
      });
    }
  }

  return (
    <ScrollArea.Autosize mah="90vh" mx="auto">
      <Navbar.Section>
        <Box p="md">Graph configuration</Box>

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
            </Box>

            {selectedLayout ? <GraphOptions layout={selectedLayout} /> : null}

            <Box m="md">
              <Text size="sm" mt="xl" mb="md">
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

            {selectedLayout === "hierarchical" && cycles.length > 0 ? (
              <Box m="md">
                <Text size="sm" mt="xl" mb="md">
                  Hierarchical layout is discouraged when the{" "}
                  <Text span c="orange" inherit>
                    graph is not acyclic.
                  </Text>{" "}
                  Current cycles:{" "}
                  <Text span c="red" inherit>
                    {cycles.length}
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
