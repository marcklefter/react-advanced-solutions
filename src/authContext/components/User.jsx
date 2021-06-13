import React from 'react';

export function User({ user }) {
  return <span>{user.name} | {user.email}</span>
}