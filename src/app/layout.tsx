import "@mantine/core/styles.css";
import localFont from "next/font/local";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Notifications } from "@mantine/notifications";
import NextTopLoader from "nextjs-toploader";

dayjs.extend(customParseFormat);
import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  MantineThemeOverride,
  mantineHtmlProps,
} from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

// FONTS
import { Roboto } from "next/font/google";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--work-sans-font",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--roboto-font",
  display: "swap",
});

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
  variable: "--avenir-font",
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
  fontFamily: "var(--avenir-font), sans-serif",
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
    <html
      lang="en"
      {...mantineHtmlProps}
      className={
        font.variable + " " + workSans.variable + " " + roboto.variable
      }
    >
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <NextTopLoader color="#39cec8" height={4} showSpinner={false} />
        <MantineProvider forceColorScheme="light" theme={mantineTheme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
