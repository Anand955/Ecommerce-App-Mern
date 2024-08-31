import React from "react";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-4">
        <div>
          <Logo w={90} h={60} />
        </div>

        <div>search</div>
      </div>
    </header>
  );
};

export default Header;
