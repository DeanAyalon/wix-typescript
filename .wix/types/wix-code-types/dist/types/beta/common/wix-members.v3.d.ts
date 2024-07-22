declare module "wix-members.v3" {
  /**
   * A Badge is a a visible label to be displayed on a site member's profile.
   * You can use badges to create specific categories of members within your site.
   * Read more about Badges
   * in this [article](https://support.wix.com/en/article/about-member-badges).
   */
  interface Badge {
      /**
       * Badge ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Badge is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Badge.
       * Ignored when creating a Badge.
       * @readonly
       */
      revision?: string | null;
      /** Text displayed on the badge in the Wix UI. */
      title?: string | null;
      /** Badge description. */
      description?: string | null;
      /**
       * Badge background color in hexadecimal RGB format.
       * Uppercase letters only.
       * Example: `#FFFFFF`.
       */
      backgroundColor?: string | null;
      /**
       * Badge text color in hexadecimal RGB format.
       * Uppercase letters only.
       * Example: `#C81B53`.
       */
      textColor?: string | null;
      /**
       * Badge icon image.
       * _Recommended_ to use `SVG` image format as it is resolution independent and looks great at any scale.
       */
      icon?: string;
      /**
       * Whether the badge has special permissions
       * to access specific members-only pages.
       * When `true`, members with the badge receive special permissions,
       * and site contributors can
       * [manage badge permissions](https://support.wix.com/en/article/setting-permissions-for-a-member-badge)
       * in the site dashboard.
       * When `false`, members with the badge receive no special permissions.
       */
      permissionsEnabled?: boolean | null;
      /**
       * Slugified name. Used to represent the badge in a URL.
       * @readonly
       */
      slug?: string | null;
      /**
       * Date and time the Badge was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the Badge was last updated.
       * @readonly
       */
      _updatedDate?: Date;
  }
  interface CreateBadgeRequest {
      /** Badge to create. */
      badge: Badge;
  }
  interface CreateBadgeResponse {
      /** Created badge. */
      badge?: Badge;
  }
  interface GetBadgeRequest {
      /** Badge ID. */
      badgeId: string;
  }
  interface GetBadgeResponse {
      /** Badge. */
      badge?: Badge;
  }
  interface ListBadgesRequest {
      /**
       * Pagination options. For more information, see
       * [API Query Language: The Paging Section]
       * (https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-paging-section)
       */
      paging?: CursorPaging$1;
  }
  interface CursorPaging$1 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListBadgesResponse {
      /** List of badges. */
      badges?: Badge[];
      /** Metadata for the paginated results. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface QueryBadgesRequest {
      /** CursorQuery from protodep */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface QueryBadgesResponse {
      /** List of badges. */
      badges?: Badge[];
      /** Metadata for the paginated results. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface UpdateBadgeRequest {
      /** Badge to update. */
      badge: Badge;
  }
  interface UpdateBadgeResponse {
      /** Updated badge. */
      badge?: Badge;
  }
  interface DeleteBadgeRequest {
      /** Badge ID. */
      badgeId: string;
  }
  interface DeleteBadgeResponse {
  }
  interface UpdateBadgesDisplayOrderRequest {
      /** Ordered badge IDs. */
      ids: string[];
  }
  interface UpdateBadgesDisplayOrderResponse {
      /** Reordered badges list. */
      badges?: Badge[];
  }
  interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp. */
      eventTime?: Date;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo$2;
  }
  interface UndeleteInfo$2 {
      deletedDate?: Date;
  }
  interface EntityUpdatedEvent$2 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent$2 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$2 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$2 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a new Badge.
   * @param badge - Badge to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField badge
   * @requiredField badge.title
   * @adminMethod
   * @returns Created badge.
   */
  function createBadge(badge: Badge): Promise<Badge>;
  /**
   * Retrieves a Badge.
   * @param badgeId - Badge ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField badgeId
   * @returns Badge.
   */
  function getBadge(badgeId: string): Promise<Badge>;
  /**
   * Retrieves up to 1000 badges, given the requested paging.
   * Default `paging.limit` is 100, `paging.offset` - 0.
   * For more information, see
   * [API Query Language: The Paging Section]
   * (https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-paging-section).
   * @internal
   * @documentationMaturity preview
   */
  function listBadges(options?: ListBadgesOptions): Promise<ListBadgesResponse>;
  interface ListBadgesOptions {
      /**
       * Pagination options. For more information, see
       * [API Query Language: The Paging Section]
       * (https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-paging-section)
       */
      paging?: CursorPaging$1;
  }
  /**
   * Retrieves up to 1000 badges, given the requested query options, paging, and sorting.
   * Default `paging.limit` is 100, `paging.offset` - 0.
   * For more information, see
   * [API Query Language: The Paging Section](https://dev.wix.com/api/rest/getting-started/api-query-language#getting-started_api-query-language_the-paging-section).
   * @internal
   * @documentationMaturity preview
   */
  function queryBadges(): BadgesQueryBuilder;
  interface QueryOffsetResult {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface BadgesQueryResult extends QueryOffsetResult {
      items: Badge[];
      query: BadgesQueryBuilder;
      next: () => Promise<BadgesQueryResult>;
      prev: () => Promise<BadgesQueryResult>;
  }
  interface BadgesQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'title' | 'description' | 'permissionsEnabled' | 'slug', value: any) => BadgesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'title' | 'description' | 'permissionsEnabled' | 'slug', value: any) => BadgesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id' | 'title' | 'description' | 'slug', value: string) => BadgesQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | 'title' | 'description' | 'permissionsEnabled' | 'slug', value: any[]) => BadgesQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'title' | 'description' | 'permissionsEnabled' | 'slug', value: any) => BadgesQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'title' | 'description' | 'permissionsEnabled' | 'slug', value: boolean) => BadgesQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'title' | 'description' | 'permissionsEnabled' | 'slug'>) => BadgesQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => BadgesQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => BadgesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<BadgesQueryResult>;
  }
  /**
   * Updates a badge's specified properties.
   * @param _id - Badge ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField badge
   * @adminMethod
   * @returns Updated badge.
   */
  function updateBadge(_id: string | null, badge: UpdateBadge): Promise<Badge>;
  interface UpdateBadge {
      /**
       * Badge ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Badge is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Badge.
       * Ignored when creating a Badge.
       * @readonly
       */
      revision?: string | null;
      /** Text displayed on the badge in the Wix UI. */
      title?: string | null;
      /** Badge description. */
      description?: string | null;
      /**
       * Badge background color in hexadecimal RGB format.
       * Uppercase letters only.
       * Example: `#FFFFFF`.
       */
      backgroundColor?: string | null;
      /**
       * Badge text color in hexadecimal RGB format.
       * Uppercase letters only.
       * Example: `#C81B53`.
       */
      textColor?: string | null;
      /**
       * Badge icon image.
       * _Recommended_ to use `SVG` image format as it is resolution independent and looks great at any scale.
       */
      icon?: string;
      /**
       * Whether the badge has special permissions
       * to access specific members-only pages.
       * When `true`, members with the badge receive special permissions,
       * and site contributors can
       * [manage badge permissions](https://support.wix.com/en/article/setting-permissions-for-a-member-badge)
       * in the site dashboard.
       * When `false`, members with the badge receive no special permissions.
       */
      permissionsEnabled?: boolean | null;
      /**
       * Slugified name. Used to represent the badge in a URL.
       * @readonly
       */
      slug?: string | null;
      /**
       * Date and time the Badge was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the Badge was last updated.
       * @readonly
       */
      _updatedDate?: Date;
  }
  /**
   * Deletes a badge.
   * @param badgeId - Badge ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField badgeId
   * @adminMethod
   */
  function deleteBadge(badgeId: string): Promise<void>;
  /**
   * Updates badges' display order.
   * @param ids - Ordered badge IDs.
   * @internal
   * @documentationMaturity preview
   * @requiredField ids
   * @adminMethod
   */
  function updateBadgesDisplayOrder(ids: string[]): Promise<UpdateBadgesDisplayOrderResponse>;
  
  type badgesV4Badge_universal_d_Badge = Badge;
  type badgesV4Badge_universal_d_CreateBadgeRequest = CreateBadgeRequest;
  type badgesV4Badge_universal_d_CreateBadgeResponse = CreateBadgeResponse;
  type badgesV4Badge_universal_d_GetBadgeRequest = GetBadgeRequest;
  type badgesV4Badge_universal_d_GetBadgeResponse = GetBadgeResponse;
  type badgesV4Badge_universal_d_ListBadgesRequest = ListBadgesRequest;
  type badgesV4Badge_universal_d_ListBadgesResponse = ListBadgesResponse;
  type badgesV4Badge_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type badgesV4Badge_universal_d_QueryBadgesRequest = QueryBadgesRequest;
  type badgesV4Badge_universal_d_CursorQuery = CursorQuery;
  type badgesV4Badge_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type badgesV4Badge_universal_d_Sorting = Sorting;
  type badgesV4Badge_universal_d_SortOrder = SortOrder;
  const badgesV4Badge_universal_d_SortOrder: typeof SortOrder;
  type badgesV4Badge_universal_d_QueryBadgesResponse = QueryBadgesResponse;
  type badgesV4Badge_universal_d_UpdateBadgeRequest = UpdateBadgeRequest;
  type badgesV4Badge_universal_d_UpdateBadgeResponse = UpdateBadgeResponse;
  type badgesV4Badge_universal_d_DeleteBadgeRequest = DeleteBadgeRequest;
  type badgesV4Badge_universal_d_DeleteBadgeResponse = DeleteBadgeResponse;
  type badgesV4Badge_universal_d_UpdateBadgesDisplayOrderRequest = UpdateBadgesDisplayOrderRequest;
  type badgesV4Badge_universal_d_UpdateBadgesDisplayOrderResponse = UpdateBadgesDisplayOrderResponse;
  const badgesV4Badge_universal_d_createBadge: typeof createBadge;
  const badgesV4Badge_universal_d_getBadge: typeof getBadge;
  const badgesV4Badge_universal_d_listBadges: typeof listBadges;
  type badgesV4Badge_universal_d_ListBadgesOptions = ListBadgesOptions;
  const badgesV4Badge_universal_d_queryBadges: typeof queryBadges;
  type badgesV4Badge_universal_d_BadgesQueryResult = BadgesQueryResult;
  type badgesV4Badge_universal_d_BadgesQueryBuilder = BadgesQueryBuilder;
  const badgesV4Badge_universal_d_updateBadge: typeof updateBadge;
  type badgesV4Badge_universal_d_UpdateBadge = UpdateBadge;
  const badgesV4Badge_universal_d_deleteBadge: typeof deleteBadge;
  const badgesV4Badge_universal_d_updateBadgesDisplayOrder: typeof updateBadgesDisplayOrder;
  namespace badgesV4Badge_universal_d {
    export {
      badgesV4Badge_universal_d_Badge as Badge,
      badgesV4Badge_universal_d_CreateBadgeRequest as CreateBadgeRequest,
      badgesV4Badge_universal_d_CreateBadgeResponse as CreateBadgeResponse,
      badgesV4Badge_universal_d_GetBadgeRequest as GetBadgeRequest,
      badgesV4Badge_universal_d_GetBadgeResponse as GetBadgeResponse,
      badgesV4Badge_universal_d_ListBadgesRequest as ListBadgesRequest,
      CursorPaging$1 as CursorPaging,
      badgesV4Badge_universal_d_ListBadgesResponse as ListBadgesResponse,
      badgesV4Badge_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      Cursors$1 as Cursors,
      badgesV4Badge_universal_d_QueryBadgesRequest as QueryBadgesRequest,
      badgesV4Badge_universal_d_CursorQuery as CursorQuery,
      badgesV4Badge_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      badgesV4Badge_universal_d_Sorting as Sorting,
      badgesV4Badge_universal_d_SortOrder as SortOrder,
      badgesV4Badge_universal_d_QueryBadgesResponse as QueryBadgesResponse,
      badgesV4Badge_universal_d_UpdateBadgeRequest as UpdateBadgeRequest,
      badgesV4Badge_universal_d_UpdateBadgeResponse as UpdateBadgeResponse,
      badgesV4Badge_universal_d_DeleteBadgeRequest as DeleteBadgeRequest,
      badgesV4Badge_universal_d_DeleteBadgeResponse as DeleteBadgeResponse,
      badgesV4Badge_universal_d_UpdateBadgesDisplayOrderRequest as UpdateBadgesDisplayOrderRequest,
      badgesV4Badge_universal_d_UpdateBadgesDisplayOrderResponse as UpdateBadgesDisplayOrderResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      UndeleteInfo$2 as UndeleteInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      badgesV4Badge_universal_d_createBadge as createBadge,
      badgesV4Badge_universal_d_getBadge as getBadge,
      badgesV4Badge_universal_d_listBadges as listBadges,
      badgesV4Badge_universal_d_ListBadgesOptions as ListBadgesOptions,
      badgesV4Badge_universal_d_queryBadges as queryBadges,
      badgesV4Badge_universal_d_BadgesQueryResult as BadgesQueryResult,
      badgesV4Badge_universal_d_BadgesQueryBuilder as BadgesQueryBuilder,
      badgesV4Badge_universal_d_updateBadge as updateBadge,
      badgesV4Badge_universal_d_UpdateBadge as UpdateBadge,
      badgesV4Badge_universal_d_deleteBadge as deleteBadge,
      badgesV4Badge_universal_d_updateBadgesDisplayOrder as updateBadgesDisplayOrder,
    };
  }
  
  /** Custom field */
  interface CustomField {
      /**
       * Field ID.
       * @readonly
       */
      _id?: string | null;
      /** Human-readable name shown in the business manager and live site. */
      name?: string | null;
      /**
       * Field key.
       * @readonly
       */
      key?: string | null;
      /** Default privacy of custom field. */
      defaultPrivacy?: Privacy;
      /** Type of data the field holds. */
      fieldType?: Type;
      /** Social field type. */
      socialType?: SocialTypeType;
      /**
       * Field origin.
       * @readonly
       */
      fieldOrigin?: Origin;
      /**
       * Describes whom the custom field applies to.
       * @readonly
       */
      appliesTo?: AppliesTo;
      /**
       * The section the field belongs to.
       * @readonly
       */
      section?: Section;
      /**
       * Date and time when the field was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time when the field was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Revision number, used for checking the optimistic lock condition. */
      revision?: string | null;
  }
  enum Privacy {
      UNKNOWN = "UNKNOWN",
      PUBLIC = "PUBLIC",
      PRIVATE = "PRIVATE"
  }
  enum Type {
      UNKNOWN = "UNKNOWN",
      TEXT = "TEXT",
      NUMBER = "NUMBER",
      DATE = "DATE",
      URL = "URL",
      SOCIAL = "SOCIAL"
  }
  enum SocialTypeType {
      UNKNOWN = "UNKNOWN",
      FACEBOOK = "FACEBOOK",
      INSTAGRAM = "INSTAGRAM",
      LINKEDIN = "LINKEDIN",
      TWITTER = "TWITTER",
      YOUTUBE = "YOUTUBE",
      PINTEREST = "PINTEREST",
      TIKTOK = "TIKTOK",
      DEVIANTART = "DEVIANTART",
      SOUNDCLOUD = "SOUNDCLOUD",
      TUMBLR = "TUMBLR",
      VIMEO = "VIMEO",
      VKONTAKTE = "VKONTAKTE",
      ODNOKLASSNIKI = "ODNOKLASSNIKI",
      OTHER = "OTHER"
  }
  enum Origin {
      UNKNOWN = "UNKNOWN",
      CUSTOM = "CUSTOM",
      CONTACT = "CONTACT",
      SYSTEM = "SYSTEM"
  }
  enum AppliesTo {
      ALL_MEMBERS = "ALL_MEMBERS",
      SELECTED_MEMBERS = "SELECTED_MEMBERS"
  }
  enum Section {
      GENERAL = "GENERAL",
      SOCIAL = "SOCIAL",
      DISPLAY_INFO = "DISPLAY_INFO",
      ADDRESS = "ADDRESS"
  }
  interface CreateCustomFieldRequest {
      /** Custom field to create. */
      field: CustomField;
  }
  interface CreateCustomFieldResponse {
      /** Newly created custom field. */
      field?: CustomField;
  }
  interface IncorrectFieldTypeData {
      incorrectType?: Type;
      correctType?: Type;
  }
  interface IncorrectPrivacyData {
      incorrectPrivacy?: Privacy;
      correctPrivacy?: Privacy;
  }
  interface GetCustomFieldRequest {
      /** Custom field ID. */
      _id: string | null;
  }
  interface GetCustomFieldResponse {
      /** The requested custom field. */
      field?: CustomField;
  }
  interface ListCustomFieldsRequest {
      paging?: Paging;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListCustomFieldsResponse {
      fields?: CustomField[];
      metadata?: PagingMetadata;
  }
  interface PagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface UpdateCustomFieldRequest {
      /** Custom field details to update. */
      field: CustomField;
  }
  interface UpdateCustomFieldResponse {
      /** Updated custom field. */
      field?: CustomField;
  }
  interface DefaultPrivacyChanged {
      fromPrivacy?: Privacy;
      toPrivacy?: Privacy;
  }
  interface ReservedFieldNameNonEditable {
      newName?: string;
      currentName?: string;
  }
  interface DeleteCustomFieldRequest {
      /** ID of the custom field to delete. */
      _id: string | null;
      /** Revision number. */
      revision: string | null;
  }
  interface DeleteCustomFieldResponse {
  }
  interface HideCustomFieldRequest {
      /** ID of the custom field to hide. */
      _id: string | null;
      /** Revision number. */
      revision: string | null;
  }
  interface HideCustomFieldResponse {
  }
  interface UpdateCustomFieldsOrderRequest {
      /** Ordered custom field ids. */
      fieldIds: string[];
      /** The section given fields belong to. */
      section?: Section;
  }
  interface UpdateCustomFieldsOrderResponse {
      /** Reordered custom fields. */
      fields?: CustomField[];
      /** The section given fields belong to. */
      section?: Section;
  }
  interface MetaSiteSpecialEvent extends MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
      /** A meta site id. */
      metaSiteId?: string;
      /** A meta site version. Monotonically increasing. */
      version?: string;
      /** A timestamp of the event. */
      timestamp?: string;
      /** A list of "assets" (applications). The same as MetaSiteContext. */
      assets?: Asset[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
  }
  interface Asset {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State;
  }
  enum State {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext;
      /**
       * A meta site id from which this site was created.
       *
       * In case of a creation from a template it's a template id.
       * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
       */
      originMetaSiteId?: string | null;
      /** A meta site name (URL slug). */
      siteName?: string;
      /** A namespace. */
      namespace?: Namespace;
  }
  enum SiteCreatedContext {
      /** A valid option, we don't expose all reasons why site might be created. */
      OTHER = "OTHER",
      /** A meta site was created from template. */
      FROM_TEMPLATE = "FROM_TEMPLATE",
      /** A meta site was created by copying of the transfferred meta site. */
      DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
      /** A copy of existing meta site. */
      DUPLICATE = "DUPLICATE",
      /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
      OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
      /** deprecated A meta site was created for Flash editor. */
      FLASH = "FLASH"
  }
  enum Namespace {
      UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
      /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
      WIX = "WIX",
      /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      SHOUT_OUT = "SHOUT_OUT",
      /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ALBUMS = "ALBUMS",
      /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
      /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      HOTELS = "HOTELS",
      /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      CLUBS = "CLUBS",
      /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
      /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_SITE = "DEV_SITE",
      /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      LOGOS = "LOGOS",
      /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      VIDEO_MAKER = "VIDEO_MAKER",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
      /**
       * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
       *
       * Meta site with this namespace will *not* be shown in a user's site list by default.
       */
      HTML_DRAFT = "HTML_DRAFT",
      /**
       * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
       * Will be accessible from Site List and will not have a website app.
       * Once the user attaches a site, the site will become a regular wixsite.
       */
      SITELESS_BUSINESS = "SITELESS_BUSINESS",
      /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
      CREATOR_ECONOMY = "CREATOR_ECONOMY",
      /** It is to be used in the Business First efforts. */
      DASHBOARD_FIRST = "DASHBOARD_FIRST",
      /** Bookings business flow with no site. */
      ANYWHERE = "ANYWHERE",
      /** Namespace for Headless Backoffice with no editor */
      HEADLESS = "HEADLESS",
      /**
       * Namespace for master site that will exist in parent account that will be referenced by subaccounts
       * The site will be used for account level CSM feature for enterprise
       */
      ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
      /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
      RISE = "RISE",
      /**
       * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
       * There's a blank site behind the scene but it's blank).
       * The Mobile company will be the owner of this namespace.
       */
      BRANDED_FIRST = "BRANDED_FIRST"
  }
  /** Site transferred to another user. */
  interface SiteTransferred {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface DeleteContext {
      /** When the meta site was deleted. */
      dateDeleted?: Date;
      /** A status. */
      deleteStatus?: DeleteStatus;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished {
  }
  interface SiteUnpublished {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate {
  }
  interface SiteMarkedAsWixSite {
  }
  interface ServiceProvisioned {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
  }
  interface ServiceRemoved {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed {
      /** A new meta site name (URL slug). */
      newSiteName?: string;
      /** A previous meta site name (URL slug). */
      oldSiteName?: string;
  }
  /**
   * Hard deletion of the meta site.
   *
   * Could not be restored. Therefore it's desirable to cleanup data.
   */
  interface SiteHardDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface NamespaceChanged {
      /** A previous namespace. */
      oldNamespace?: Namespace;
      /** A new namespace. */
      newNamespace?: Namespace;
  }
  /** Assigned Studio editor */
  interface StudioAssigned {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned {
  }
  interface Empty$1 {
  }
  interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp. */
      eventTime?: Date;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
  }
  interface EntityCreatedEvent$1 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo$1;
  }
  interface UndeleteInfo$1 {
      deletedDate?: Date;
  }
  interface EntityUpdatedEvent$1 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent$1 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$1 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$1 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$1;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$1;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a custom field.
   * @param field - Custom field to create.
   * @public
   * @documentationMaturity preview
   * @requiredField field
   * @requiredField field.name
   * @adminMethod
   * @returns Newly created custom field.
   */
  function createCustomField(field: CustomField): Promise<CustomField>;
  /**
   * Retrieves a custom field by id.
   * @param _id - Custom field ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   */
  function getCustomField(_id: string | null): Promise<GetCustomFieldResponse>;
  /**
   * Returns ordered custom fields, given the provided paging.
   *
   * The fields are ordered by section in such sequence:
   * - `GENERAL`
   * - `DISPLAY_INFO`
   * - `SOCIAL`
   * The fields within same section are ordered with respect to the saved fields order.
   *
   * To modify the order of fields within sections, use [`Update Custom Fields Order`]().
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function listCustomFields(options?: ListCustomFieldsOptions): Promise<ListCustomFieldsResponse>;
  interface ListCustomFieldsOptions {
      paging?: Paging;
  }
  /**
   * Updates a custom field.
   *
   * Allowed fields to update:
   * - when `fieldOrigin` is `CUSTOM`: `name`, `defaultPrivacy`, `socialType`.
   * - when `fieldOrigin` is `CONTACT` or `SYSTEM`: `defaultPrivacy`.
   * @param _id - Field ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField field
   * @requiredField field.revision
   * @adminMethod
   * @returns Updated custom field.
   */
  function updateCustomField(_id: string | null, field: UpdateCustomField): Promise<CustomField>;
  interface UpdateCustomField {
      /**
       * Field ID.
       * @readonly
       */
      _id?: string | null;
      /** Human-readable name shown in the business manager and live site. */
      name?: string | null;
      /**
       * Field key.
       * @readonly
       */
      key?: string | null;
      /** Default privacy of custom field. */
      defaultPrivacy?: Privacy;
      /** Type of data the field holds. */
      fieldType?: Type;
      /** Social field type. */
      socialType?: SocialTypeType;
      /**
       * Field origin.
       * @readonly
       */
      fieldOrigin?: Origin;
      /**
       * Describes whom the custom field applies to.
       * @readonly
       */
      appliesTo?: AppliesTo;
      /**
       * The section the field belongs to.
       * @readonly
       */
      section?: Section;
      /**
       * Date and time when the field was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time when the field was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Revision number, used for checking the optimistic lock condition. */
      revision?: string | null;
  }
  /**
   * Deletes a custom field.
   *
   * After this action, related custom field in Contacts List will also be removed.
   * @param _id - ID of the custom field to delete.
   * @param revision - Revision number.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField revision
   * @adminMethod
   */
  function deleteCustomField(_id: string | null, revision: string | null): Promise<void>;
  /**
   * Hides a custom field.
   *
   * Hidden field will be removed from the members custom fields list, yet it will be available as a suggested field to be add later.
   *
   * After this action, related contacts custom field will still be available in the Contacts List.
   * @param _id - ID of the custom field to hide.
   * @param revision - Revision number.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField revision
   * @adminMethod
   */
  function hideCustomField(_id: string | null, revision: string | null): Promise<void>;
  /**
   * Updates custom fields order within a section.
   * @param fieldIds - Ordered custom field ids.
   * @public
   * @documentationMaturity preview
   * @requiredField fieldIds
   * @adminMethod
   */
  function updateCustomFieldsOrder(fieldIds: string[], options?: UpdateCustomFieldsOrderOptions): Promise<UpdateCustomFieldsOrderResponse>;
  interface UpdateCustomFieldsOrderOptions {
      /** The section given fields belong to. */
      section?: Section;
  }
  
  type membersV1CustomField_universal_d_CustomField = CustomField;
  type membersV1CustomField_universal_d_Privacy = Privacy;
  const membersV1CustomField_universal_d_Privacy: typeof Privacy;
  type membersV1CustomField_universal_d_Type = Type;
  const membersV1CustomField_universal_d_Type: typeof Type;
  type membersV1CustomField_universal_d_SocialTypeType = SocialTypeType;
  const membersV1CustomField_universal_d_SocialTypeType: typeof SocialTypeType;
  type membersV1CustomField_universal_d_Origin = Origin;
  const membersV1CustomField_universal_d_Origin: typeof Origin;
  type membersV1CustomField_universal_d_AppliesTo = AppliesTo;
  const membersV1CustomField_universal_d_AppliesTo: typeof AppliesTo;
  type membersV1CustomField_universal_d_Section = Section;
  const membersV1CustomField_universal_d_Section: typeof Section;
  type membersV1CustomField_universal_d_CreateCustomFieldRequest = CreateCustomFieldRequest;
  type membersV1CustomField_universal_d_CreateCustomFieldResponse = CreateCustomFieldResponse;
  type membersV1CustomField_universal_d_IncorrectFieldTypeData = IncorrectFieldTypeData;
  type membersV1CustomField_universal_d_IncorrectPrivacyData = IncorrectPrivacyData;
  type membersV1CustomField_universal_d_GetCustomFieldRequest = GetCustomFieldRequest;
  type membersV1CustomField_universal_d_GetCustomFieldResponse = GetCustomFieldResponse;
  type membersV1CustomField_universal_d_ListCustomFieldsRequest = ListCustomFieldsRequest;
  type membersV1CustomField_universal_d_Paging = Paging;
  type membersV1CustomField_universal_d_ListCustomFieldsResponse = ListCustomFieldsResponse;
  type membersV1CustomField_universal_d_PagingMetadata = PagingMetadata;
  type membersV1CustomField_universal_d_UpdateCustomFieldRequest = UpdateCustomFieldRequest;
  type membersV1CustomField_universal_d_UpdateCustomFieldResponse = UpdateCustomFieldResponse;
  type membersV1CustomField_universal_d_DefaultPrivacyChanged = DefaultPrivacyChanged;
  type membersV1CustomField_universal_d_ReservedFieldNameNonEditable = ReservedFieldNameNonEditable;
  type membersV1CustomField_universal_d_DeleteCustomFieldRequest = DeleteCustomFieldRequest;
  type membersV1CustomField_universal_d_DeleteCustomFieldResponse = DeleteCustomFieldResponse;
  type membersV1CustomField_universal_d_HideCustomFieldRequest = HideCustomFieldRequest;
  type membersV1CustomField_universal_d_HideCustomFieldResponse = HideCustomFieldResponse;
  type membersV1CustomField_universal_d_UpdateCustomFieldsOrderRequest = UpdateCustomFieldsOrderRequest;
  type membersV1CustomField_universal_d_UpdateCustomFieldsOrderResponse = UpdateCustomFieldsOrderResponse;
  type membersV1CustomField_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type membersV1CustomField_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type membersV1CustomField_universal_d_Asset = Asset;
  type membersV1CustomField_universal_d_State = State;
  const membersV1CustomField_universal_d_State: typeof State;
  type membersV1CustomField_universal_d_SiteCreated = SiteCreated;
  type membersV1CustomField_universal_d_SiteCreatedContext = SiteCreatedContext;
  const membersV1CustomField_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type membersV1CustomField_universal_d_Namespace = Namespace;
  const membersV1CustomField_universal_d_Namespace: typeof Namespace;
  type membersV1CustomField_universal_d_SiteTransferred = SiteTransferred;
  type membersV1CustomField_universal_d_SiteDeleted = SiteDeleted;
  type membersV1CustomField_universal_d_DeleteContext = DeleteContext;
  type membersV1CustomField_universal_d_DeleteStatus = DeleteStatus;
  const membersV1CustomField_universal_d_DeleteStatus: typeof DeleteStatus;
  type membersV1CustomField_universal_d_SiteUndeleted = SiteUndeleted;
  type membersV1CustomField_universal_d_SitePublished = SitePublished;
  type membersV1CustomField_universal_d_SiteUnpublished = SiteUnpublished;
  type membersV1CustomField_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type membersV1CustomField_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type membersV1CustomField_universal_d_ServiceProvisioned = ServiceProvisioned;
  type membersV1CustomField_universal_d_ServiceRemoved = ServiceRemoved;
  type membersV1CustomField_universal_d_SiteRenamed = SiteRenamed;
  type membersV1CustomField_universal_d_SiteHardDeleted = SiteHardDeleted;
  type membersV1CustomField_universal_d_NamespaceChanged = NamespaceChanged;
  type membersV1CustomField_universal_d_StudioAssigned = StudioAssigned;
  type membersV1CustomField_universal_d_StudioUnassigned = StudioUnassigned;
  const membersV1CustomField_universal_d_createCustomField: typeof createCustomField;
  const membersV1CustomField_universal_d_getCustomField: typeof getCustomField;
  const membersV1CustomField_universal_d_listCustomFields: typeof listCustomFields;
  type membersV1CustomField_universal_d_ListCustomFieldsOptions = ListCustomFieldsOptions;
  const membersV1CustomField_universal_d_updateCustomField: typeof updateCustomField;
  type membersV1CustomField_universal_d_UpdateCustomField = UpdateCustomField;
  const membersV1CustomField_universal_d_deleteCustomField: typeof deleteCustomField;
  const membersV1CustomField_universal_d_hideCustomField: typeof hideCustomField;
  const membersV1CustomField_universal_d_updateCustomFieldsOrder: typeof updateCustomFieldsOrder;
  type membersV1CustomField_universal_d_UpdateCustomFieldsOrderOptions = UpdateCustomFieldsOrderOptions;
  namespace membersV1CustomField_universal_d {
    export {
      membersV1CustomField_universal_d_CustomField as CustomField,
      membersV1CustomField_universal_d_Privacy as Privacy,
      membersV1CustomField_universal_d_Type as Type,
      membersV1CustomField_universal_d_SocialTypeType as SocialTypeType,
      membersV1CustomField_universal_d_Origin as Origin,
      membersV1CustomField_universal_d_AppliesTo as AppliesTo,
      membersV1CustomField_universal_d_Section as Section,
      membersV1CustomField_universal_d_CreateCustomFieldRequest as CreateCustomFieldRequest,
      membersV1CustomField_universal_d_CreateCustomFieldResponse as CreateCustomFieldResponse,
      membersV1CustomField_universal_d_IncorrectFieldTypeData as IncorrectFieldTypeData,
      membersV1CustomField_universal_d_IncorrectPrivacyData as IncorrectPrivacyData,
      membersV1CustomField_universal_d_GetCustomFieldRequest as GetCustomFieldRequest,
      membersV1CustomField_universal_d_GetCustomFieldResponse as GetCustomFieldResponse,
      membersV1CustomField_universal_d_ListCustomFieldsRequest as ListCustomFieldsRequest,
      membersV1CustomField_universal_d_Paging as Paging,
      membersV1CustomField_universal_d_ListCustomFieldsResponse as ListCustomFieldsResponse,
      membersV1CustomField_universal_d_PagingMetadata as PagingMetadata,
      membersV1CustomField_universal_d_UpdateCustomFieldRequest as UpdateCustomFieldRequest,
      membersV1CustomField_universal_d_UpdateCustomFieldResponse as UpdateCustomFieldResponse,
      membersV1CustomField_universal_d_DefaultPrivacyChanged as DefaultPrivacyChanged,
      membersV1CustomField_universal_d_ReservedFieldNameNonEditable as ReservedFieldNameNonEditable,
      membersV1CustomField_universal_d_DeleteCustomFieldRequest as DeleteCustomFieldRequest,
      membersV1CustomField_universal_d_DeleteCustomFieldResponse as DeleteCustomFieldResponse,
      membersV1CustomField_universal_d_HideCustomFieldRequest as HideCustomFieldRequest,
      membersV1CustomField_universal_d_HideCustomFieldResponse as HideCustomFieldResponse,
      membersV1CustomField_universal_d_UpdateCustomFieldsOrderRequest as UpdateCustomFieldsOrderRequest,
      membersV1CustomField_universal_d_UpdateCustomFieldsOrderResponse as UpdateCustomFieldsOrderResponse,
      membersV1CustomField_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      membersV1CustomField_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      membersV1CustomField_universal_d_Asset as Asset,
      membersV1CustomField_universal_d_State as State,
      membersV1CustomField_universal_d_SiteCreated as SiteCreated,
      membersV1CustomField_universal_d_SiteCreatedContext as SiteCreatedContext,
      membersV1CustomField_universal_d_Namespace as Namespace,
      membersV1CustomField_universal_d_SiteTransferred as SiteTransferred,
      membersV1CustomField_universal_d_SiteDeleted as SiteDeleted,
      membersV1CustomField_universal_d_DeleteContext as DeleteContext,
      membersV1CustomField_universal_d_DeleteStatus as DeleteStatus,
      membersV1CustomField_universal_d_SiteUndeleted as SiteUndeleted,
      membersV1CustomField_universal_d_SitePublished as SitePublished,
      membersV1CustomField_universal_d_SiteUnpublished as SiteUnpublished,
      membersV1CustomField_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      membersV1CustomField_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      membersV1CustomField_universal_d_ServiceProvisioned as ServiceProvisioned,
      membersV1CustomField_universal_d_ServiceRemoved as ServiceRemoved,
      membersV1CustomField_universal_d_SiteRenamed as SiteRenamed,
      membersV1CustomField_universal_d_SiteHardDeleted as SiteHardDeleted,
      membersV1CustomField_universal_d_NamespaceChanged as NamespaceChanged,
      membersV1CustomField_universal_d_StudioAssigned as StudioAssigned,
      membersV1CustomField_universal_d_StudioUnassigned as StudioUnassigned,
      Empty$1 as Empty,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      UndeleteInfo$1 as UndeleteInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      membersV1CustomField_universal_d_createCustomField as createCustomField,
      membersV1CustomField_universal_d_getCustomField as getCustomField,
      membersV1CustomField_universal_d_listCustomFields as listCustomFields,
      membersV1CustomField_universal_d_ListCustomFieldsOptions as ListCustomFieldsOptions,
      membersV1CustomField_universal_d_updateCustomField as updateCustomField,
      membersV1CustomField_universal_d_UpdateCustomField as UpdateCustomField,
      membersV1CustomField_universal_d_deleteCustomField as deleteCustomField,
      membersV1CustomField_universal_d_hideCustomField as hideCustomField,
      membersV1CustomField_universal_d_updateCustomFieldsOrder as updateCustomFieldsOrder,
      membersV1CustomField_universal_d_UpdateCustomFieldsOrderOptions as UpdateCustomFieldsOrderOptions,
    };
  }
  
  /** Member-to-member block. */
  interface MemberToMemberBlock {
      /** ID of the member that is the creator of this block. */
      blockingMemberId?: string;
      /** ID of the member that is blocked by this block. */
      blockedMemberId?: string;
  }
  interface BlockMemberRequest {
      /** ID of a member to block. */
      memberId: string;
  }
  interface BlockMemberResponse {
  }
  interface MemberBlockedByMember {
      /** The block that has been created. */
      block?: MemberToMemberBlock;
  }
  interface MemberAlreadyBlockedError {
      initiatorMemberId?: string;
      targetMemberId?: string;
  }
  interface SelfBlockingForbiddenError {
      initiatorMemberId?: string;
  }
  interface AdminBlockingForbiddenError {
      initiatorMemberId?: string;
      targetMemberId?: string;
      adminMemberId?: string;
  }
  interface UnblockMemberRequest {
      /** ID of a member to unblock. */
      memberId: string;
  }
  interface UnblockMemberResponse {
  }
  interface MemberUnblockedByMember {
      /** The block that has been removed. */
      block?: MemberToMemberBlock;
  }
  interface SelfUnblockingForbiddenError {
      initiatorMemberId?: string;
  }
  interface BlockDoesNotExistError {
      blockingMemberId?: string;
      blockedMemberId?: string;
  }
  interface ListCurrentMemberBlockingRequest {
      /** Pagination parameters. */
      cursorPaging?: CursorPaging;
  }
  interface CursorPaging {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface ListCurrentMemberBlockingResponse {
      /** IDs of members blocked by the current member. */
      blockedMemberIds?: string[];
      /** Metadata for the paginated results. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface PagingMetadataV2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Flag that indicates the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface ListMemberBlocksRequest {
      /** ID of a member whose blocks are requested. */
      memberId: string;
      /** Pagination parameters. */
      cursorPaging?: CursorPaging;
  }
  interface ListMemberBlocksResponse {
      /** List of members who are either blocking or blocked by the specified member. */
      memberBlocks?: MemberBlock[];
      /** Metadata for the paginated results. */
      pagingMetadata?: PagingMetadataV2;
  }
  interface MemberBlock {
      /** Member ID. */
      memberId?: string;
      /**
       * Indicates whether the member with `memberId` is blocking or blocked by the specified member.
       *
       * - `BLOCKING`: The member with `memberId` is blocking the requested member.
       * - `BLOCKED`: The member with `memberId` is blocked by the requested member.
       */
      blockDirection?: BlockDirection;
  }
  enum BlockDirection {
      UNKNOWN = "UNKNOWN",
      BLOCKING = "BLOCKING",
      BLOCKED = "BLOCKED"
  }
  interface DomainEvent extends DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp. */
      eventTime?: Date;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
  }
  interface EntityCreatedEvent {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo;
  }
  interface UndeleteInfo {
      deletedDate?: Date;
  }
  interface EntityUpdatedEvent {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent {
      bodyAsJson?: string;
  }
  interface Empty {
  }
  interface MessageEnvelope {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Blocks the specified member from the current member.
   * @param memberId - ID of a member to block.
   * @public
   * @documentationMaturity preview
   * @requiredField memberId
   */
  function blockMember(memberId: string): Promise<void>;
  /**
   * Unblocks the specified member from the current member.
   * @param memberId - ID of a member to unblock.
   * @public
   * @documentationMaturity preview
   * @requiredField memberId
   */
  function unblockMember(memberId: string): Promise<void>;
  /**
   * Returns information about members blocked by the current member.
   * @public
   * @documentationMaturity preview
   */
  function listCurrentMemberBlocking(options?: ListCurrentMemberBlockingOptions): Promise<ListCurrentMemberBlockingResponse>;
  interface ListCurrentMemberBlockingOptions {
      /** Pagination parameters. */
      cursorPaging?: CursorPaging;
  }
  /**
   * Returns IDs of members that are blocking or blocked by the member whose ID was provided.
   * @param memberId - ID of a member whose blocks are requested.
   * @public
   * @documentationMaturity preview
   * @requiredField memberId
   * @adminMethod
   */
  function listMemberBlocks(memberId: string, options?: ListMemberBlocksOptions): Promise<ListMemberBlocksResponse>;
  interface ListMemberBlocksOptions {
      /** Pagination parameters. */
      cursorPaging?: CursorPaging;
  }
  
  type membersV1MemberToMemberBlock_universal_d_MemberToMemberBlock = MemberToMemberBlock;
  type membersV1MemberToMemberBlock_universal_d_BlockMemberRequest = BlockMemberRequest;
  type membersV1MemberToMemberBlock_universal_d_BlockMemberResponse = BlockMemberResponse;
  type membersV1MemberToMemberBlock_universal_d_MemberBlockedByMember = MemberBlockedByMember;
  type membersV1MemberToMemberBlock_universal_d_MemberAlreadyBlockedError = MemberAlreadyBlockedError;
  type membersV1MemberToMemberBlock_universal_d_SelfBlockingForbiddenError = SelfBlockingForbiddenError;
  type membersV1MemberToMemberBlock_universal_d_AdminBlockingForbiddenError = AdminBlockingForbiddenError;
  type membersV1MemberToMemberBlock_universal_d_UnblockMemberRequest = UnblockMemberRequest;
  type membersV1MemberToMemberBlock_universal_d_UnblockMemberResponse = UnblockMemberResponse;
  type membersV1MemberToMemberBlock_universal_d_MemberUnblockedByMember = MemberUnblockedByMember;
  type membersV1MemberToMemberBlock_universal_d_SelfUnblockingForbiddenError = SelfUnblockingForbiddenError;
  type membersV1MemberToMemberBlock_universal_d_BlockDoesNotExistError = BlockDoesNotExistError;
  type membersV1MemberToMemberBlock_universal_d_ListCurrentMemberBlockingRequest = ListCurrentMemberBlockingRequest;
  type membersV1MemberToMemberBlock_universal_d_CursorPaging = CursorPaging;
  type membersV1MemberToMemberBlock_universal_d_ListCurrentMemberBlockingResponse = ListCurrentMemberBlockingResponse;
  type membersV1MemberToMemberBlock_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type membersV1MemberToMemberBlock_universal_d_Cursors = Cursors;
  type membersV1MemberToMemberBlock_universal_d_ListMemberBlocksRequest = ListMemberBlocksRequest;
  type membersV1MemberToMemberBlock_universal_d_ListMemberBlocksResponse = ListMemberBlocksResponse;
  type membersV1MemberToMemberBlock_universal_d_MemberBlock = MemberBlock;
  type membersV1MemberToMemberBlock_universal_d_BlockDirection = BlockDirection;
  const membersV1MemberToMemberBlock_universal_d_BlockDirection: typeof BlockDirection;
  type membersV1MemberToMemberBlock_universal_d_DomainEvent = DomainEvent;
  type membersV1MemberToMemberBlock_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type membersV1MemberToMemberBlock_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type membersV1MemberToMemberBlock_universal_d_UndeleteInfo = UndeleteInfo;
  type membersV1MemberToMemberBlock_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type membersV1MemberToMemberBlock_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type membersV1MemberToMemberBlock_universal_d_ActionEvent = ActionEvent;
  type membersV1MemberToMemberBlock_universal_d_Empty = Empty;
  type membersV1MemberToMemberBlock_universal_d_MessageEnvelope = MessageEnvelope;
  type membersV1MemberToMemberBlock_universal_d_IdentificationData = IdentificationData;
  type membersV1MemberToMemberBlock_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type membersV1MemberToMemberBlock_universal_d_WebhookIdentityType = WebhookIdentityType;
  const membersV1MemberToMemberBlock_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const membersV1MemberToMemberBlock_universal_d_blockMember: typeof blockMember;
  const membersV1MemberToMemberBlock_universal_d_unblockMember: typeof unblockMember;
  const membersV1MemberToMemberBlock_universal_d_listCurrentMemberBlocking: typeof listCurrentMemberBlocking;
  type membersV1MemberToMemberBlock_universal_d_ListCurrentMemberBlockingOptions = ListCurrentMemberBlockingOptions;
  const membersV1MemberToMemberBlock_universal_d_listMemberBlocks: typeof listMemberBlocks;
  type membersV1MemberToMemberBlock_universal_d_ListMemberBlocksOptions = ListMemberBlocksOptions;
  namespace membersV1MemberToMemberBlock_universal_d {
    export {
      membersV1MemberToMemberBlock_universal_d_MemberToMemberBlock as MemberToMemberBlock,
      membersV1MemberToMemberBlock_universal_d_BlockMemberRequest as BlockMemberRequest,
      membersV1MemberToMemberBlock_universal_d_BlockMemberResponse as BlockMemberResponse,
      membersV1MemberToMemberBlock_universal_d_MemberBlockedByMember as MemberBlockedByMember,
      membersV1MemberToMemberBlock_universal_d_MemberAlreadyBlockedError as MemberAlreadyBlockedError,
      membersV1MemberToMemberBlock_universal_d_SelfBlockingForbiddenError as SelfBlockingForbiddenError,
      membersV1MemberToMemberBlock_universal_d_AdminBlockingForbiddenError as AdminBlockingForbiddenError,
      membersV1MemberToMemberBlock_universal_d_UnblockMemberRequest as UnblockMemberRequest,
      membersV1MemberToMemberBlock_universal_d_UnblockMemberResponse as UnblockMemberResponse,
      membersV1MemberToMemberBlock_universal_d_MemberUnblockedByMember as MemberUnblockedByMember,
      membersV1MemberToMemberBlock_universal_d_SelfUnblockingForbiddenError as SelfUnblockingForbiddenError,
      membersV1MemberToMemberBlock_universal_d_BlockDoesNotExistError as BlockDoesNotExistError,
      membersV1MemberToMemberBlock_universal_d_ListCurrentMemberBlockingRequest as ListCurrentMemberBlockingRequest,
      membersV1MemberToMemberBlock_universal_d_CursorPaging as CursorPaging,
      membersV1MemberToMemberBlock_universal_d_ListCurrentMemberBlockingResponse as ListCurrentMemberBlockingResponse,
      membersV1MemberToMemberBlock_universal_d_PagingMetadataV2 as PagingMetadataV2,
      membersV1MemberToMemberBlock_universal_d_Cursors as Cursors,
      membersV1MemberToMemberBlock_universal_d_ListMemberBlocksRequest as ListMemberBlocksRequest,
      membersV1MemberToMemberBlock_universal_d_ListMemberBlocksResponse as ListMemberBlocksResponse,
      membersV1MemberToMemberBlock_universal_d_MemberBlock as MemberBlock,
      membersV1MemberToMemberBlock_universal_d_BlockDirection as BlockDirection,
      membersV1MemberToMemberBlock_universal_d_DomainEvent as DomainEvent,
      membersV1MemberToMemberBlock_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      membersV1MemberToMemberBlock_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      membersV1MemberToMemberBlock_universal_d_UndeleteInfo as UndeleteInfo,
      membersV1MemberToMemberBlock_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      membersV1MemberToMemberBlock_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      membersV1MemberToMemberBlock_universal_d_ActionEvent as ActionEvent,
      membersV1MemberToMemberBlock_universal_d_Empty as Empty,
      membersV1MemberToMemberBlock_universal_d_MessageEnvelope as MessageEnvelope,
      membersV1MemberToMemberBlock_universal_d_IdentificationData as IdentificationData,
      membersV1MemberToMemberBlock_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      membersV1MemberToMemberBlock_universal_d_WebhookIdentityType as WebhookIdentityType,
      membersV1MemberToMemberBlock_universal_d_blockMember as blockMember,
      membersV1MemberToMemberBlock_universal_d_unblockMember as unblockMember,
      membersV1MemberToMemberBlock_universal_d_listCurrentMemberBlocking as listCurrentMemberBlocking,
      membersV1MemberToMemberBlock_universal_d_ListCurrentMemberBlockingOptions as ListCurrentMemberBlockingOptions,
      membersV1MemberToMemberBlock_universal_d_listMemberBlocks as listMemberBlocks,
      membersV1MemberToMemberBlock_universal_d_ListMemberBlocksOptions as ListMemberBlocksOptions,
    };
  }
  
  export { badgesV4Badge_universal_d as badges, membersV1CustomField_universal_d as customField, membersV1MemberToMemberBlock_universal_d as memberToMemberBlock };
}
