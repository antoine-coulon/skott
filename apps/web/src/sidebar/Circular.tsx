import React from "react";

function CircularComp() {
  return <div>circular </div>;
}

export const Circular = React.memo(CircularComp);
