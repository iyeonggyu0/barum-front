import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const crashBoxStyle = (good) =>
  css({
    ...theme.flex.rowStart,
    backgroundColor: good ? theme.colors.greenSoft : theme.colors.warnBg,
    padding: "20px 24px",
    gap: "14px",
    borderRadius: "30px",

    marginBottom: "8px",

    "&:last-child": {
      marginBottom: "0px",
    },

    "& .icon": {
      marginTop: "12px",
      fontSize: "22px",
      color: good ? theme.colors.green : theme.colors.warn,
    },

    "& .text-box": {
      ...theme.flex.colCenter,
      gap: "6px",

      "& .title-box": {
        ...theme.flex.rowBetween,
        color: good ? theme.colors.green : theme.colors.warnInk3,
        ...theme.fonts.micro,

        "& .reason": {
          alignItems: "center",
        },

        "& p.ingredient": {
          ...theme.fonts.body,
          fontWeight: "600",
          color: good ? theme.colors.greenDeep : theme.colors.warnInk,

          "& span.ingredient": {
            marginRight: "4px",
          },

          "& span.plus": {
            marginLeft: "4px",
          },

          "& span.ingredient:last-child > .plus": {
            display: "none",
          },
        },
      },
    },

    "& .text": {
      color: good ? theme.colors.greenInk : theme.colors.warnBody,
      ...theme.fonts.sub,
    },

    "& .guide": {
      color: good ? theme.colors.green : theme.colors.warnSource,
      ...theme.fonts.nano,
    },
  });
