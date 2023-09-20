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

interface FormValues {
  layout: {
    selected: "cluster" | "hierarchical";
    cluster: {
      spacing_algorithm: "barnes_hut" | "force_atlas_2" | "repulsion";
      node_spacing: number;
    };
    hierarchical: {
      direction: "lr" | "td";
    };
  };
}

const initialValue: FormValues = {
  layout: {
    selected: "cluster",
    cluster: {
      spacing_algorithm: "repulsion",
      node_spacing: 500,
    },
    hierarchical: {
      direction: "lr",
    },
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

      <Text size="sm" mt="xl" mb="md">
        Node Spacing
      </Text>
      <Slider
        step={100}
        min={100}
        max={1000}
        showLabelOnHover
        {...form.getInputProps("layout.cluster.node_spacing")}
      />
    </Box>
  );
}

function HierarchicalOptions() {
  const form = useFormContext();
  return (
    <Box m="md">
      <Text size="sm">Direction</Text>

      <SegmentedControl
        mt="md"
        defaultValue={"lr"}
        data={[
          { value: "lr", label: "LR" },
          { value: "td", label: "TD" },
        ]}
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
            node_spacing: layout.node_spacing,
          },
          hierarchical: initialValue.layout.hierarchical,
        },
      });
    } else {
      form.setValues({
        layout: {
          selected: layout.type,
          cluster: initialValue.layout.cluster,
          hierarchical: {
            direction: layout.direction,
          },
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
        node_spacing: value.layout.cluster.node_spacing,
        spacing_algorithm: value.layout.cluster.spacing_algorithm,
      });
    } else {
      invokeUseCase({
        type: value.layout.selected,
        direction: value.layout.hierarchical.direction,
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
