import { Children } from "react";

type Props = {
  children?: React.ReactNode;
};

type Slots = {
  header: React.ReactNode | null;
  sidebar: React.ReactNode | null;
  content: React.ReactNode | null;
  footer: React.ReactNode | null;
};

function Header({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className="">
      {children}
    </div>
  );
}

function Sidebar({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className="">
      {children}
    </div>
  );
}

function Content({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className="">
      {children}
    </div>
  );
}

function Footer({ children, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className="">
      {children}
    </div>
  );
}

export function Slot({ children }: Props) {
  const slots: Slots = {
    header: null,
    sidebar: null,
    content: null,
    footer: null,
  };

  Children.forEach(children, (child) => {
    switch ((child as React.ReactElement<Props>).type) {
      case Header:
        slots.header = child;
        break;
      case Sidebar:
        slots.sidebar = child;
        break;
      case Content:
        slots.content = child;
        break;
      case Footer:
        slots.footer = child;
        break;
    }
  });

  return (
    <div className="h-full">
      {slots.header && <div className="">{slots.header}</div>}
      <div className="">
        {slots.sidebar && <aside className="">{slots.sidebar}</aside>}
        <div className="">{slots.content}</div>
      </div>
      {slots.footer && <div className="">{slots.footer}</div>}
    </div>
  );
}

Slot.Header = Header;
Slot.Sidebar = Sidebar;
Slot.Content = Content;
Slot.Footer = Footer;
