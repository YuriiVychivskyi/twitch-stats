export const mapTwitchUserToStreamer = (data) => {
  const { access_token, refresh_token, scope, expires_in, userData } = data
  const { id, login, display_name, email, profile_image_url } = userData

  return {
    twitchId: id,
    login,
    displayName: display_name,
    email,
    accessToken: access_token,
    refreshToken: refresh_token,
    scope: scope,
    expireIn: expires_in,
    profileImageUrl: profile_image_url,
  }
}
