
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { NAVY, PRIMARY } from "@/theme/theme";

/* ============================================================
   TYPES
   ============================================================ */

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type QuickAction = {
  label: string;
  response: string;
};

/* ============================================================
   QUICK ACTIONS
   ============================================================ */

const quickActions: QuickAction[] = [
  {
    label: "Inventory Audit",
    response:
      "I'll review the current inventory position, stock levels, reorder thresholds, and potential supply risks.",
  },
  {
    label: "Draft PO",
    response:
      "I can help prepare a purchase order based on current inventory requirements and approved supplier information.",
  },
  {
    label: "Cash Forecast",
    response:
      "I'll analyze the available cash-flow indicators and prepare a forecast summary for the current operating period.",
  },
  {
    label: "Risk Check",
    response:
      "I'll check current operational indicators and highlight areas that may require attention or management action.",
  },
];

/* ============================================================
   INITIAL MESSAGE
   ============================================================ */

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Good morning, Praveen. I have analyzed current production cycles. Would you like a brief on potential supply chain bottlenecks?",
  },
];

/* ============================================================
   DEMO AI RESPONSE
   ============================================================ */

function getDemoResponse(message: string): string {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("inventory") ||
    normalizedMessage.includes("stock") ||
    normalizedMessage.includes("audit")
  ) {
    return "Inventory levels are being monitored. The current analysis indicates that several materials are approaching their reorder thresholds. I recommend reviewing the critical items before the next production cycle.";
  }

  if (
    normalizedMessage.includes("purchase") ||
    normalizedMessage.includes("po") ||
    normalizedMessage.includes("draft")
  ) {
    return "I can prepare a draft purchase order based on current material requirements, supplier availability, and reorder thresholds.";
  }

  if (
    normalizedMessage.includes("cash") ||
    normalizedMessage.includes("forecast")
  ) {
    return "The current cash-flow indicators suggest a stable operating position. I can prepare a detailed forecast covering expected inflows, outflows, and upcoming obligations.";
  }

  if (
    normalizedMessage.includes("risk") ||
    normalizedMessage.includes("bottleneck")
  ) {
    return "I identified potential supply-chain pressure around material availability and replenishment timing. These areas should be reviewed before the next production cycle.";
  }

  if (
    normalizedMessage.includes("revenue") ||
    normalizedMessage.includes("sales") ||
    normalizedMessage.includes("profit")
  ) {
    return "Revenue is currently tracking at $1.245M, with a positive 12.4% trend against the previous period. Net profit is approximately $459.8K.";
  }

  if (
    normalizedMessage.includes("lead") ||
    normalizedMessage.includes("crm") ||
    normalizedMessage.includes("customer")
  ) {
    return "The CRM pipeline contains active opportunities across multiple sales stages. High-probability opportunities approaching their expected close dates should receive priority follow-up.";
  }

  if (
    normalizedMessage.includes("document") ||
    normalizedMessage.includes("invoice")
  ) {
    return "Recent document activity can be reviewed across invoices, purchase orders, quotations, and other operational records.";
  }

  return "I have recorded your request. This is currently using the Agentic Intelligence demo engine. The ERP intelligence API can be connected here later without changing the chat interface.";
}

/* ============================================================
   COMPONENT
   ============================================================ */

export function AIAssistant() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [thinking, setThinking] = useState(false);

  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const responseTimer = useRef<number | null>(null);

  const messagesContainerRef =
    useRef<HTMLDivElement | null>(null);

  const inputRef =
    useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  /* ==========================================================
     CLEANUP
     ========================================================== */

  useEffect(() => {
    return () => {
      if (responseTimer.current !== null) {
        window.clearTimeout(responseTimer.current);
      }
    };
  }, []);

  /* ==========================================================
     AUTO SCROLL
     ========================================================== */

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  /* ==========================================================
     FOCUS INPUT WHEN OPEN
     ========================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 350);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open]);

  /* ==========================================================
     SEND MESSAGE
     ========================================================== */

  const sendMessage = (value = message) => {
    const content = value.trim();

    if (!content || thinking) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage("");

    setThinking(true);

    responseTimer.current = window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getDemoResponse(content),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setThinking(false);

      responseTimer.current = null;
    }, 900);
  };

  /* ==========================================================
     INPUT CHANGE
     ========================================================== */

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setMessage(event.target.value);
  };

  /* ==========================================================
     ENTER TO SEND
     ========================================================== */

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  /* ==========================================================
     CLEAR CHAT
     ========================================================== */

  const clearConversation = () => {
    if (responseTimer.current !== null) {
      window.clearTimeout(responseTimer.current);

      responseTimer.current = null;
    }

    setMessages(initialMessages);

    setMessage("");

    setThinking(false);
  };

  /* ==========================================================
     OPEN / CLOSE
     ========================================================== */

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <>
      {/* ======================================================
          FLOATING AI BUTTON
          SQUARE / SMALLER / PREMIUM STYLE
         ====================================================== */}

      {!open && (
        <Tooltip
          title="Agentic Intelligence"
          placement="left"
          arrow
        >
          <Fab
            aria-label="Open Agentic Intelligence"
            onClick={handleOpen}
            sx={{
              position: "fixed",

              right: {
                xs: 16,
                sm: 22,
                md: 26,
              },

              bottom: {
                xs: 16,
                sm: 22,
                md: 26,
              },

              /*
               * IMPORTANT:
               * No circle.
               * Smaller square button.
               */
              width: {
                xs: 54,
                sm: 58,
                md: 60,
              },

              height: {
                xs: 54,
                sm: 58,
                md: 60,
              },

              minHeight: 0,

              borderRadius: "16px",

              bgcolor: NAVY,

              color: PRIMARY,

              zIndex: (theme) =>
                theme.zIndex.drawer + 2,

              boxShadow:
                "0 10px 26px rgba(15,23,42,0.28)",

              border:
                "1px solid rgba(255,255,255,0.08)",

              transition:
                "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease, background-color 220ms ease",

              "&:hover": {
                bgcolor: "#10213A",

                color: PRIMARY,

                transform:
                  "translateY(-3px) scale(1.025)",

                boxShadow:
                  "0 15px 32px rgba(15,23,42,0.34)",
              },

              "&:active": {
                transform:
                  "translateY(-1px) scale(0.98)",
              },
            }}
          >
            <SmartToyOutlinedIcon
              sx={{
                fontSize: {
                  xs: 27,
                  sm: 29,
                  md: 30,
                },

                color: PRIMARY,
              }}
            />
          </Fab>
        </Tooltip>
      )}

      {/* ======================================================
          RIGHT SIDE AI DRAWER
         ====================================================== */}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: (theme) =>
            theme.zIndex.modal,
        }}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          backdrop: {
            sx: {
              bgcolor:
                "rgba(15,23,42,0.52)",

              transition:
                "opacity 320ms ease !important",
            },
          },

          /*
           * Smooth drawer slide animation.
           */
          transition: {
            timeout: {
              enter: 420,
              exit: 360,
            },
          },

          paper: {
            sx: {
              width: {
                xs: "100%",
                sm: 480,
                md: 550,
              },

              maxWidth: "100vw",

              height: "100dvh",

              bgcolor: "#FFFFFF",

              backgroundImage: "none",

              borderLeft:
                "1px solid #E2E8F0",

              boxShadow:
                "-18px 0 50px rgba(15,23,42,0.22)",

              overflow: "hidden",

              /*
               * Slight easing for drawer itself.
               */
              transition:
                "box-shadow 350ms ease",
            },
          },
        }}
      >
        {/* ====================================================
            COMPLETE CHAT SCREEN
           ==================================================== */}

        <Box
          sx={{
            height: "100dvh",

            minHeight: 0,

            display: "flex",

            flexDirection: "column",

            bgcolor: "#FFFFFF",

            /*
             * Content animation.
             * Gives the chat screen a subtle premium
             * fade/slide effect.
             */
            animation: open
              ? "aiAssistantEnter 420ms cubic-bezier(.2,.8,.2,1)"
              : "none",

            "@keyframes aiAssistantEnter": {
              "0%": {
                opacity: 0,
                transform:
                  "translateX(18px)",
              },

              "100%": {
                opacity: 1,
                transform:
                  "translateX(0)",
              },
            },
          }}
        >
          {/* ==================================================
              HEADER
             ================================================== */}

          <Box
            sx={{
              px: {
                xs: 2.25,
                sm: 3,
              },

              pt: {
                xs: 2.25,
                sm: 2.75,
              },

              pb: 1,

              flexShrink: 0,
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",

                justifyContent:
                  "space-between",
              }}
            >
              {/* LEFT SIDE */}

              <Stack
                direction="row"
                spacing={1.75}
                sx={{
                  alignItems: "center",

                  minWidth: 0,
                }}
              >
                {/* ROBOT ICON */}

                <Box
                  sx={{
                    width: {
                      xs: 52,
                      sm: 56,
                    },

                    height: {
                      xs: 52,
                      sm: 56,
                    },

                    borderRadius: "14px",

                    bgcolor: NAVY,

                    color: PRIMARY,

                    display: "flex",

                    alignItems: "center",

                    justifyContent:
                      "center",

                    flexShrink: 0,

                    boxShadow:
                      "0 7px 18px rgba(15,23,42,0.14)",
                  }}
                >
                  <SmartToyOutlinedIcon
                    sx={{
                      fontSize: {
                        xs: 27,
                        sm: 30,
                      },

                      color: PRIMARY,
                    }}
                  />
                </Box>

                {/* TITLE */}

                <Box
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.08rem",
                      },

                      lineHeight: 1.15,

                      fontWeight: 800,

                      color: "#0F172A",

                      letterSpacing:
                        "-0.02em",

                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    Agentic Intelligence
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={0.7}
                    sx={{
                      alignItems:
                        "center",

                      mt: 0.55,
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,

                        borderRadius:
                          "50%",

                        bgcolor:
                          "#10B981",

                        boxShadow:
                          "0 0 0 3px rgba(16,185,129,.10)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.58rem",
                          sm: "0.62rem",
                        },

                        fontWeight: 800,

                        letterSpacing:
                          "0.075em",

                        color:
                          "#64748B",
                      }}
                    >
                      ACTIVE NEURAL ENGINE
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              {/* CLOSE BUTTON */}

              <IconButton
                aria-label="Close AI Assistant"
                onClick={handleClose}
                sx={{
                  ml: 1,

                  color: "#94A3B8",

                  width: 40,

                  height: 40,

                  flexShrink: 0,

                  borderRadius:
                    "12px",

                  transition:
                    "all 180ms ease",

                  "&:hover": {
                    bgcolor:
                      "#F1F5F9",

                    color:
                      "#475569",

                    transform:
                      "rotate(90deg)",
                  },
                }}
              >
                <CloseRoundedIcon
                  sx={{
                    fontSize: 26,
                  }}
                />
              </IconButton>
            </Stack>

            {/* =================================================
                QUICK ACTIONS
               ================================================= */}

            <Box
              sx={{
                mt: 2.25,

                minWidth: 0,

                overflowX: "auto",

                overflowY: "hidden",

                scrollbarWidth:
                  "none",

                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  width:
                    "max-content",

                  minWidth:
                    "100%",

                  pb: 0.75,
                }}
              >
                {quickActions.map(
                  (action) => (
                    <Chip
                      key={
                        action.label
                      }
                      label={
                        action.label
                      }
                      clickable
                      disabled={
                        thinking
                      }
                      onClick={() =>
                        sendMessage(
                          action.label,
                        )
                      }
                      sx={{
                        height: 36,

                        px: 0.5,

                        borderRadius:
                          "11px",

                        bgcolor:
                          "#F1F5F9",

                        border:
                          "1px solid #E2E8F0",

                        color:
                          "#52637C",

                        fontSize:
                          "0.72rem",

                        fontWeight: 700,

                        "& .MuiChip-label":
                          {
                            px: 1.25,
                          },

                        "&:hover": {
                          bgcolor:
                            "#E8EEF6",

                          borderColor:
                            "#CBD5E1",
                        },
                      }}
                    />
                  ),
                )}
              </Stack>

              {/* QUICK ACTION SCROLL INDICATOR */}

              <Box
                sx={{
                  height: 5,

                  width: "100%",

                  bgcolor:
                    "#E2E8F0",

                  borderRadius: 10,

                  position:
                    "relative",

                  mt: 0.1,
                }}
              >
                <Box
                  sx={{
                    position:
                      "absolute",

                    left: 0,

                    top: 0,

                    height: "100%",

                    width: "82%",

                    borderRadius: 10,

                    bgcolor:
                      "#C7D2E2",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* ==================================================
              HEADER DIVIDER
             ================================================== */}

          <Box
            sx={{
              mt: 1.75,

              borderTop:
                "1px solid #E2E8F0",

              flexShrink: 0,
            }}
          />

          {/* ==================================================
              MESSAGE CONTENT
             ================================================== */}

          <Box
            ref={messagesContainerRef}
            sx={{
              flex: 1,

              minHeight: 0,

              minWidth: 0,

              overflowY: "auto",

              px: {
                xs: 2.25,
                sm: 3.5,
              },

              pt: {
                xs: 2.5,
                sm: 3,
              },

              pb: 2.5,

              bgcolor:
                "#FFFFFF",

              scrollbarWidth:
                "thin",

              scrollbarColor:
                "#CBD5E1 transparent",

              "&::-webkit-scrollbar":
                {
                  width: 5,
                },

              "&::-webkit-scrollbar-thumb":
                {
                  background:
                    "#CBD5E1",

                  borderRadius: 10,
                },
            }}
          >
            <Stack
              spacing={2}
              sx={{
                width: "100%",
              }}
            >
              {messages.map(
                (item) => {
                  const isAssistant =
                    item.role ===
                    "assistant";

                  return (
                    <Stack
                      key={item.id}
                      direction="row"
                      sx={{
                        justifyContent:
                          isAssistant
                            ? "flex-start"
                            : "flex-end",

                        width:
                          "100%",
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          maxWidth: {
                            xs: "88%",
                            sm: "86%",
                          },

                          px: {
                            xs: 2,
                            sm: 2.5,
                          },

                          py: {
                            xs: 1.5,
                            sm: 1.75,
                          },

                          borderRadius:
                            isAssistant
                              ? "0 26px 26px 26px"
                              : "26px 0 26px 26px",

                          bgcolor:
                            isAssistant
                              ? "#F8FAFC"
                              : "#2563EB",

                          color:
                            isAssistant
                              ? "#23324A"
                              : "#FFFFFF",

                          border:
                            isAssistant
                              ? "1px solid #E2E8F0"
                              : "none",

                          boxShadow:
                            isAssistant
                              ? "0 2px 4px rgba(15,23,42,0.07)"
                              : "0 7px 20px rgba(37,99,235,0.18)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.84rem",
                              sm: "0.9rem",
                            },

                            lineHeight:
                              1.55,

                            fontWeight: 500,

                            letterSpacing:
                              "0.003em",

                            whiteSpace:
                              "pre-wrap",
                          }}
                        >
                          {
                            item.content
                          }
                        </Typography>
                      </Paper>
                    </Stack>
                  );
                },
              )}

              {/* THINKING */}

              {thinking && (
                <Stack
                  direction="row"
                  spacing={1.1}
                  sx={{
                    alignItems:
                      "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 30,

                      height: 30,

                      borderRadius:
                        "9px",

                      bgcolor: NAVY,

                      color:
                        PRIMARY,

                      display:
                        "grid",

                      placeItems:
                        "center",
                    }}
                  >
                    <SmartToyOutlinedIcon
                      sx={{
                        fontSize: 17,

                        color:
                          PRIMARY,
                      }}
                    />
                  </Box>

                  <Stack
                    direction="row"
                    spacing={0.9}
                    sx={{
                      alignItems:
                        "center",
                    }}
                  >
                    <CircularProgress
                      size={14}
                      thickness={5}
                      sx={{
                        color:
                          PRIMARY,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize:
                          "0.72rem",

                        color:
                          "#64748B",

                        fontWeight: 600,
                      }}
                    >
                      Neural engine
                      thinking...
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Box>

          {/* ==================================================
              COMMAND AREA
             ================================================== */}

          <Box
            sx={{
              flexShrink: 0,

              bgcolor:
                "#F8FAFC",

              borderTop:
                "1px solid #E2E8F0",

              px: {
                xs: 2.25,
                sm: 3,
              },

              pt: {
                xs: 1.5,
                sm: 1.75,
              },

              pb: {
                xs: 1.5,
                sm: 1.75,
              },
            }}
          >
            {/* INPUT */}

            <Paper
              elevation={0}
              sx={{
                minHeight: {
                  xs: 58,
                  sm: 62,
                },

                width: "100%",

                display:
                  "flex",

                alignItems:
                  "center",

                px: {
                  xs: 1,
                  sm: 1.25,
                },

                borderRadius:
                  "14px",

                bgcolor:
                  "#FFFFFF",

                border:
                  "1px solid #DCE3EC",

                boxShadow:
                  "0 2px 5px rgba(15,23,42,0.05)",
              }}
            >
              <TextField
                fullWidth
                multiline
                maxRows={3}
                variant="standard"
                value={message}
                inputRef={
                  inputRef
                }
                onChange={
                  handleInputChange
                }
                onKeyDown={
                  handleInputKeyDown
                }
                placeholder="Give a command..."
                disabled={
                  thinking
                }
                slotProps={{
                  input: {
                    disableUnderline:
                      true,

                    sx: {
                      px: {
                        xs: 0.75,
                        sm: 1,
                      },

                      fontSize: {
                        xs: "0.84rem",
                        sm: "0.9rem",
                      },

                      color:
                        "#1E293B",

                      "&::placeholder":
                        {
                          color:
                            "#9AA4B2",

                          opacity: 1,
                        },
                    },
                  },

                  htmlInput: {
                    "aria-label":
                      "Give a command",
                  },
                }}
                sx={{
                  "& .MuiInputBase-root":
                    {
                      padding:
                        "0 !important",
                    },
                }}
              />

              {/* MICROPHONE */}

              <IconButton
                aria-label="Voice command"
                disabled={
                  thinking
                }
                sx={{
                  width: 40,

                  height: 40,

                  flexShrink: 0,

                  color:
                    "#8FA4C1",

                  "&:hover": {
                    bgcolor:
                      "#F1F5F9",

                    color:
                      PRIMARY,
                  },
                }}
              >
                <MicNoneOutlinedIcon
                  sx={{
                    fontSize: 22,
                  }}
                />
              </IconButton>

              {/* SEND */}

              <IconButton
                aria-label="Send command"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !message.trim() ||
                  thinking
                }
                sx={{
                  width: {
                    xs: 44,
                    sm: 48,
                  },

                  height: {
                    xs: 44,
                    sm: 48,
                  },

                  ml: 0.5,

                  flexShrink: 0,

                  borderRadius:
                    "13px",

                  bgcolor:
                    "#2165F5",

                  color:
                    "#FFFFFF",

                  boxShadow:
                    "0 7px 16px rgba(33,101,245,0.20)",

                  transition:
                    "all 180ms ease",

                  "&:hover": {
                    bgcolor:
                      "#1557DC",

                    transform:
                      "translateY(-1px)",

                    boxShadow:
                      "0 9px 20px rgba(33,101,245,0.26)",
                  },

                  "&.Mui-disabled":
                    {
                      bgcolor:
                        "#CBD5E1",

                      color:
                        "#FFFFFF",

                      boxShadow:
                        "none",
                    },
                }}
              >
                <SendRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 21,
                      sm: 23,
                    },
                  }}
                />
              </IconButton>
            </Paper>

            {/* =================================================
                FOOTER
               ================================================= */}

            <Stack
              direction="row"
              sx={{
                alignItems:
                  "center",

                justifyContent:
                  "space-between",

                mt: {
                  xs: 1.25,
                  sm: 1.5,
                },

                px: {
                  xs: 0.75,
                  sm: 1.25,
                },
              }}
            >
              {/* LEFT ICONS */}

              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  alignItems:
                    "center",
                }}
              >
                <Tooltip
                  title="Conversation history"
                  arrow
                >
                  <IconButton
                    size="small"
                    sx={{
                      color:
                        "#8FA4C1",

                      width: 34,

                      height: 34,

                      borderRadius:
                        "10px",

                      "&:hover": {
                        bgcolor:
                          "#EAF0F7",

                        color:
                          PRIMARY,
                      },
                    }}
                  >
                    <HistoryOutlinedIcon
                      sx={{
                        fontSize:
                          19,
                      }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title="Assistant settings"
                  arrow
                >
                  <IconButton
                    size="small"
                    sx={{
                      color:
                        "#8FA4C1",

                      width: 34,

                      height: 34,

                      borderRadius:
                        "10px",

                      "&:hover": {
                        bgcolor:
                          "#EAF0F7",

                        color:
                          PRIMARY,
                      },
                    }}
                  >
                    <SettingsOutlinedIcon
                      sx={{
                        fontSize:
                          19,
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>

              {/* VERSION */}

              <Typography
                sx={{
                  fontSize: {
                    xs: "0.58rem",
                    sm: "0.62rem",
                  },

                  color:
                    "#657997",

                  fontWeight: 900,

                  letterSpacing:
                    "0.07em",
                }}
              >
                V4.2 PROACTIVE
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default AIAssistant;