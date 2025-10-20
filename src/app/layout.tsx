import "@mantine/core/styles.css";
import localFont from "next/font/local";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  MantineThemeOverride,
  mantineHtmlProps,
} from "@mantine/core";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

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

const tealCustom: MantineColorsTuple = [
  "#e6f9f8",
  "#c9f2f0",
  "#9ee8e4",
  "#72ded9",
  "#48d4ce",
  "#39cec8",
  "#31b8b3",
  "#2ba29d",
  "#1e7471",
  "#0f4a48",
];

const mantineTheme: MantineThemeOverride = {
  fontFamily: "var(--font-avenir), sans-serif",
  colors: {
    tealCustom,
  },
  primaryColor: "tealCustom",
  primaryShade: 5,
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} className={font.variable}>
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider forceColorScheme="light" theme={mantineTheme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
