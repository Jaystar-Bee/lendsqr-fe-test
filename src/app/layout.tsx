import "@mantine/core/styles.css";
import localFont from "next/font/local";
// ColorSchemeScript,
import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import "./globals.css";

const font = localFont({
  src: [
    {
      path: "../../public/fonts/AvenirNextLTPro-UltLt.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-It.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Demi.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Heavy.otf",
      weight: "800",
    },
  ],
  variable: "--font-avenir",
});

const mantineTheme = {
  fontFamily: "var(--font-avenir), sans-serif",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} className={font.variable}>
      {/* <head>
        <ColorSchemeScript />
      </head> */}
      <body>
        <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
