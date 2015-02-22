"use strict";

module.exports = {
  tableName: "accounts",
  columns: {
    id: { type: "int", key: "true" },
    name: { type: "text" },
    url: { type: "text" },
    notes: { type: "text" },
  }
};
