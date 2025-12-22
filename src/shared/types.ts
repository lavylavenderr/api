export type LanyardResponse = {
    success: boolean;
    data: LanyardData;
};

export type LanyardData = {
    data: {
        active_on_discord_mobile: boolean;
        active_on_discord_desktop: boolean;
        listening_to_spotify: boolean;
        kv: Record<string, string>;
        spotify: SpotifyData | null;
        discord_user: DiscordUser;
        discord_status: string;
        activities: Activity[];
    }
};

export type SpotifyData = {
    track_id: string;
    timestamps: {
        start: number;
        end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
};

export type DiscordUser = {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    avatar: string;
};

export type Activity = {
    type: number;
    timestamps?: {
        start: number;
        end?: number;
    };
    sync_id?: string;
    state?: string;
    session_id?: string;
    party?: {
        id: string;
    };
    name: string;
    id: string;
    flags?: number;
    details?: string;
    created_at: number;
    assets?: {
        small_text?: string;
        small_image?: string;
        large_text?: string;
        large_image?: string;
    };
    application_id?: string;
};

export type DiscordAPIUser = {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar?: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration_data?: AvatarDecorationData | null;
  collectibles?: Collectibles | null;
  primary_guild?: UserPrimaryGuild | null;
};

export type AvatarDecorationData = {
  sku_id: string;
  asset: string;
};

export type Nameplate = {
  sku_id: string;
  asset: string;
  label: string;
  palette: string;
};

export type Collectibles = {
  nameplate?: Nameplate;
};

export type UserPrimaryGuild = {
  identity_guild_id: string;
  identity_enabled: boolean;
  tag: string;
  badge: string;
};
