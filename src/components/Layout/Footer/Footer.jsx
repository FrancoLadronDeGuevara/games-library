import { Joystick } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-2 border border-border-default/20 bg-bg-surface py-6 text-center text-text-muted mt-auto">
      <Joystick className="w-4 h-4" />
      <p className="text-sm">Powered by FreeToGame API</p>
      <Joystick className="w-4 h-4" />
    </footer>
  );
};

export default Footer;
