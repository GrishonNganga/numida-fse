import { Avatar } from "@/components/ui/avatar";
import "./header.css";

const Header = () => {
  return (
    <div className="header" data-testid="header">
      <div className="header-left" data-testid="header-left">
        <div className="avatar-container" data-testid="avatar-container">
          <Avatar src="https://github.com/grishonnganga.png" fallback="GG" size="md" />
        </div>
        <div data-testid="text-container">
          <div className="welcome-text">Welcome back,</div>
          <div className="name">Grishon</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
