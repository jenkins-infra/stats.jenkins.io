#!/usr/bin/env bats

ROUTER_FILE="src/main.tsx"

@test "route / exists" {
  grep -q "path: '/'" "$ROUTER_FILE"
}

@test "route /statistics exists" {
  grep -q "path: '/statistics'" "$ROUTER_FILE"
}

@test "route /plugin-trends exists" {
  grep -q "path: '/plugin-trends'" "$ROUTER_FILE"
}

@test "route /plugin-versions exists" {
  grep -q "path: '/plugin-versions'" "$ROUTER_FILE"
}

@test "route /dep-graph exists" {
  grep -q "path: '/dep-graph'" "$ROUTER_FILE"
}