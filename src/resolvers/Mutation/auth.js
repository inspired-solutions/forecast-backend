async function login(parent, { email, token }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })

    if (!user) {
        throw new Error(`No such user found for email: ${email}`)
    }

    return ctx.db.mutation.createAuthPayload({
        data: { email, token },
        info,
    });
}

async function authenticate(parent, { email, token }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email, token } })

    return !!user;
}

module.exports = {
    authenticate,
    login,
}