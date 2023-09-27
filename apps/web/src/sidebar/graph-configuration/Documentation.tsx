import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  ActionIcon,
  List,
  Box,
  Code,
  Text,
  Blockquote,
} from "@mantine/core";
import { IconFiles, IconHelpCircle, IconInfoCircle } from "@tabler/icons-react";

export function Documentation() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Documentation" size="xl">
        <Box m="lg">
          <Blockquote color="orange" icon={<IconInfoCircle />} mt="xl">
            All the following options can improve the visualization and reduce
            loading time. Nevertheless, the smaller the graph, the simpler the
            analysis will be (and the faster the loading time). You should favor
            all filtering mechanisms altogether to improve the experience
            whenever possible:
            <List withPadding spacing="sm" mt="sm">
              <List.Item>
                CLI: <code>`--cwd`</code>, <code>`--ignorePattern`</code>,{" "}
                <code>`--fileExtensions`</code>, etc.
              </List.Item>
              <List.Item>
                <IconFiles />
                File Explorer menu, by using folder and file filters.
              </List.Item>
            </List>
          </Blockquote>
          <Box m="md">
            <Code
              style={{
                fontSize: "1rem",
              }}
            >
              Layout type
            </Code>
            <List spacing="sm" mt="md">
              <List.Item>
                <b>Cluster</b>: builds graph based on connections between nodes.
                Especially useful when having a graph with a lot of
                interconnected nodes, including circular dependencies.
              </List.Item>
              <List.Item>
                <b>Hierarchical</b>: arranges nodes in a hierarchical fashion.
                This not a recommended layout when having circular dependencies
                or a lot of interconnected nodes. A <b>direction</b> can be
                provided: up-down (UD), left-right (LR), down-up (DU),
                right-left (RL).
              </List.Item>
            </List>
          </Box>

          <Box m="md">
            <Code
              style={{
                fontSize: "1rem",
              }}
            >
              Spacing algorithm (depends on layout type)
            </Code>
            <List spacing="sm" mt="md">
              <List.Item>
                <b>Cluster</b>: all algorithms must be tried, their usefulness
                depends on graph shape that can't be easily predicted.
              </List.Item>
              <List.Item>
                <b>Hierarchical</b>

                <List withPadding>
                  <List.Item>
                    <b>Hubsize</b> - Hubsize takes the nodes with the most edges
                    and puts them at the top. From that the rest of the
                    hierarchy is evaluated.
                  </List.Item>
                  <List.Item>
                    <b>Directed</b> - Directed adheres to the to and from data
                    of the edges. Given an edge from A to B, B will be a child
                    of A.
                  </List.Item>
                </List>
              </List.Item>
            </List>
          </Box>

          <Box m="md">
            <Code
              style={{
                fontSize: "1rem",
              }}
            >
              Improve Spacing
            </Code>
            <Text m="md">
              Enabling that option will improve the global visualisation as
              nodes and edges will be optimized to provide a better spacing and
              position in space. This option is not recommended when having a
              lot of nodes/edges as this will highly slow down the rendering
              process and mainly block the main thread.
            </Text>
          </Box>

          <Box m="md">
            <Code
              style={{
                fontSize: "1rem",
              }}
            >
              Node spacing
            </Code>
            <Text m="md">
              Increase the space between nodes, independently of the layout and
              algorithm chosen.
            </Text>
          </Box>
        </Box>
      </Modal>

      <ActionIcon
        variant="filled"
        aria-label="Settings"
        color="orange"
        onClick={open}
      >
        <IconHelpCircle stroke={1.5} />
      </ActionIcon>
    </>
  );
}
