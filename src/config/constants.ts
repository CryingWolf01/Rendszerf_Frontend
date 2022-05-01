export const BACKEND_URL = "http://localhost:8080";

export const AUTH_TOKEN_KEY = "@auth_token";
export const PROFILE_TYPE_KEY = "@profile_typs";
export const CALENDAR_VIEW_KEY = "@calendar_view";
export const COOKIE_CONSENT = "@cookie_consent";

export const NUMBER_FORMAT = /^[-+]?[0-9]?\.?[0-9]+$/;

export const SIDEBAR_WIDTH = 73;
export const HEADER_HEIGHT = 78;

export const MAINTENANCE_INTERVAL = [
  "WEEK",
  "MONTH",
  "QUARTER",
  "HALF_YEAR",
  "YEAR"
];

export const USER_TYPES = [
  "ADMIN",
  "TOOL_MANAGER",
  "OPERATOR",
  "REPAIRMAN"
];

export const ISSUE_STATUSES = [
  "NEW",
  "SCHEDULED",
  "ACCEPTED",
  "DECLINED",
  "STARTED",
  "COMPLETED"
];

export const SEVERITY_TYPES = [
  "LOW",
  "NORMAL",
  "HIGH"
];

export const ISSUE_TYPES = [
  "MAINTENANCE",
  "EXTRAORDINARY",
  "OTHER"
];