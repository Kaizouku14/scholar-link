import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  crud: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  scholarshipStudent: ac.newRole({
    crud: ["create"],
  }),

  scholarshipCoordinator: ac.newRole({
    crud: [...statement.crud],
  }),

  scholarshipAdmin: ac.newRole({
    crud: [...statement.crud],
    ...adminAc.statements,
  }),

  internshipStudent: ac.newRole({
    crud: ["create"],
  }),

  internshipCoordinator: ac.newRole({
    crud: [...statement.crud],
  }),

  internshipAdmin: ac.newRole({
    crud: [...statement.crud],
    ...adminAc.statements,
  }),
};
