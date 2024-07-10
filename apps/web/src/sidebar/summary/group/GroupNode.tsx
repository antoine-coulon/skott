import { ActionIcon, Box, Flex, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  IconCornerDownRight,
  IconCornerLeftUp,
  IconDots,
  IconFocusCentered,
  IconHierarchy3,
  IconRefreshAlert,
  IconTopologyComplex,
} from "@tabler/icons-react";
import { DiGraph, VertexBody, VertexDefinition } from "digraph-js";
import { notify } from "@/store/store";

function AdjacentNode({
  id,
  adjacentId,
  direction,
}: {
  id: string;
  adjacentId: string;
  direction: "upstream" | "downstream";
}) {
  return (
    <Flex>
      {adjacentId === id ? (
        <>
          <IconRefreshAlert color="red" />
          <Text
            style={{
              marginTop: "0.2rem",
            }}
            color="red"
            size="sm"
          >
            {adjacentId}
          </Text>
        </>
      ) : (
        <>
          {direction === "downstream" ? (
            <IconCornerDownRight color="teal" />
          ) : (
            <IconCornerLeftUp color="teal" />
          )}

          <Text
            style={{
              marginTop: "0.2rem",
            }}
            size="sm"
          >
            {adjacentId}
          </Text>
        </>
      )}
    </Flex>
  );
}

function DeepParents(props: { id: string; compute: () => Generator<string> }) {
  const list = Array.from(props.compute());

  if (list.length === 0) {
    return (
      <Text ml="lg" color="orange" size="xs">
        No parents found
      </Text>
    );
  }

  return (
    <Box pl="sm" style={{ marginTop: 0, paddingTop: 0 }}>
      {list.map((adjacentId) => {
        return (
          <AdjacentNode
            key={"deep-parents=" + adjacentId}
            id={props.id}
            adjacentId={adjacentId}
            direction="upstream"
          />
        );
      })}
    </Box>
  );
}

export function GroupNode({
  id,
  adjacentTo,
  graph,
}: {
  id: string;
  adjacentTo: string[];
  graph: DiGraph<VertexDefinition<VertexBody>>;
}) {
  const [directChildrenOpened, directChildrenHandlers] = useDisclosure();
  const [deepChildrenOpened, deepChildrenHandlers] = useDisclosure();
  const [deepParentsOpened, deepParentsHandlers] = useDisclosure();

  function computeDeepChildrenList(id: string) {
    return graph.getDeepChildren(id);
  }

  function computeDeepParentList(id: string) {
    return graph.getDeepParents(id);
  }

  return (
    <Box>
      <Flex p="xs" justify="space-between" align="center">
        <Text weight="bolder" size="sm">
          {id}
        </Text>

        <Menu
          transitionProps={{ transition: "pop-top-right" }}
          position="right"
          withinPortal
        >
          <Menu.Target>
            <ActionIcon size="lg">
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                notify({
                  action: "focus_on_node",
                  payload: { nodeId: id },
                });
              }}
              icon={
                <IconFocusCentered size="1.3rem" color="violet" stroke={1.5} />
              }
            >
              Focus
            </Menu.Item>

            {adjacentTo.length > 0 ? (
              <>
                <Menu.Item
                  onClick={() => {
                    // todo: highlight the adjacent nodes in the network
                    directChildrenHandlers.toggle();
                    deepChildrenHandlers.close();
                    deepParentsHandlers.close();
                  }}
                  icon={
                    <IconTopologyComplex
                      color={directChildrenOpened ? "teal" : undefined}
                    />
                  }
                >
                  Toggle direct children dependencies
                </Menu.Item>

                <Menu.Item
                  icon={
                    <IconHierarchy3
                      color={deepChildrenOpened ? "teal" : undefined}
                    />
                  }
                  onClick={() => {
                    // todo: highlight the adjacent nodes in the network
                    deepChildrenHandlers.toggle();
                    directChildrenHandlers.close();
                    deepParentsHandlers.close();
                  }}
                >
                  Toggle deep children dependencies
                </Menu.Item>
              </>
            ) : null}

            <Menu.Item
              icon={
                <IconHierarchy3
                  color={deepParentsOpened ? "teal" : undefined}
                  style={{
                    rotate: "180deg",
                  }}
                />
              }
              onClick={() => {
                // todo: highlight the adjacent nodes in the network
                deepParentsHandlers.toggle();
                directChildrenHandlers.close();
                deepChildrenHandlers.close();
              }}
            >
              Toggle deep parent dependencies
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      {directChildrenOpened ? (
        <Box pl="sm" style={{ marginTop: 0, paddingTop: 0 }}>
          {adjacentTo.map((adjacentId) => (
            <AdjacentNode
              key={"direct-children=" + adjacentId}
              id={id}
              adjacentId={adjacentId}
              direction="downstream"
            />
          ))}
        </Box>
      ) : null}

      {deepChildrenOpened ? (
        <Box pl="sm" style={{ marginTop: 0, paddingTop: 0 }}>
          {Array.from(computeDeepChildrenList(id), (adjacentId) => {
            return (
              <AdjacentNode
                key={"deep-children=" + adjacentId}
                id={id}
                adjacentId={adjacentId}
                direction="downstream"
              />
            );
          })}
        </Box>
      ) : null}

      {deepParentsOpened ? (
        <DeepParents id={id} compute={() => computeDeepParentList(id)} />
      ) : null}
    </Box>
  );
}
