import { ActionIcon, Box, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  IconCornerDownRight,
  IconHierarchy3,
  IconPhotoSensor3,
  IconRefreshAlert,
  IconTopologyComplex,
} from "@tabler/icons-react";
import React from "react";
import { DiGraph } from "digraph-js";
import type { SkottNode } from "skott/graph/node";
import { notify } from "@/store/store";

function AdjacentNode({ id, adjacentId }: { id: string; adjacentId: string }) {
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
          <IconCornerDownRight color="teal" />

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

export function GroupNode({
  id,
  adjacentTo,
  graph,
}: {
  id: string;
  adjacentTo: string[];
  graph: Record<string, SkottNode<unknown>>;
}) {
  const graphInstance = React.useMemo(() => DiGraph.fromRaw(graph), [graph]);
  const [shallowOpened, shallowHandlers] = useDisclosure();
  const [deepOpened, deepHandlers] = useDisclosure();

  function computeDeepAdjacencyList(id: string) {
    return graphInstance.getDeepChildren(id);
  }

  return (
    <Box>
      <Flex p="xs" justify="space-between" align="center">
        <Text weight="bolder" size="sm">
          {id}
        </Text>

        <Box>
          <Flex>
            {adjacentTo.length > 0 ? (
              <>
                <ActionIcon
                  color={shallowOpened ? "teal" : undefined}
                  size={25}
                  onClick={() => {
                    // todo: highlight the adjacent nodes in the network
                    shallowHandlers.toggle();
                    deepHandlers.close();
                  }}
                >
                  <IconTopologyComplex />
                </ActionIcon>
                <ActionIcon
                  size={25}
                  color={deepOpened ? "teal" : undefined}
                  onClick={() => {
                    // todo: highlight the adjacent nodes in the network
                    deepHandlers.toggle();
                    shallowHandlers.close();
                  }}
                >
                  <IconHierarchy3 />
                </ActionIcon>
              </>
            ) : null}

            <ActionIcon
              size={25}
              color="magenta"
              onClick={() => {
                notify({
                  action: "focus_on_node",
                  payload: { nodeId: id },
                });
              }}
            >
              <IconPhotoSensor3 />
            </ActionIcon>
          </Flex>
        </Box>
      </Flex>

      {shallowOpened ? (
        <Box pl="sm" style={{ marginTop: 0, paddingTop: 0 }}>
          {adjacentTo.map((adjacentId) => (
            <AdjacentNode id={id} adjacentId={adjacentId} />
          ))}
        </Box>
      ) : null}

      {deepOpened ? (
        <Box pl="sm" style={{ marginTop: 0, paddingTop: 0 }}>
          {Array.from(computeDeepAdjacencyList(id), (adjacentId) => {
            return <AdjacentNode id={id} adjacentId={adjacentId} />;
          })}
        </Box>
      ) : null}
    </Box>
  );
}
