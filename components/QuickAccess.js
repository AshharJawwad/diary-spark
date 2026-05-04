import React from "react";
import SubscriptionButton from "./ui/sub-btn";
import ModeSwitchButton from "./ui/mode-btn";
import InfoButton from "./ui/info-btn";
import ActionBar from "./ui/action-bar";

const QuickAccess = () => {
  return (
    <div className="mt-3 hidden md:block flex-col pr-3 mr-4 w-full fixed">
      <div className="flex justify-end ml-auto w-36 gap-3 pr-2 relative">
        <ModeSwitchButton />
        <SubscriptionButton />
        <InfoButton />
      </div>
      <div className="mt-4 flex justify-end relative">
        <ActionBar className="ml-auto" />
      </div>
    </div>
  );
};

export default QuickAccess;
