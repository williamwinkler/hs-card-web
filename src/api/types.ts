export interface Info {
  amountOfCards?: number
  lastUpdate?: string
  systemStartTime?: string
}

export interface Cards {
  page?: number
  pageCount?: number
  cardCount?: number
  cards?: Card[]
}

export interface Card {
  id?: number
  collectible?: number
  classId?: number
  cardTypeId?: number
  cardSetId?: number
  rarityId?: number
  artistName?: string
  health?: number
  attack?: number
  manaCost?: number
  name?: string
  text?: string
  keywordIds?: number[]
  image?: string
  imageGold?: string
  flavorText?: string
  parentId?: number
  duals?: Duals
}

export interface RichCards {
  page?: number
  pageCount?: number
  cardCount?: number
  cards?: RichCard[]
}

export interface RichCard {
  id?: number
  collectible?: number
  class?: string
  cardType?: string
  cardSet?: string
  rarity?: string
  artistName?: string
  health?: number
  attack?: number
  manaCost?: number
  name?: string
  text?: string
  keywords?: string[]
  image?: string
  imageGold?: string
  flavorText?: string
  parentId?: number
  duals?: Duals
}

export interface Duals {
  relevant?: boolean
  constructed?: boolean
}

export interface Sets {
  id?: number
  name?: string
  type?: string
}

export interface Types {
  id?: number
  name?: string
}

export interface Classes {
  id?: number
  name?: string
}

export interface Rarities {
  id?: number
  name?: string
  craftingcost?: number[]
  dustvalue?: number[]
}

export interface Keywords {
  id?: number
  name?: string
  text?: string
}
