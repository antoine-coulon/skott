export type AppEvents =
  | {
      action: "open_search";
    }
  | {
      action: "isolate_node";
      payload: {
        nodeId: string;
      };
    }
  | {
      action: "focus_on_node";
      payload: {
        nodeId: string;
      };
    }
  | {
      action: "open_sidebar_menu";
      payload: {
        menu: string;
      };
    };
