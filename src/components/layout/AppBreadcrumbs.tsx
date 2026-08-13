import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { findTrail } from "@/features/navigation/navigation.config";

/** Route-driven breadcrumb trail. */
export function AppBreadcrumbs() {
  const { pathname } = useLocation();
  const trail = findTrail(pathname);

  return (
    <Breadcrumbs sx={{ fontSize: "0.8125rem" }}>
      <Link
        component={RouterLink}
        to="/"
        underline="hover"
        color="text.secondary"
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
      >
        <HomeIcon sx={{ fontSize: 15 }} />
        Home
      </Link>
      {trail.map((item, index) => {
        const last = index === trail.length - 1;
        if (last || !item.path) {
          return (
            <Typography key={item.id} variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
              {item.label}
            </Typography>
          );
        }
        return (
          <Link
            key={item.id}
            component={RouterLink}
            to={item.path}
            underline="hover"
            color="text.secondary"
            variant="body2"
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
