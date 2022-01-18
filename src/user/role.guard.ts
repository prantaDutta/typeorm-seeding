import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common'
import { Role } from './role.enum'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context)

      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req.user?.role.includes(role)
    }
  }

  return mixin(RoleGuardMixin)
}
