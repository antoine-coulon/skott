import { useState } from "react";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconFiles,
  IconDeviceDesktopAnalytics,
  IconClipboardData,
  IconVectorTriangle,
  IconSettings,
  IconRefreshAlert,
  IconAB2,
} from "@tabler/icons-react";

import { useAppEffects, useStoreSelect } from "@/store/react-bindings";

import { Circular } from "./Circular";
import { GraphConfiguration } from "./graph-configuration/GraphConfiguration";
import { Summary } from "./summary/Summary";
import { FileExplorer } from "./file-explorer/FileExplorer";
import { InteractivePlayground } from "./InteractivePlayground";
import { UserSettings } from "./UserSettings";
import { Dependencies } from "./dependencies/Dependencies";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: `0 0 ${rem(60)}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const staticMenus = [
  { icon: IconClipboardData, label: "Summary", key: "summary" },
  { icon: IconFiles, label: "File Explorer", key: "file_explorer" },
  {
    icon: IconAB2,
    label: "Dependencies configuration",
    key: "dependencies",
  },
  {
    icon: IconVectorTriangle,
    label: "Graph Configuration",
    key: "graph_configuration",
  },
  {
    icon: IconRefreshAlert,
    label: "Circular dependencies (work in progress)",
    key: "circular",
  },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Interactive Playground (work in progress)",
    key: "interactive_playground",
  },
  {
    icon: IconSettings,
    label: "User Settings (work in progress)",
    key: "settings",
  },
] as const;

type MenuKeys = (typeof staticMenus)[number]["key"];

function useMenus() {
  const state = useStoreSelect("ui", "visualization");

  if (!state) {
    return { menus: [], menuKeys: [] };
  }

  const filteredMenus = staticMenus.filter((menu) => {
    if (menu.key === "file_explorer") {
      return state.granularity === "module";
    }

    return true;
  });

  const menuKeys = filteredMenus.map((menu) => menu.key);

  return { menus: filteredMenus, menuKeys };
}

const isFeatureDisabled = (section: string) =>
  section !== "file_explorer" &&
  section !== "summary" &&
  section !== "dependencies" &&
  section !== "graph_configuration";

export function DoubleNavbar() {
  const { classes, cx } = useStyles();

  const [active, setActive] = useState<MenuKeys>("summary");
  const { menuKeys, menus } = useMenus();

  useAppEffects((action) => {
    if (
      action.action === "open_sidebar_menu" &&
      menuKeys.includes(action.payload.menu as MenuKeys)
    ) {
      setActive(action.payload.menu as MenuKeys);
    }
  });

  const mainMenus = menus.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0.25 }}
      key={link.key}
    >
      <UnstyledButton
        disabled={isFeatureDisabled(link.key)}
        opacity={isFeatureDisabled(link.key) ? 0.5 : 1}
        variant="light"
        onClick={() => setActive(link.key)}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.key === active,
        })}
      >
        <link.icon size="1.4rem" stroke={1.4} />
      </UnstyledButton>
    </Tooltip>
  ));

  const selectComponent = (active: MenuKeys) => {
    switch (active) {
      case "circular":
        return <Circular />;
      case "graph_configuration":
        return <GraphConfiguration />;
      case "summary":
        return <Summary />;
      case "file_explorer":
        return <FileExplorer />;
      case "dependencies":
        return <Dependencies />;
      case "interactive_playground":
        return <InteractivePlayground />;
      case "settings":
        return <UserSettings />;
      default:
        return <Summary />;
    }
  };

  return (
    <Navbar width={{ sm: 300 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>{mainMenus}</div>
        <div className={classes.main}>{selectComponent(active)}</div>
      </Navbar.Section>
    </Navbar>
  );
}
