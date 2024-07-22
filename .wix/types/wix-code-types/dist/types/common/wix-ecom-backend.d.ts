declare module "wix-ecom-backend" {
    /**
     * The back in stock notification request allows a customer to receive a notifiction when a specific item
     * is available again. The request includes information about the person making the request, the item
     * they want to receive a notification for, and the status of the notification.
     */
    interface BackInStockNotificationRequest {
        /**
         * Request ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Catalog and item reference that the notification request is for.
         *
         * Includes IDs for the catalog and item it came from, as well as additional, optional information.
         */
        catalogReference?: CatalogReference$7;
        /** Email address to send notification to about item being back in stock. */
        email?: string;
        /**
         * Contact ID for the contact with this `email`.
         *
         * If a contact does not already exist with the email address submitted when creating this request, then a new contact is created.
         * For more information about contacts, see the Contacts API.
         * @readonly
         */
        contactId?: string | null;
        /**
         * Status of the notification.
         *
         * `status` is set to `RECEIVED` when the notification request is created. The `status` changes once a notification email is sent for this request object:
         * + When a notification email is sent through the site, either automatically or with the `reportItemsBackInStock()` function, then the `status` is briefly set to `PROCESSING` and then set to `NOTIFICATION_SENT` if the email is successul, and `FAILED` if it fails.
         * + When a notification email is sent offline, use the `markAsNotificationSent()` function to set `status` to `NOTIFICATION_SENT`.
         * @readonly
         */
        status?: Status$2;
        /**
         * Whether a notification was sent automatically.
         *
         * `autoNotified` is empty when the notification request is created and is not returned until the field has a value. `autoNotified` receives a value when a notification email is sent for this request object.
         *
         * `autoNotified` sets to `true` if the notification is sent through the site, either automatically or with the `reportItemsBackInStock()` function. If the notification email is sent offline but the `status` is updated with the `markAsNotificationSent()` function, then `autoNotified` sets to `false`.
         * @readonly
         */
        autoNotified?: boolean | null;
        /**
         * Date and time the notification request was created.
         * @readonly
         */
        _createdDate?: Date;
        /** Item URL for this request. */
        itemUrl?: string | null;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$7 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs. Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from a Wix Stores catalog, learn more about [eCommerce integration](https://dev.wix.com/docs/rest/business-solutions/stores/catalog/e-commerce-integration).
         */
        options?: Record<string, any> | null;
    }
    enum Status$2 {
        UNSPECIFIED = "UNSPECIFIED",
        /** initial status of all new requests */
        RECEIVED = "RECEIVED",
        PROCESSING = "PROCESSING",
        NOTIFICATION_SENT = "NOTIFICATION_SENT",
        FAILED = "FAILED"
    }
    interface InvalidateCache extends InvalidateCacheGetByOneOf {
        /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
        metaSiteId?: string;
        /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
        siteId?: string;
        /** Invalidate by App */
        app?: App$1;
        /** Invalidate by page id */
        page?: Page;
        /** Invalidate by URI path */
        uri?: URI;
        /** Invalidate by file (for media files such as PDFs) */
        file?: File;
        /** tell us why you're invalidating the cache. You don't need to add your app name */
        reason?: string | null;
        /** Is local DS */
        localDc?: boolean;
    }
    /** @oneof */
    interface InvalidateCacheGetByOneOf {
        /** Invalidate by msId. NOT recommended, as this will invalidate the entire site cache! */
        metaSiteId?: string;
        /** Invalidate by Site ID. NOT recommended, as this will invalidate the entire site cache! */
        siteId?: string;
        /** Invalidate by App */
        app?: App$1;
        /** Invalidate by page id */
        page?: Page;
        /** Invalidate by URI path */
        uri?: URI;
        /** Invalidate by file (for media files such as PDFs) */
        file?: File;
    }
    interface App$1 {
        /** The AppDefId */
        appDefId?: string;
        /** The instance Id */
        instanceId?: string;
    }
    interface Page {
        /** the msid the page is on */
        metaSiteId?: string;
        /** Invalidate by Page ID */
        pageId?: string;
    }
    interface URI {
        /** the msid the URI is on */
        metaSiteId?: string;
        /** URI path to invalidate (e.g. page/my/path) - without leading/trailing slashes */
        uriPath?: string;
    }
    interface File {
        /** the msid the file is related to */
        metaSiteId?: string;
        /** Invalidate by filename (for media files such as PDFs) */
        fileName?: string;
    }
    interface CreateBackInStockNotificationRequestRequest {
        /**
         * Notification request information.
         *
         * Includes details for the out of stock item and the email address
         * requesting to be notified when it's back in stock.
         */
        request: BackInStockNotificationRequest;
        /** Item details to include in the notification when the item is back in stock. */
        itemDetails: BackInStockItemDetails;
    }
    interface BackInStockItemDetails {
        /** Item name. */
        name?: string;
        /** Item price. */
        price?: string;
        /** Item image. */
        image?: string;
    }
    interface CreateBackInStockNotificationRequestResponse {
        /** Created back in stock notification request. */
        request?: BackInStockNotificationRequest;
    }
    interface GetBackInStockNotificationRequestRequest {
        /** ID of the notification request to retrieve. */
        _id: string;
    }
    interface GetBackInStockNotificationRequestResponse {
        /** Retrieved back in stock notification request. */
        request?: BackInStockNotificationRequest;
    }
    interface DeleteBackInStockNotificationRequestRequest {
        /** ID of the notification request to delete. */
        _id: string;
    }
    interface DeleteBackInStockNotificationRequestResponse {
    }
    interface MarkAsNotificationSentRequest {
        /** ID of the notification request to mark. */
        _id: string;
    }
    interface MarkAsNotificationSentResponse {
        /** Marked back in stock notification request. */
        request?: BackInStockNotificationRequest;
    }
    interface QueryBackInStockNotificationRequestsRequest {
        /** Query options. */
        query: PlatformQuery$2;
    }
    interface PlatformQuery$2 extends PlatformQueryPagingMethodOneOf$2 {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging$2;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging$3;
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Sorting options. For example, `[{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}]`. */
        sort?: Sorting$3[];
    }
    /** @oneof */
    interface PlatformQueryPagingMethodOneOf$2 {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging$2;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging$3;
    }
    interface Sorting$3 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$3;
    }
    enum SortOrder$3 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface PlatformPaging$2 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface CursorPaging$3 {
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
    interface QueryBackInStockNotificationRequestsResponse {
        /** Retrieved back in stock requests. */
        requests?: BackInStockNotificationRequest[];
        /** Details on the paged set of results returned. */
        metadata?: PlatformPagingMetadata$2;
    }
    interface PlatformPagingMetadata$2 {
        /** The number of items returned in this response. */
        count?: number | null;
        /** The offset which was requested. Returned if offset paging was used. */
        offset?: number | null;
        /** The total number of items that match the query. Returned if offset paging was used. */
        total?: number | null;
        /** Cursors to navigate through result pages. Returned if cursor paging was used. */
        cursors?: Cursors$3;
    }
    interface Cursors$3 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface GetBackInStockNotificationRequestsCountByCatalogReferencesRequest {
        /** `catalogReference` items to retrieve the notification request for. */
        catalogReferences: CatalogReference$7[];
    }
    interface GetBackInStockNotificationRequestsCountByCatalogReferencesResponse {
        /** Amount of back in stock notifications for each of the retrieved `catalogReference` items. */
        countsPerCatalogReference?: BackInStockNotificationRequestsCount[];
    }
    /** Maps each back in stock CatalogReference to the results (the number of unique occurrences). */
    interface BackInStockNotificationRequestsCount {
        /**
         * Catalog and item reference.
         *
         * Includes IDs and additional, optional information related to the item.
         */
        catalogReference?: CatalogReference$7;
        /** The number of unique back in stock requests for given `catalogReference`. */
        count?: number;
    }
    interface ReportItemsBackInStockRequest {
        /**
         * `catalogReference` item to send notifications for.
         *
         * Cannot be used with `requestIds`.
         */
        catalogReference?: CatalogReference$7;
        /**
         * IDs of requests to send notifications for.
         *
         * Cannot be used with `catalogReference`.
         */
        requestIds?: string[];
        /**
         * Item details to use in notifications.
         *
         * `itemDetails` may populate dynamic valyes in the notification template, as follows:
         * + `itemDetails.name` passes to the template as `item.name`
         * + `itemDetails.price` passes to the template as `item.price`
         * + `itemDetails.image.url` passes to the template as `item.image.url`
         *
         * Use `extraAutomationTemplateParameters` to pass additional dynamic values.
         */
        itemDetails: BackInStockItemDetails;
        /** Additional key-value pairs to pass to the back in stock notification template. */
        extraAutomationTemplateParameters?: Record<string, string>;
    }
    interface ReportItemsBackInStockResponse {
    }
    interface DomainEvent$b extends DomainEventBodyOneOf$b {
        createdEvent?: EntityCreatedEvent$b;
        updatedEvent?: EntityUpdatedEvent$b;
        deletedEvent?: EntityDeletedEvent$b;
        actionEvent?: ActionEvent$b;
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
    interface DomainEventBodyOneOf$b {
        createdEvent?: EntityCreatedEvent$b;
        updatedEvent?: EntityUpdatedEvent$b;
        deletedEvent?: EntityDeletedEvent$b;
        actionEvent?: ActionEvent$b;
    }
    interface EntityCreatedEvent$b {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$b {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$b {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$b {
        bodyAsJson?: string;
    }
    interface Empty$7 {
    }
    interface MessageEnvelope$b {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$b;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$b extends IdentificationDataIdOneOf$b {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$b;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$b {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$b {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates a back in stock notification request.
     *
     * If a notification request already exists for the same `catalogReference` and `email`,
     * then a new one isn't created and the existing request is returned.
     * @param request - Notification request information.
     *
     * Includes details for the out of stock item and the email address
     * requesting to be notified when it's back in stock.
     * @param itemDetails - Item details to include in the notification when the item is back in stock.
     * @public
     * @documentationMaturity preview
     * @requiredField itemDetails
     * @requiredField itemDetails.name
     * @requiredField itemDetails.price
     * @requiredField request
     * @requiredField request.catalogReference
     * @requiredField request.catalogReference.appId
     * @requiredField request.catalogReference.catalogItemId
     * @requiredField request.email
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     * @returns Created back in stock notification request.
     */
    function createBackInStockNotificationRequest(request: BackInStockNotificationRequest, itemDetails: BackInStockItemDetails): Promise<BackInStockNotificationRequest>;
    /**
     * Retrieves a back in stock notification request.
     * @param _id - ID of the notification request to retrieve.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     * @returns Retrieved back in stock notification request.
     */
    function getBackInStockNotificationRequest(_id: string): Promise<BackInStockNotificationRequest>;
    /**
     * Deletes a back in stock notification request.
     * @param _id - ID of the notification request to delete.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteBackInStockNotificationRequest(_id: string): Promise<void>;
    /**
     * Sets `status` of a back in stock request to `NOTIFICATION_SENT`.
     *
     * Use this function if the notification is sent manually offline. If the notification is sent automatically or with the `reportItemsBackInStock()` function, then `status` updates on its own.
     * @param _id - ID of the notification request to mark.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function markAsNotificationSent(_id: string): Promise<MarkAsNotificationSentResponse>;
    /**
     * Creates a query to retrieve a list of back in stock notification requests.
     *
     * The `queryBackInStockNotificationRequests()` method builds a query to retrieve a list of back in stock notification requests and returns a `RequestsQueryBuilder` object.
     *
     * The returned object contains the query definition, which is typically used to run the query using the `find()` method.
     *
     * You can refine the query by chaining `RequestsQueryBuilder` methods onto the query. `RequestsQueryBuilder` methods enable you to sort, filter, and control the results that `queryBackInStockNotificationRequests()` returns.
     *
     * The following `RequestsQueryBuilder` methods are supported for `queryBackInStockNotificationRequests()`. For a full description of the Requests object, see the object returned for the `items` property in `RequestsQueryResult`."
     * @public
     * @documentationMaturity preview
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function queryBackInStockNotificationRequests(): RequestsQueryBuilder;
    interface QueryCursorResult$3 {
        cursors: Cursors$3;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface RequestsQueryResult extends QueryCursorResult$3 {
        items: BackInStockNotificationRequest[];
        query: RequestsQueryBuilder;
        next: () => Promise<RequestsQueryResult>;
        prev: () => Promise<RequestsQueryResult>;
    }
    interface RequestsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        eq: (propertyName: "_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl", value: any) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ne: (propertyName: "_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl", value: any) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ge: (propertyName: "_createdDate", value: any) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        gt: (propertyName: "_createdDate", value: any) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        le: (propertyName: "_createdDate", value: any) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        lt: (propertyName: "_createdDate", value: any) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         * @documentationMaturity preview
         */
        startsWith: (propertyName: "_id" | "contactId" | "itemUrl", value: string) => RequestsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         * @documentationMaturity preview
         */
        hasSome: (propertyName: "_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl", value: any[]) => RequestsQueryBuilder;
        /** @documentationMaturity preview */
        in: (propertyName: "_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl", value: any) => RequestsQueryBuilder;
        /** @documentationMaturity preview */
        exists: (propertyName: "_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl", value: boolean) => RequestsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        ascending: (...propertyNames: Array<"_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl">) => RequestsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        descending: (...propertyNames: Array<"_id" | "contactId" | "status" | "autoNotified" | "_createdDate" | "itemUrl">) => RequestsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
         * @documentationMaturity preview
         */
        limit: (limit: number) => RequestsQueryBuilder;
        /** @param cursor - A pointer to specific record
         * @documentationMaturity preview
         */
        skipTo: (cursor: string) => RequestsQueryBuilder;
        /** @documentationMaturity preview */
        find: () => Promise<RequestsQueryResult>;
    }
    /**
     * Retrieves the amount of back in stock requests for a given `catalogReference` item.
     * @param catalogReferences - `catalogReference` items to retrieve the notification request for.
     * @public
     * @documentationMaturity preview
     * @requiredField catalogReferences
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function getBackInStockNotificationRequestsCountByCatalogReferences(catalogReferences: CatalogReference$7[]): Promise<GetBackInStockNotificationRequestsCountByCatalogReferencesResponse>;
    /**
     * Sends notifications for back in stock requests.
     *
     * > **Important:**
     * > Automations must be turned on in a [site's dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Go%20to%20Back-in-Stock&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https://www.wix.com/dashboard/{{metaSiteId}}/store/back-in-stock) for notifications to send.
     *
     * This endpoint triggers notifications for requests in 1 of 2 ways:
     * 1. For a specific item, with the `catalogReference` information.
     * 2. For specific requests, with `requestIds`.
     *
     * `itemDetails` are required and may populate dynamic values in the notification template, as follows:
     * + `itemDetails.name` passes to the template as `item.name`
     * + `itemDetails.price` passes to the template as `item.price`
     * + `itemDetails.image.url` passes to the template as `item.image.url`
     *
     * If the notification template doesn't include `item.price`, `item.name`, or `item.image.url`, values should
     * be passed in `extraAutomationTemplateParameters`.
     *
     * After this endpoint is called, the `status` for the request will update to `NOTIFICATION_SENT` if it sends
     * successfully, or to `FAILED` if it fails to send.
     * @param itemDetails - Item details to use in notifications.
     *
     * `itemDetails` may populate dynamic valyes in the notification template, as follows:
     * + `itemDetails.name` passes to the template as `item.name`
     * + `itemDetails.price` passes to the template as `item.price`
     * + `itemDetails.image.url` passes to the template as `item.image.url`
     *
     * Use `extraAutomationTemplateParameters` to pass additional dynamic values.
     * @public
     * @documentationMaturity preview
     * @requiredField itemDetails
     * @requiredField itemDetails.name
     * @requiredField itemDetails.price
     * @param options - Report options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function reportItemsBackInStock(itemDetails: BackInStockItemDetails, options?: ReportItemsBackInStockOptions): Promise<void>;
    interface ReportItemsBackInStockOptions {
        /**
         * `catalogReference` item to send notifications for.
         *
         * Cannot be used with `requestIds`.
         */
        catalogReference?: CatalogReference$7;
        /**
         * IDs of requests to send notifications for.
         *
         * Cannot be used with `catalogReference`.
         */
        requestIds?: string[];
        /** Additional key-value pairs to pass to the back in stock notification template. */
        extraAutomationTemplateParameters?: Record<string, string>;
    }
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_BackInStockNotificationRequest = BackInStockNotificationRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_InvalidateCache = InvalidateCache;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_InvalidateCacheGetByOneOf = InvalidateCacheGetByOneOf;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_Page = Page;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_URI = URI;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_File = File;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_CreateBackInStockNotificationRequestRequest = CreateBackInStockNotificationRequestRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_BackInStockItemDetails = BackInStockItemDetails;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_CreateBackInStockNotificationRequestResponse = CreateBackInStockNotificationRequestResponse;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestRequest = GetBackInStockNotificationRequestRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestResponse = GetBackInStockNotificationRequestResponse;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_DeleteBackInStockNotificationRequestRequest = DeleteBackInStockNotificationRequestRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_DeleteBackInStockNotificationRequestResponse = DeleteBackInStockNotificationRequestResponse;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_MarkAsNotificationSentRequest = MarkAsNotificationSentRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_MarkAsNotificationSentResponse = MarkAsNotificationSentResponse;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_QueryBackInStockNotificationRequestsRequest = QueryBackInStockNotificationRequestsRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_QueryBackInStockNotificationRequestsResponse = QueryBackInStockNotificationRequestsResponse;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestsCountByCatalogReferencesRequest = GetBackInStockNotificationRequestsCountByCatalogReferencesRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestsCountByCatalogReferencesResponse = GetBackInStockNotificationRequestsCountByCatalogReferencesResponse;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_BackInStockNotificationRequestsCount = BackInStockNotificationRequestsCount;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_ReportItemsBackInStockRequest = ReportItemsBackInStockRequest;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_ReportItemsBackInStockResponse = ReportItemsBackInStockResponse;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_createBackInStockNotificationRequest: typeof createBackInStockNotificationRequest;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_getBackInStockNotificationRequest: typeof getBackInStockNotificationRequest;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_deleteBackInStockNotificationRequest: typeof deleteBackInStockNotificationRequest;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_markAsNotificationSent: typeof markAsNotificationSent;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_queryBackInStockNotificationRequests: typeof queryBackInStockNotificationRequests;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_RequestsQueryResult = RequestsQueryResult;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_RequestsQueryBuilder = RequestsQueryBuilder;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_getBackInStockNotificationRequestsCountByCatalogReferences: typeof getBackInStockNotificationRequestsCountByCatalogReferences;
    const ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_reportItemsBackInStock: typeof reportItemsBackInStock;
    type ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_ReportItemsBackInStockOptions = ReportItemsBackInStockOptions;
    namespace ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d {
        export { ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_BackInStockNotificationRequest as BackInStockNotificationRequest, CatalogReference$7 as CatalogReference, Status$2 as Status, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_InvalidateCache as InvalidateCache, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_InvalidateCacheGetByOneOf as InvalidateCacheGetByOneOf, App$1 as App, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_Page as Page, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_URI as URI, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_File as File, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_CreateBackInStockNotificationRequestRequest as CreateBackInStockNotificationRequestRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_BackInStockItemDetails as BackInStockItemDetails, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_CreateBackInStockNotificationRequestResponse as CreateBackInStockNotificationRequestResponse, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestRequest as GetBackInStockNotificationRequestRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestResponse as GetBackInStockNotificationRequestResponse, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_DeleteBackInStockNotificationRequestRequest as DeleteBackInStockNotificationRequestRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_DeleteBackInStockNotificationRequestResponse as DeleteBackInStockNotificationRequestResponse, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_MarkAsNotificationSentRequest as MarkAsNotificationSentRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_MarkAsNotificationSentResponse as MarkAsNotificationSentResponse, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_QueryBackInStockNotificationRequestsRequest as QueryBackInStockNotificationRequestsRequest, PlatformQuery$2 as PlatformQuery, PlatformQueryPagingMethodOneOf$2 as PlatformQueryPagingMethodOneOf, Sorting$3 as Sorting, SortOrder$3 as SortOrder, PlatformPaging$2 as PlatformPaging, CursorPaging$3 as CursorPaging, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_QueryBackInStockNotificationRequestsResponse as QueryBackInStockNotificationRequestsResponse, PlatformPagingMetadata$2 as PlatformPagingMetadata, Cursors$3 as Cursors, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestsCountByCatalogReferencesRequest as GetBackInStockNotificationRequestsCountByCatalogReferencesRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_GetBackInStockNotificationRequestsCountByCatalogReferencesResponse as GetBackInStockNotificationRequestsCountByCatalogReferencesResponse, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_BackInStockNotificationRequestsCount as BackInStockNotificationRequestsCount, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_ReportItemsBackInStockRequest as ReportItemsBackInStockRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_ReportItemsBackInStockResponse as ReportItemsBackInStockResponse, DomainEvent$b as DomainEvent, DomainEventBodyOneOf$b as DomainEventBodyOneOf, EntityCreatedEvent$b as EntityCreatedEvent, EntityUpdatedEvent$b as EntityUpdatedEvent, EntityDeletedEvent$b as EntityDeletedEvent, ActionEvent$b as ActionEvent, Empty$7 as Empty, MessageEnvelope$b as MessageEnvelope, IdentificationData$b as IdentificationData, IdentificationDataIdOneOf$b as IdentificationDataIdOneOf, WebhookIdentityType$b as WebhookIdentityType, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_createBackInStockNotificationRequest as createBackInStockNotificationRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_getBackInStockNotificationRequest as getBackInStockNotificationRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_deleteBackInStockNotificationRequest as deleteBackInStockNotificationRequest, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_markAsNotificationSent as markAsNotificationSent, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_queryBackInStockNotificationRequests as queryBackInStockNotificationRequests, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_RequestsQueryResult as RequestsQueryResult, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_RequestsQueryBuilder as RequestsQueryBuilder, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_getBackInStockNotificationRequestsCountByCatalogReferences as getBackInStockNotificationRequestsCountByCatalogReferences, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_reportItemsBackInStock as reportItemsBackInStock, ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d_ReportItemsBackInStockOptions as ReportItemsBackInStockOptions, };
    }
    /**
     * The back in stock settings object holds information related to the state of collecting back in stock
     * notification requests.
     */
    interface BackInStockSettings {
        /**
         * Information about collecting customer requests to receive
         * back in stock notifications.
         */
        collectionStates?: BackInStockCollectionState[];
    }
    interface BackInStockCollectionState {
        /** ID of the app to receive notification requests for. */
        appId?: string;
        /** Whether to collect requests for items from this app. */
        collectingRequests?: boolean;
    }
    interface StartCollectingRequestsRequest {
        /** ID of the app to start accepting notification requests for. */
        appId: string;
    }
    interface StartCollectingRequestsResponse {
        /** Back in stock settings info. */
        settings?: BackInStockSettings;
    }
    interface StopCollectingRequestsRequest {
        /** ID of the app to stop accepting notification requests for. */
        appId: string;
    }
    interface StopCollectingRequestsResponse {
        /** Back in stock settings info. */
        settings?: BackInStockSettings;
    }
    interface GetSettingsRequest {
    }
    interface GetSettingsResponse {
        /** Retrieved back in stock request settings. */
        settings?: BackInStockSettings;
    }
    /**
     * Sets `settings.collectionStates.collectingRequests` to `true` for given `appId`.
     *
     * When the collection state is set to `true`, collecting requests is enabled and customers may request
     * notifications for out of stock products. While collecting is enabled, customers see a "Notify When Available"
     * button on out-of-stock items. Customers can click the button to enter their email address, which creates the
     * notification request.
     * @param appId - ID of the app to start accepting notification requests for.
     * @public
     * @documentationMaturity preview
     * @requiredField appId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function startCollectingRequests(appId: string): Promise<StartCollectingRequestsResponse>;
    /**
     * Sets `settings.collectionStates.collectingRequests` to `false` for given `appId`.
     *
     * When the collection state is set to `false`, collecting notification requests is disabled.
     * @param appId - ID of the app to stop accepting notification requests for.
     * @public
     * @documentationMaturity preview
     * @requiredField appId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @applicableIdentity APP
     * @adminMethod
     */
    function stopCollectingRequests(appId: string): Promise<StopCollectingRequestsResponse>;
    /**
     * Retrieves back in stock request settings.
     * @public
     * @documentationMaturity preview
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function getSettings(): Promise<GetSettingsResponse>;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_BackInStockSettings = BackInStockSettings;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_BackInStockCollectionState = BackInStockCollectionState;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_StartCollectingRequestsRequest = StartCollectingRequestsRequest;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_StartCollectingRequestsResponse = StartCollectingRequestsResponse;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_StopCollectingRequestsRequest = StopCollectingRequestsRequest;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_StopCollectingRequestsResponse = StopCollectingRequestsResponse;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_GetSettingsRequest = GetSettingsRequest;
    type ecomV1BackInStockSettingsBackInStockSettings_universal_d_GetSettingsResponse = GetSettingsResponse;
    const ecomV1BackInStockSettingsBackInStockSettings_universal_d_startCollectingRequests: typeof startCollectingRequests;
    const ecomV1BackInStockSettingsBackInStockSettings_universal_d_stopCollectingRequests: typeof stopCollectingRequests;
    const ecomV1BackInStockSettingsBackInStockSettings_universal_d_getSettings: typeof getSettings;
    namespace ecomV1BackInStockSettingsBackInStockSettings_universal_d {
        export { ecomV1BackInStockSettingsBackInStockSettings_universal_d_BackInStockSettings as BackInStockSettings, ecomV1BackInStockSettingsBackInStockSettings_universal_d_BackInStockCollectionState as BackInStockCollectionState, ecomV1BackInStockSettingsBackInStockSettings_universal_d_StartCollectingRequestsRequest as StartCollectingRequestsRequest, ecomV1BackInStockSettingsBackInStockSettings_universal_d_StartCollectingRequestsResponse as StartCollectingRequestsResponse, ecomV1BackInStockSettingsBackInStockSettings_universal_d_StopCollectingRequestsRequest as StopCollectingRequestsRequest, ecomV1BackInStockSettingsBackInStockSettings_universal_d_StopCollectingRequestsResponse as StopCollectingRequestsResponse, ecomV1BackInStockSettingsBackInStockSettings_universal_d_GetSettingsRequest as GetSettingsRequest, ecomV1BackInStockSettingsBackInStockSettings_universal_d_GetSettingsResponse as GetSettingsResponse, ecomV1BackInStockSettingsBackInStockSettings_universal_d_startCollectingRequests as startCollectingRequests, ecomV1BackInStockSettingsBackInStockSettings_universal_d_stopCollectingRequests as stopCollectingRequests, ecomV1BackInStockSettingsBackInStockSettings_universal_d_getSettings as getSettings, };
    }
    interface Order$1 {
        /**
         * Order ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Order number displayed in the site owner's dashboard (auto-generated).
         * @readonly
         */
        number?: string;
        /**
         * Date and time the order was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the order was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Order line items.
         * @readonly
         */
        lineItems?: OrderLineItem[];
        /** Buyer information. */
        buyerInfo?: BuyerInfo$6;
        /**
         * Order payment status.
         * + `NOT_PAID` - This can be an order made online, but not yet paid. In such cases `order.status` will be `INITIALIZED`.
         * + This status also applies when an offline order needs to be manually marked as paid. In such cases `order.status` will be `APPROVED`.
         * + `PAID` - All payments associated with this order are paid. For online payments: [`payment.regularPaymentDetails.status: APPROVED`](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/order-transactions/order-transactions-object). For gift cards: [`payment.giftCardPaymentDetails.voided: false`](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/order-transactions/order-transactions-object).
         * + `PARTIALLY_REFUNDED` - Order was refunded, but refund amount is less than order total price.
         * + `FULLY_REFUNDED` - Order fully refunded. Refund amount equals total price.
         * + `PENDING` - Payments received but not yet confirmed by the payment provider.
         * + `PARTIALLY_PAID` -  At least one payment was received and approved, covering less than total price amount.
         */
        paymentStatus?: PaymentStatus$1;
        /**
         * Order fulfillment status.
         * @readonly
         */
        fulfillmentStatus?: FulfillmentStatus$2;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         */
        buyerLanguage?: string | null;
        /** Weight measurement unit - defaults to site's weight unit. */
        weightUnit?: WeightUnit$5;
        /** Currency used for the pricing of this order in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) format. */
        currency?: string | null;
        /** Whether tax is included in line item prices. */
        taxIncludedInPrices?: boolean;
        /**
         * Site language in which original values are shown.
         * @readonly
         */
        siteLanguage?: string | null;
        /**
         * Order price summary.
         * @readonly
         */
        priceSummary?: PriceSummary$4;
        /** Billing address and contact details. */
        billingInfo?: AddressWithContact$4;
        /** Shipping info and selected shipping option details. */
        shippingInfo?: ShippingInformation$2;
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /**
         * Order status.
         * + `INITIALIZED` - Order was created, but not yet approved or declined.
         * + `APPROVED` - Order was approved. This happens when either the online payment succeeded or the order is an offline order. Once an order is approved, many side effects are triggered. For example, holding of stock in the inventory and sending of notification emails.
         * + `CANCELED` - Order was canceled by the user.
         */
        status?: OrderStatus;
        /** Whether order is archived. */
        archived?: boolean | null;
        /**
         * Tax summary.
         * Deprecated. Use `taxInfo` instead.
         * This field will be removed on September 30, 2024.
         */
        taxSummary?: TaxSummary$4;
        /** Tax information. */
        taxInfo?: OrderTaxInfo;
        /** Applied discounts. */
        appliedDiscounts?: AppliedDiscount$5[];
        /**
         * Order activities.
         * @readonly
         */
        activities?: Activity$1[];
        /** Order attribution source. */
        attributionSource?: AttributionSource;
        /**
         * ID of the order's initiator.
         * @readonly
         */
        createdBy?: CreatedBy$2;
        /** Information about the sales channel that submitted this order. */
        channelInfo?: ChannelInfo$2;
        /** Whether a human has seen the order. Set when an order is clicked on in the dashboard. */
        seenByAHuman?: boolean | null;
        /** Checkout ID. */
        checkoutId?: string | null;
        /** Custom fields. */
        customFields?: CustomField$3[];
        /**
         * Balance summary.
         * @readonly
         */
        balanceSummary?: BalanceSummary;
        /** Additional fees applied to the order. */
        additionalFees?: AdditionalFee$4[];
        /**
         * Custom field data for the order object.
         *
         * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
         */
        extendedFields?: ExtendedFields$5;
        /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
        purchaseFlowId?: string | null;
        /**
         * Order recipient address and contact details.
         *
         * This field may differ from the address in `shippingInfo.logistics` when:
         * + The chosen shipping option is pickup point or store pickup.
         * + No shipping option is selected.
         */
        recipientInfo?: AddressWithContact$4;
    }
    interface OrderLineItem {
        /** Line item ID. */
        _id?: string;
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName$4;
        /** Catalog and item reference. Holds IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$6;
        /** Line item quantity. */
        quantity?: number;
        /**
         * Total discount for this line item's entire quantity.
         * @readonly
         */
        totalDiscount?: Price$1;
        /** Line item description lines. Used for display purposes for the cart, checkout and order. */
        descriptionLines?: DescriptionLine$4[];
        /** Line item image. */
        image?: string;
        /** Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties$4;
        /** Item type. Either a preset type or custom. */
        itemType?: ItemType$4;
        /**
         * Fulfiller ID. Field is empty when the line item is self-fulfilled.
         *
         * To get fulfillment information, pass the order ID to [List Fulfillments For Single Order](https://www.wix.com/velo/reference/wix-ecom-backend/orderfulfillments/listfulfillmentsforsingleorder).
         */
        fulfillerId?: string | null;
        /**
         * Number of items that were refunded.
         * @readonly
         */
        refundQuantity?: number | null;
        /**
         * Number of items restocked.
         * @readonly
         */
        restockQuantity?: number | null;
        /** Line item price after line item discounts for display purposes. */
        price?: Price$1;
        /**
         * Line item price before line item discounts for display purposes. Defaults to `price` when not provided.
         * @readonly
         */
        priceBeforeDiscounts?: Price$1;
        /**
         * Total price after discounts, and before tax.
         * @readonly
         */
        totalPriceBeforeTax?: Price$1;
        /**
         * Total price after all discounts and tax.
         * @readonly
         */
        totalPriceAfterTax?: Price$1;
        /**
         * Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE` - The entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `DEPOSIT_ONLINE` - Partial payment for the given item to be paid upfront during the checkout. Eligible for catalog items with type `DEPOSIT_ONLINE` only.
         */
        paymentOption?: PaymentOptionType$4;
        /**
         * Deprecated. Use `taxInfo` instead.
         * This field will be removed on September 30, 2024.
         * Tax details for this line item.
         */
        taxDetails?: ItemTaxFullDetails$4;
        /** Represents all the relevant tax details for a specific line item. */
        taxInfo?: LineItemTaxInfo;
        /** Digital file identifier, relevant only for items with type DIGITAL. */
        digitalFile?: DigitalFile$1;
        /** Subscription info. */
        subscriptionInfo?: SubscriptionInfo$1;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription$4;
        /**
         * Item's price amount to be charged during checkout. Relevant for items with a `paymentOption` value of `"DEPOSIT_ONLINE"`.
         * @readonly
         */
        depositAmount?: Price$1;
    }
    interface ProductName$4 {
        /**
         * __Required.__ Item name in the site's default language.
         *
         * Min: 1 character.
         * Max: 200 characters.
         */
        original?: string;
        /**
         * Item name translated into the buyer's language.
         *
         * Min: 1 character.
         * Max: 400 characters.
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$6 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs.
         *
         * Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from your Wix Stores catalog, learn more about [eCommerce integration](https://www.wix.com/velo/reference/wix-stores-backend/ecommerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface Price$1 {
        /** Amount. */
        amount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
    }
    interface DescriptionLine$4 extends DescriptionLineValueOneOf$4, DescriptionLineDescriptionLineValueOneOf$4 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$4;
        /** Description line color value. */
        colorInfo?: Color$4;
        /** Description line name. */
        name?: DescriptionLineName$4;
    }
    /** @oneof */
    interface DescriptionLineValueOneOf$4 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$4;
        /** Description line color value. */
        colorInfo?: Color$4;
    }
    /** @oneof */
    interface DescriptionLineDescriptionLineValueOneOf$4 {
    }
    interface DescriptionLineName$4 {
        /** Description line name in the site's default language. */
        original?: string;
        /**
         * Description line name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface PlainTextValue$4 {
        /** Description line plain text value in the site's default language. */
        original?: string;
        /**
         * Description line plain text value translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Color$4 {
        /** Description line color name in the site's default language. */
        original?: string;
        /**
         * Description line color name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
        /** HEX or RGB color code for display. */
        code?: string | null;
    }
    enum DescriptionLineType$4 {
        UNRECOGNISED = "UNRECOGNISED",
        PLAIN_TEXT = "PLAIN_TEXT",
        COLOR = "COLOR"
    }
    interface PhysicalProperties$4 {
        /** Line item weight. Measurement unit matches the weight unit specified in `weightUnit` in the request. */
        weight?: number | null;
        /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
        sku?: string | null;
        /** Whether this line item is shippable. */
        shippable?: boolean;
    }
    interface ItemType$4 extends ItemTypeItemTypeDataOneOf$4 {
        /** Preset item type. */
        preset?: ItemTypeItemType$4;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    /** @oneof */
    interface ItemTypeItemTypeDataOneOf$4 {
        /** Preset item type. */
        preset?: ItemTypeItemType$4;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    enum ItemTypeItemType$4 {
        UNRECOGNISED = "UNRECOGNISED",
        PHYSICAL = "PHYSICAL",
        DIGITAL = "DIGITAL",
        GIFT_CARD = "GIFT_CARD",
        SERVICE = "SERVICE"
    }
    /** Type of selected payment option for catalog item */
    enum PaymentOptionType$4 {
        /** The entire payment for this item happens as part of the checkout. */
        FULL_PAYMENT_ONLINE = "FULL_PAYMENT_ONLINE",
        /** The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods. */
        FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
        /** Payment for this item is done by charging a membership. When selected, `price` is `0`. */
        MEMBERSHIP = "MEMBERSHIP",
        /** Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`. */
        DEPOSIT_ONLINE = "DEPOSIT_ONLINE",
        /** Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`. */
        MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
    }
    interface ItemTaxFullDetails$4 {
        /** Taxable amount of this line item. */
        taxableAmount?: Price$1;
        /** Tax rate percentage, as a decimal numeral between 0 and 1. For example, `"0.13"`. */
        taxRate?: string;
        /** The calculated tax, based on the `taxableAmount` and `taxRate`. */
        totalTax?: Price$1;
    }
    interface LineItemTaxInfo {
        /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
        taxAmount?: Price$1;
        /** Amount for which tax is calculated. */
        taxableAmount?: Price$1;
        /** Tax rate %, as a decimal point. */
        taxRate?: string | null;
        /** Indicates whether the price already includes tax. */
        taxIncludedInPrice?: boolean;
        /** Tax information for a line item. */
        taxBreakdown?: LineItemTaxBreakdown[];
    }
    /**
     * TaxBreakdown represents tax information for a line item.
     * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
     */
    interface LineItemTaxBreakdown {
        /** Jurisdiction that taxes were calculated for. For example, "New York", or "Quebec". */
        jurisdiction?: string | null;
        /** Tax rate used for this jurisdiction, as a decimal. For example, 10% tax is 0.1000. */
        rate?: string | null;
        /** Amount of tax calculated for this line item. */
        taxAmount?: Price$1;
        /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
        taxType?: string | null;
        /**
         * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
         * This name should be explicit enough to allow the merchant to understand what tax was calculated.
         */
        taxName?: string | null;
        /** Type of jurisdiction that taxes were calculated for. */
        jurisdictionType?: JurisdictionType$4;
        /** Non-taxable amount of the line item price. */
        nonTaxableAmount?: Price$1;
        /** Taxable amount of the line item price. */
        taxableAmount?: Price$1;
    }
    /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
    enum JurisdictionType$4 {
        UNDEFINED = "UNDEFINED",
        COUNTRY = "COUNTRY",
        STATE = "STATE",
        COUNTY = "COUNTY",
        CITY = "CITY",
        SPECIAL = "SPECIAL"
    }
    interface DigitalFile$1 {
        /** ID of the secure file in media. */
        fileId?: string;
        /** Link will exist after the digital links have been generated on the order. */
        link?: string | null;
        /**
         * Link expiration time and date.
         * @readonly
         */
        expirationDate?: Date;
    }
    interface SubscriptionInfo$1 {
        /** Subscription ID. */
        _id?: string | null;
        /** Subscription cycle. For example, if this order is for the 3rd cycle of a subscription, value will be `3`. */
        cycleNumber?: number;
        /** Subscription option title. For example, `"Monthly coffee Subscription"`. */
        subscriptionOptionTitle?: string;
        /** Subscription option description. For example, `"1kg of selected coffee, once a month"`. */
        subscriptionOptionDescription?: string | null;
        /** Subscription detailed information. */
        subscriptionSettings?: SubscriptionSettings$5;
    }
    interface SubscriptionSettings$5 {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency$5;
        /** Interval of recurring payment. */
        interval?: number | null;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal: true`. */
        billingCycles?: number | null;
    }
    /** Frequency unit of recurring payment */
    enum SubscriptionFrequency$5 {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface PriceDescription$4 {
        /** __Required.__ Price description in the site's default language. */
        original?: string;
        /**
         * Price description translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface LocationAndQuantity {
        /** Location id in the associated owner app. */
        _id?: string;
        /** Location owner app, if not provided then the site business info locations will be used. */
        appId?: string | null;
        /** Quantity for specific location. */
        quantity?: number;
    }
    /** Buyer Info */
    interface BuyerInfo$6 extends BuyerInfoIdOneOf$4 {
        /** Visitor ID (if site visitor is not a member). */
        visitorId?: string;
        /** Member ID (if site visitor is a site member). */
        memberId?: string;
        /** Contact ID. Auto-created if one does not yet exist. For more information, see [Contacts API](https://www.wix.com/velo/reference/wix-crm-backend/contacts/introduction). */
        contactId?: string | null;
        /** Buyer email address. */
        email?: string | null;
    }
    /** @oneof */
    interface BuyerInfoIdOneOf$4 {
        /** Visitor ID (if site visitor is not a member). */
        visitorId?: string;
        /** Member ID (if site visitor is a site member). */
        memberId?: string;
    }
    enum PaymentStatus$1 {
        UNSPECIFIED = "UNSPECIFIED",
        /** Order is not paid */
        NOT_PAID = "NOT_PAID",
        /** Order is paid */
        PAID = "PAID",
        /** Order was refunded, refund amount less than order total price */
        PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
        /** Full order total price was refunded */
        FULLY_REFUNDED = "FULLY_REFUNDED",
        /** Payments received but not yet confirmed by the payment provider */
        PENDING = "PENDING",
        /** At least one payment was received and approved, covering less than total price amount */
        PARTIALLY_PAID = "PARTIALLY_PAID"
    }
    enum FulfillmentStatus$2 {
        /** none of the order items are fulfilled or order was manually marked as unfulfilled */
        NOT_FULFILLED = "NOT_FULFILLED",
        /**
         * All of the order items are fulfilled or order was manually marked as fulfilled
         * Orders without shipping info are fulfilled automatically
         */
        FULFILLED = "FULFILLED",
        /** Some, but not all of the order items are fulfilled */
        PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED"
    }
    enum WeightUnit$5 {
        /** Weight unit can't be classified, due to an error */
        UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
        /** Kilograms */
        KG = "KG",
        /** Pounds */
        LB = "LB"
    }
    interface PriceSummary$4 {
        /** Subtotal of all the line items, before discounts and before tax. */
        subtotal?: Price$1;
        /** Total shipping price, before discounts and before tax. */
        shipping?: Price$1;
        /** Total tax on this order. */
        tax?: Price$1;
        /** Total calculated discount value. */
        discount?: Price$1;
        /** Order’s total price after discounts and tax. */
        total?: Price$1;
        /** Total price of additional fees before tax. */
        totalAdditionalFees?: Price$1;
    }
    /** Billing Info and shipping details */
    interface AddressWithContact$4 {
        /** Address. */
        address?: Address$5;
        /** Contact details. */
        contactDetails?: FullAddressContactDetails$4;
    }
    /** Physical address */
    interface Address$5 {
        /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
        country?: string | null;
        /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Postal or zip code. */
        postalCode?: string | null;
        /** Street address. */
        streetAddress?: StreetAddress$4;
        /** Main address line (usually street name and number). */
        addressLine1?: string | null;
        /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
        addressLine2?: string | null;
    }
    interface StreetAddress$4 {
        /** Street number. */
        number?: string;
        /** Street name. */
        name?: string;
    }
    interface AddressLocation$4 {
        /** Address latitude. */
        latitude?: number | null;
        /** Address longitude. */
        longitude?: number | null;
    }
    /** Full contact details for an address */
    interface FullAddressContactDetails$4 {
        /** First name. */
        firstName?: string | null;
        /** Last name. */
        lastName?: string | null;
        /** Phone number. */
        phone?: string | null;
        /** Company name. */
        company?: string | null;
        /** Tax information (for Brazil only). If ID is provided, `vatId.type` must also be set, `UNSPECIFIED` is not allowed. */
        vatId?: VatId$5;
    }
    interface VatId$5 {
        /** Customer's tax ID. */
        _id?: string;
        /**
         * Tax type.
         *
         * Supported values:
         * + `CPF`: for individual tax payers
         * + `CNPJ`: for corporations
         */
        type?: VatType$5;
    }
    /** tax info types */
    enum VatType$5 {
        UNSPECIFIED = "UNSPECIFIED",
        /** CPF - for individual tax payers. */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface ShippingInformation$2 {
        /** App Def Id of external provider which was a source of shipping info */
        carrierId?: string | null;
        /** Unique code (or ID) of selected shipping option. For example, `"usps_std_overnight"``. */
        code?: string | null;
        /**
         * Shipping option title.
         * For example, `"USPS Standard Overnight Delivery"`, `"Standard"` or `"First-Class Package International"`.
         */
        title?: string;
        /** Shipping logistics. */
        logistics?: DeliveryLogistics$4;
        /** Shipping costs. */
        cost?: ShippingPrice$4;
        /** Shipping region. */
        region?: ShippingRegion$4;
    }
    interface DeliveryLogistics$4 extends DeliveryLogisticsAddressOneOf {
        /** Shipping address and contact details. */
        shippingDestination?: AddressWithContact$4;
        /** Pickup details. */
        pickupDetails?: PickupDetails$5;
        /** Expected delivery time in free text. For example, `"3-5 business days"`. */
        deliveryTime?: string | null;
        /** Instructions for carrier. For example, `"Please knock on the door. If unanswered, please call contact number. Thanks."`. */
        instructions?: string | null;
        /** Deprecated - Latest expected delivery date and time in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. */
        deliverByDate?: Date;
        /** Expected delivery time. */
        deliveryTimeSlot?: DeliveryTimeSlot$4;
    }
    /** @oneof */
    interface DeliveryLogisticsAddressOneOf {
        /** Shipping address and contact details. */
        shippingDestination?: AddressWithContact$4;
        /** Pickup details. */
        pickupDetails?: PickupDetails$5;
    }
    interface PickupDetails$5 {
        /** Pickup address. */
        address?: PickupAddress$2;
        /** Pickup method */
        pickupMethod?: PickupMethod$4;
    }
    /** Physical address */
    interface PickupAddress$2 {
        /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
        country?: string | null;
        /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Postal or zip code. */
        postalCode?: string | null;
        /** Street address object, with number, name, and apartment number in separate fields. */
        streetAddress?: StreetAddress$4;
        /** Main address line (usually street name and number). */
        addressLine1?: string | null;
        /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
        addressLine2?: string | null;
    }
    enum PickupMethod$4 {
        UNKNOWN_METHOD = "UNKNOWN_METHOD",
        STORE_PICKUP = "STORE_PICKUP",
        PICKUP_POINT = "PICKUP_POINT"
    }
    interface DeliveryTimeSlot$4 {
        /** Delivery slot starting time. */
        from?: Date;
        /** Delivery slot ending time. */
        to?: Date;
    }
    interface ShippingPrice$4 {
        /** Shipping price for display purposes. */
        price?: Price$1;
        /**
         * Total price of shipping after discounts (when relevant), and before tax.
         * @readonly
         */
        totalPriceBeforeTax?: Price$1;
        /**
         * Shipping price after all discounts (if any exist), and after tax.
         * @readonly
         */
        totalPriceAfterTax?: Price$1;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$4;
        /**
         * Shipping discount before tax.
         * @readonly
         */
        discount?: Price$1;
    }
    interface ShippingRegion$4 {
        /** Name of shipping region. For example, `"Metropolitan London"`, or `"Outer Melbourne suburbs"`. */
        name?: string | null;
    }
    enum OrderStatus {
        INITIALIZED = "INITIALIZED",
        APPROVED = "APPROVED",
        CANCELED = "CANCELED"
    }
    interface TaxSummary$4 {
        /**
         * Total tax.
         * @readonly
         */
        totalTax?: Price$1;
    }
    interface OrderTaxInfo {
        /** Calculated tax, added from line items. */
        totalTax?: Price$1;
        /** The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate. */
        taxBreakdown?: OrderTaxBreakdown[];
    }
    /**
     * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
     * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
     */
    interface OrderTaxBreakdown {
        /** The name of the tax against which this tax amount was calculated. */
        taxName?: string;
        /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
        taxType?: string;
        /** The name of the jurisdiction in which this tax detail applies. */
        jurisdiction?: string;
        /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
        jurisdictionType?: JurisdictionType$4;
        /** The rate at which this tax detail was calculated. */
        rate?: string;
        /** The sum of all the tax from line items that calculated by the tax identifiers. */
        aggregatedTaxAmount?: Price$1;
    }
    interface AppliedDiscount$5 extends AppliedDiscountDiscountSourceOneOf$4 {
        /** Applied coupon info. */
        coupon?: Coupon$4;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$4;
        /** Automatic Discount */
        discountRule?: DiscountRule$5;
        /**
         * Discount type.
         * * `"GLOBAL"` - discount applies to entire order.
         * * `"SPECIFIC-ITEMS"` - discount applies to specific items.
         * * `"SHIPPING"` - discount applies to shipping. For example, free shipping.
         */
        discountType?: DiscountType$5;
        /**
         * IDs of line items discount applies to.
         * Deprecated. Use `line_item_discounts` instead.
         */
        lineItemIds?: string[];
        /** Discount id. */
        _id?: string | null;
    }
    /** @oneof */
    interface AppliedDiscountDiscountSourceOneOf$4 {
        /** Applied coupon info. */
        coupon?: Coupon$4;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$4;
        /** Automatic Discount */
        discountRule?: DiscountRule$5;
    }
    enum DiscountType$5 {
        GLOBAL = "GLOBAL",
        SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
        SHIPPING = "SHIPPING"
    }
    /** Coupon */
    interface Coupon$4 {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
        /** Coupon name. */
        name?: string;
        /** Coupon value. */
        amount?: Price$1;
    }
    interface MerchantDiscount$4 extends MerchantDiscountMerchantDiscountReasonOneOf {
        /**
         * Pre-defined discount reason (optional).
         * * `"ITEMS_EXCHANGE"` - exchange balance acquired as a result of items exchange.
         */
        discountReason?: DiscountReason;
        /** Discount description as free text (optional). */
        description?: string | null;
        /** Discount amount. */
        amount?: Price$1;
    }
    /** @oneof */
    interface MerchantDiscountMerchantDiscountReasonOneOf {
        /**
         * Pre-defined discount reason (optional).
         * * `"ITEMS_EXCHANGE"` - exchange balance acquired as a result of items exchange.
         */
        discountReason?: DiscountReason;
        /** Discount description as free text (optional). */
        description?: string | null;
    }
    enum DiscountReason {
        UNSPECIFIED = "UNSPECIFIED",
        EXCHANGED_ITEMS = "EXCHANGED_ITEMS"
    }
    interface DiscountRule$5 {
        /** Discount rule ID */
        _id?: string;
        /** Discount rule name */
        name?: DiscountRuleName$5;
        /** Discount value. */
        amount?: Price$1;
    }
    interface DiscountRuleName$5 {
        /** Original discount rule name (in site's default language). */
        original?: string;
        /** Translated discount rule name according to buyer language. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface LineItemDiscount$4 {
        /** ID of line item the discount applies to. */
        _id?: string;
        /** Total discount for this line item. */
        totalDiscount?: Price$1;
    }
    interface Activity$1 extends ActivityContentOneOf {
        /** Custom activity details (optional). `activity.type` must be `CUSTOM_ACTIVITY`. */
        customActivity?: CustomActivity;
        /** Merchant comment details (optional). `activity.type` must be `MERCHANT_COMMENT`. */
        merchantComment?: MerchantComment;
        /** Additional info about order refunded activity (optional). `activity.type` must be `ORDER_REFUNDED`. */
        orderRefunded?: OrderRefunded$1;
        /**
         * Activity ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Activity author's email.
         * @readonly
         */
        authorEmail?: string | null;
        /**
         * Activity creation date and time.
         * @readonly
         */
        _createdDate?: Date;
        /** Activity type. */
        type?: ActivityType$1;
    }
    /** @oneof */
    interface ActivityContentOneOf {
        /** Custom activity details (optional). `activity.type` must be `CUSTOM_ACTIVITY`. */
        customActivity?: CustomActivity;
        /** Merchant comment details (optional). `activity.type` must be `MERCHANT_COMMENT`. */
        merchantComment?: MerchantComment;
        /** Additional info about order refunded activity (optional). `activity.type` must be `ORDER_REFUNDED`. */
        orderRefunded?: OrderRefunded$1;
    }
    interface CustomActivity {
        /** ID of the app that created the custom activity. */
        appId?: string;
        /** Custom activity type. For example, `"Ticket number set"`. */
        type?: string;
        /** Additional data in key-value form. For example, `{ "Ticket number": "123456" }`. */
        additionalData?: Record<string, string>;
    }
    /** Store owner added a comment */
    interface MerchantComment {
        /** Merchant comment message. */
        message?: string;
    }
    interface OrderRefunded$1 {
        /** Whether order was refunded manually. For example, via payment provider or using cash. */
        manual?: boolean;
        /** Refund amount. */
        amount?: Price$1;
        /** Reason for refund. */
        reason?: string;
    }
    interface OrderCreatedFromExchange {
        /** ID of the original order for which the exchange happened. */
        originalOrderId?: string;
    }
    interface NewExchangeOrderCreated {
        /** ID of the new order created as a result of an exchange of items. */
        exchangeOrderId?: string;
        /** IDs of the items that were exchanged. */
        lineItems?: LineItemExchangeData[];
    }
    interface LineItemExchangeData {
        /** ID of the exchanged line item. */
        lineItemId?: string;
        /** Line item quantity being exchanged. */
        quantity?: number;
    }
    interface DraftOrderChangesApplied {
        /** Draft order id. */
        draftOrderId?: string;
        /** Reason for edit, given by user (optional). */
        reason?: string | null;
        /** Changes applied to order. */
        changes?: OrderChange[];
    }
    interface OrderChange extends OrderChangeValueOneOf {
        lineItemChanged?: LineItemChanges;
        lineItemAdded?: ManagedLineItem;
        lineItemRemoved?: ManagedLineItem;
        discountAdded?: ManagedDiscount;
        discountRemoved?: ManagedDiscount;
        additionalFeeAdded?: ManagedAdditionalFee;
        additionalFeeRemoved?: ManagedAdditionalFee;
        totalPriceChanged?: TotalPriceChange;
    }
    /** @oneof */
    interface OrderChangeValueOneOf {
        lineItemChanged?: LineItemChanges;
        lineItemAdded?: ManagedLineItem;
        lineItemRemoved?: ManagedLineItem;
        discountAdded?: ManagedDiscount;
        discountRemoved?: ManagedDiscount;
        additionalFeeAdded?: ManagedAdditionalFee;
        additionalFeeRemoved?: ManagedAdditionalFee;
        totalPriceChanged?: TotalPriceChange;
    }
    interface LineItemChanges {
        /** Line item ID. */
        _id?: string;
        /** Item name. */
        name?: ProductName$4;
        /** Item quantity change. */
        quantity?: LineItemQuantityChange;
        /** Item price change. */
        price?: LineItemPriceChange;
    }
    interface LineItemQuantityChange {
        /** Item quantity before update. */
        originalQuantity?: number;
        /** Item quantity after update. */
        newQuantity?: number;
        /** Difference between original and new quantity. Absolute value. */
        diff?: number;
        /** Type of quantity change: increase or decrease. */
        deltaType?: LineItemQuantityChangeType;
    }
    enum LineItemQuantityChangeType {
        QUANTITY_INCREASED = "QUANTITY_INCREASED",
        QUANTITY_DECREASED = "QUANTITY_DECREASED"
    }
    interface LineItemPriceChange {
        /** Item price before update. */
        originalPrice?: Price$1;
        /** Item price after update. */
        newPrice?: Price$1;
    }
    interface ManagedLineItem {
        /** Line item ID. */
        _id?: string;
        /** Item name. */
        name?: ProductName$4;
        /** Added or removed item quantity. */
        quantity?: number;
    }
    interface ManagedDiscount {
        /** Discount id. */
        _id?: string;
        /** Discount name: coupon name / discount rule name / merchant discount description. */
        name?: TranslatedValue;
        /** Line items discount applies to. */
        affectedLineItems?: LineItemAmount[];
        /** Discount amount. */
        totalAmount?: Price$1;
    }
    interface TranslatedValue {
        /** Value in site default language. */
        original?: string;
        /** Translated value. */
        translated?: string | null;
    }
    interface LineItemAmount {
        /** Order line item id */
        _id?: string;
        /** Item name. */
        name?: ProductName$4;
        /** Amount associated with this item. (Discount amount for item / additional fee amount for item) */
        amount?: Price$1;
    }
    interface ManagedAdditionalFee {
        /** Additional fee id. */
        _id?: string;
        /** Additional fee name. */
        name?: TranslatedValue;
        /** Line items additional fee applies to. */
        affectedLineItems?: LineItemAmount[];
        /** Additional fee amount. */
        totalAmount?: Price$1;
    }
    interface TotalPriceChange {
        /** Order’s total price after discounts and tax. Before update */
        originalTotal?: Price$1;
        /** Order’s total price after discounts and tax. After update */
        newTotal?: Price$1;
    }
    /** Payment method is saved for order */
    interface SavedPaymentMethod {
        /** Payment method name */
        name?: string;
        /** Payment method description */
        description?: string | null;
    }
    enum ActivityType$1 {
        ORDER_REFUNDED = "ORDER_REFUNDED",
        ORDER_PLACED = "ORDER_PLACED",
        ORDER_PAID = "ORDER_PAID",
        ORDER_FULFILLED = "ORDER_FULFILLED",
        ORDER_NOT_FULFILLED = "ORDER_NOT_FULFILLED",
        ORDER_CANCELED = "ORDER_CANCELED",
        DOWNLOAD_LINK_SENT = "DOWNLOAD_LINK_SENT",
        TRACKING_NUMBER_ADDED = "TRACKING_NUMBER_ADDED",
        TRACKING_NUMBER_EDITED = "TRACKING_NUMBER_EDITED",
        TRACKING_LINK_ADDED = "TRACKING_LINK_ADDED",
        SHIPPING_CONFIRMATION_EMAIL_SENT = "SHIPPING_CONFIRMATION_EMAIL_SENT",
        INVOICE_ADDED = "INVOICE_ADDED",
        INVOICE_REMOVED = "INVOICE_REMOVED",
        INVOICE_SENT = "INVOICE_SENT",
        FULFILLER_EMAIL_SENT = "FULFILLER_EMAIL_SENT",
        SHIPPING_ADDRESS_EDITED = "SHIPPING_ADDRESS_EDITED",
        EMAIL_EDITED = "EMAIL_EDITED",
        PICKUP_READY_EMAIL_SENT = "PICKUP_READY_EMAIL_SENT",
        CUSTOM_ACTIVITY = "CUSTOM_ACTIVITY",
        MERCHANT_COMMENT = "MERCHANT_COMMENT",
        ORDER_CREATED_FROM_EXCHANGE = "ORDER_CREATED_FROM_EXCHANGE",
        NEW_EXCHANGE_ORDER_CREATED = "NEW_EXCHANGE_ORDER_CREATED",
        ORDER_PARTIALLY_PAID = "ORDER_PARTIALLY_PAID",
        DRAFT_ORDER_CHANGES_APPLIED = "DRAFT_ORDER_CHANGES_APPLIED",
        SAVED_PAYMENT_METHOD = "SAVED_PAYMENT_METHOD"
    }
    enum AttributionSource {
        UNSPECIFIED = "UNSPECIFIED",
        FACEBOOK_ADS = "FACEBOOK_ADS"
    }
    interface CreatedBy$2 extends CreatedByStringOneOf {
        /**
         * User ID - when the order was created by a Wix user on behalf of a buyer.
         * For example, via POS (point of service).
         */
        userId?: string;
        /** Member ID - when the order was created by a **logged in** site visitor. */
        memberId?: string;
        /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
        visitorId?: string;
        /** App ID - when the order was created by an external application. */
        appId?: string;
    }
    /** @oneof */
    interface CreatedByStringOneOf {
        /**
         * User ID - when the order was created by a Wix user on behalf of a buyer.
         * For example, via POS (point of service).
         */
        userId?: string;
        /** Member ID - when the order was created by a **logged in** site visitor. */
        memberId?: string;
        /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
        visitorId?: string;
        /** App ID - when the order was created by an external application. */
        appId?: string;
    }
    interface ChannelInfo$2 {
        /** Sales channel that submitted the order. */
        type?: ChannelType$5;
        /** Reference to an order ID from an external system. */
        externalOrderId?: string | null;
        /** URL to the order in the external system. */
        externalOrderUrl?: string | null;
    }
    enum ChannelType$5 {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        POS = "POS",
        EBAY = "EBAY",
        AMAZON = "AMAZON",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE",
        WIX_INVOICES = "WIX_INVOICES",
        BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
        WISH = "WISH",
        CLASS_PASS = "CLASS_PASS",
        GLOBAL_E = "GLOBAL_E",
        FACEBOOK = "FACEBOOK",
        ETSY = "ETSY",
        TIKTOK = "TIKTOK",
        FAIRE_COM = "FAIRE_COM"
    }
    interface CustomField$3 {
        /** Custom field value. */
        value?: any;
        /** Custom field title. */
        title?: string;
        /** Translated custom field title. */
        translatedTitle?: string | null;
    }
    interface BalanceSummary {
        /**
         * Current amount left to pay.
         * @readonly
         */
        balance?: Balance;
        /**
         * Sum of all approved and successful payments.
         *
         * The value includes payments that have subsequently been fully or partially refunded.
         * @readonly
         */
        paid?: Price$1;
        /**
         * Sum of all successfully refunded payments.
         * @readonly
         */
        refunded?: Price$1;
    }
    /**
     * Order balance. Reflects amount left to be paid on order and is calculated dynamically. Can be negative per balance definition.
     * `amount` field depends on order payment status:
     * + UNSPECIFIED, NOT_PAID: price_summary.total_price
     * + PARTIALLY_PAID : price_summary.total_price - pay_now.total_price
     * + PENDING, REFUNDED, PARTIALLY_REFUNDED, PAID : 0
     */
    interface Balance {
        /**
         * Balance amount.
         *
         * A negative `amount` represents the amount to be refunded. This can happen due to overcharging or the order being modified after a payment has been made.
         * @readonly
         */
        amount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
    }
    interface AdditionalFee$4 {
        /** Additional fee's unique code for future processing. */
        code?: string | null;
        /** Name of additional fee. */
        name?: string;
        /** Additional fee's price. */
        price?: Price$1;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$4;
        /** SPI implementer's `appId`. */
        providerAppId?: string | null;
        /** Additional fee's price before tax. */
        priceBeforeTax?: Price$1;
        /** Additional fee's id. */
        _id?: string;
        /**
         * Optional - Line items associated with this additional fee.
         * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
         */
        lineItemIds?: string[];
    }
    interface FulfillmentStatusesAggregate {
        /** Unique string values based on Fulfillment entities statuses */
        statuses?: string[] | null;
    }
    interface ExtendedFields$5 {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    /**
     * Common object for tags.
     * Should be use as in this example:
     * message Foo {
     * string id = 1;
     * ...
     * Tags tags = 5
     * }
     *
     * example of taggable entity
     * {
     * id: "123"
     * tags: {
     * tags: {
     * tag_ids:["11","22"]
     * },
     * private_tags: {
     * tag_ids: ["33", "44"]
     * }
     * }
     * }
     */
    interface Tags {
        /** Tags that require an additional permission in order to access them, normally not given to site members or visitors. */
        privateTags?: TagList;
        /** Tags that are exposed to anyone who has access to the labeled entity itself, including site members and visitors. */
        tags?: TagList;
    }
    interface TagList {
        /** List of tag IDs */
        tagIds?: string[];
    }
    interface TriggerReindexOrderRequest {
        metasiteId?: string;
        orderId?: string;
    }
    interface SnapshotMessage$1 {
        _id?: string;
        opType?: number;
    }
    interface GetMetasiteDataRequest {
        /** meta site Id for data to retrieve */
        metasiteId: string;
    }
    interface GetMetasiteDataResponse {
        /** meta site data */
        metasite?: MetaSite;
        /** is metasite added to new SDL population via population manager */
        isInNewPopulation?: boolean;
        /** metasite url */
        metasiteUrl?: string;
        /** owner data */
        userDataResponse?: UserDataResponse;
    }
    /**
     * Represents Meta Site.
     *
     * Meta Site is a legacy concept, it aggregates data from several domains. Generally, it contains and manages
     * relations between different entities related to the site (or, as a new concept, to the container).
     *
     * We prefer to pronounce it as 2 separate words, therefore we use terms "meta site" or "metaSite" or "meta_site" in code.
     */
    interface MetaSite {
        /**
         * Identifier of meta site.
         * @readonly
         */
        metaSiteId?: string;
        /**
         * Internal version of meta site. Monotonically increasing number.
         *
         * If passed within update request, it will be used for optimistic locking. In this case,
         * StaleStateException will be thrown if current version doesn't match.
         *
         * In old MetaSiteDTO -- revision.
         * @readonly
         */
        version?: string;
        /**
         * Identifier of account that owns this meta site.
         * @readonly
         */
        ownerId?: string;
        /**
         * Date and time when meta site was created.
         * @readonly
         */
        dateCreated?: Date;
        /**
         * Date and time when meta site was updated for the last time.
         * @readonly
         */
        dateUpdated?: Date;
        /**
         * All "applications" of this meta site.
         *
         * In old MetaSiteDTO -- embeddedServices.
         */
        apps?: App[];
        /** Namespace of meta site. */
        namespace?: Namespace;
        /**
         * Indicates whether https should be used for viewing a site.
         *
         * In old MetaSiteDTO -- flags.UseHttps.
         */
        useHttps?: boolean;
        defaultSeoData?: SeoData;
        /**
         * Information about HTML application.
         *
         * In old MetaSiteDTO -- appplications.find(_.applicationType == HtmlWeb).
         */
        htmlApp?: HtmlApplication;
        externalUriMappings?: ExternalUriMapping[];
        /** Indicates whether meta site was published. If true - site should be accessible for viewing. */
        published?: boolean;
        /**
         * The name of meta site.
         *
         * Matches this regular expression: [a-z0-9_\-]{4,20} (but for some legacy sites might be shorted/longer).
         */
        name?: string;
        /**
         * Indicates whether this site is managed by ADI editor
         *
         * Values:
         * None - not managed.
         * Some(false) - site was created via ADI editor, but later on user switched to regular editor.
         * Some(true) - site was created and still is managed by ADI editor.
         *
         * In old MetaSiteDTO: embeddedService[embeddedServiceType=Onboarding].attributes.isInUse.
         */
        adi?: boolean | null;
        /**
         * Indicates whether this meta site is template.
         *
         * In old MetaSiteDTO: documentType == Template.
         * @readonly
         */
        template?: boolean | null;
        /**
         * Identifier of a template (meta site) from which this site was created.
         *
         * If it's empty it either means that site wasn't created from a template OR it's very old, so we didn't store
         * it back then.
         *
         * For example, if "site" was created from "template", then "template"'s id will be in origin_template_id.
         * When "site" is cloned, clone will also have "template"'s id in origin_instance_id.
         * @readonly
         */
        originTemplateId?: string | null;
        /**
         * Indicates meta site blocked from publishing and added additional filtering in listing API (MSS). READ_ONLY.
         * @readonly
         */
        blocked?: boolean;
        /**
         * If true - default meta site routing (connected domains, free url, ML) is not used for this meta site.
         *
         * Meaning, that if `example.org` is connected to this meta site, `router-server` will return 404 for `example.org`
         * anyway.
         *
         * This flag is set for some sites that have custom mapping in Routes API / wix-pages-bo.
         */
        dontUseDefaultRouting?: boolean;
        /**
         * Indicates the site is used as critical asset and as such is protected. You would be only able to provision applications to this meta site. READ_ONLY.
         * @readonly
         */
        criticalAsset?: boolean;
    }
    interface App {
        /**
         * Identifier of application type (application definition id).
         *
         * Can be both UUID and non-UUID, for example: SiteMembers, Onboarding, CloudSiteExtension etc.
         */
        appDefId?: string;
        /**
         * Identifier of the instance (concrete application, installed on a site).
         *
         * Mostly UUID, but for some specific legacy cases might be something else.
         */
        instanceId?: string;
        /**
         * State of this app (see docs for state).
         * @readonly
         */
        state?: State;
        /**
         * Identifier of the originating application. For example, if this app was part of a template,
         * then an app will get instance_id of that app as origin instance id.
         *
         * If application was provisioned not from some template, it should be empty.
         *
         * Note, it could be == to instance_id (for old sites).
         */
        originInstanceId?: string;
    }
    /**
     * Represents the actual state of the application on site. Do not confuse with the State in the old MetaSiteDTO,
     * which has less values and doesn't have 1-to-1 correspondence with this one (this one is exact and correct!)
     */
    enum State {
        UNKNOWN = "UNKNOWN",
        /** App is installed on a site. */
        ENABLED = "ENABLED",
        /** App is removed from a site (but we preserve it just in case). */
        DISABLED = "DISABLED",
        /** App is in "demo" mode, meaning that it's in read-only mode (it's in a template OR not installed yet). */
        TEMPLATE = "TEMPLATE",
        /** App is not installed, there is a user intention for it only (user will see the pimpl in the editor). */
        PENDING = "PENDING"
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
    interface SeoData {
        /** A title. */
        title?: string | null;
        /** Indicates whether the site should be indexable by bots. */
        indexable?: boolean;
        /** TDB. */
        suppressTrackingCookies?: boolean;
        /** TDB. */
        ogImage?: string | null;
        /** A list of meta tags. */
        metaTags?: MetaTag[];
        /** A canonical URL for a site. */
        canonicalUrl?: string | null;
    }
    interface MetaTag {
        /** A name. */
        name?: string;
        /** A value. */
        value?: string;
        /** Indicates whether should be rendered as property. */
        property?: boolean;
    }
    /** Represents an HTML application (HTML site). */
    interface HtmlApplication {
        /** Legacy, don't use it if you can. */
        intId?: number;
        /** Identifier of the instance. */
        instanceId?: string;
        seoData?: SeoData;
        /** Language of this site. */
        languageCode?: string;
        /** File name for thumbnail. */
        thumbnail?: string | null;
        /** Indicates whether this site is managed by EditorX. */
        editorX?: boolean;
        /** Indicates whether this site is managed by Wix Studio. */
        studio?: boolean;
    }
    interface ExternalUriMapping {
        /** Deprecated. */
        fromExternalUri?: string;
        /** Deprecated. */
        toWixUri?: string;
        /** Deprecated. */
        oldToWixUri?: string | null;
        /** Deprecated. */
        requireDomain?: boolean | null;
    }
    interface UserDataResponse {
        userEmail?: string;
        /** owner name */
        userName?: string;
        /** owner status */
        userStatus?: string;
        /** owner language */
        userLanguage?: string;
    }
    interface QueryOrdersForMetasiteRequest {
        /** meta site Id for EP orders to retrieve */
        metasiteId: string;
        /** paginated internal orders query request */
        internalQueryOrdersRequest?: InternalQueryOrdersRequest;
    }
    interface InternalQueryOrdersRequest {
        /** Query options. */
        query?: PlatformQuery$1;
    }
    interface PlatformQuery$1 extends PlatformQueryPagingMethodOneOf$1 {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging$1;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging$2;
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Sorting options. For example, `[{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}]`. */
        sort?: Sorting$2[];
    }
    /** @oneof */
    interface PlatformQueryPagingMethodOneOf$1 {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging$1;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging$2;
    }
    interface Sorting$2 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$2;
    }
    enum SortOrder$2 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface PlatformPaging$1 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface CursorPaging$2 {
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
    interface QueryOrdersForMetasiteResponse {
        /** found exisitng orders according to pagination and query provided. */
        orders?: Order$1[];
        /** Details on the paged set of results returned. */
        pagingMetadata?: PlatformPagingMetadata$1;
    }
    interface PlatformPagingMetadata$1 {
        /** The number of items returned in this response. */
        count?: number | null;
        /** The offset which was requested. Returned if offset paging was used. */
        offset?: number | null;
        /** The total number of items that match the query. Returned if offset paging was used. */
        total?: number | null;
        /** Cursors to navigate through result pages. Returned if cursor paging was used. */
        cursors?: Cursors$2;
    }
    interface Cursors$2 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface GetOrderForMetasiteRequest {
        /** meta site Id for EP order to retrieve */
        metasiteId: string;
        /** Order Id for EP order to retrieve */
        orderId: string;
    }
    interface GetOrderForMetasiteResponse {
        /** Existing EP order */
        order?: Order$1;
    }
    interface ListOrderTransactionsForMetasiteRequest {
        /** meta site Id for EP order transactions to retrieve */
        metasiteId: string;
        /** Order Id for EP order transactions to retrieve */
        orderId: string;
    }
    interface ListOrderTransactionsForMetasiteResponse {
        /** Order ID and its associated transactions. */
        orderTransactions?: OrderTransactions$1;
    }
    interface OrderTransactions$1 {
        /** Order ID. */
        orderId?: string;
        /** Record of payments made to the merchant. */
        payments?: Payment$1[];
        /** Record of refunds made to the buyer. */
        refunds?: Refund$1[];
    }
    interface Payment$1 extends PaymentPaymentDetailsOneOf$1 {
        /** Regular payment details. */
        regularPaymentDetails?: RegularPaymentDetails$1;
        /** Gift card payment details. */
        giftcardPaymentDetails?: GiftCardPaymentDetails$1;
        /**
         * Payment ID.
         * @readonly
         */
        _id?: string | null;
        /** Date and time the payment was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. Defaults to current time when not provided. */
        _createdDate?: Date;
        /**
         * Date and time the payment was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * @readonly
         */
        _updatedDate?: Date;
        /** Payment amount. */
        amount?: Price$1;
        /**
         * Whether refunds for this payment are disabled.
         * + `true`: This payment is not refundable.
         * + `false`: This payment may be refunded. However, this ultimately depends on the payment provider.
         */
        refundDisabled?: boolean;
    }
    /** @oneof */
    interface PaymentPaymentDetailsOneOf$1 {
        /** Regular payment details. */
        regularPaymentDetails?: RegularPaymentDetails$1;
        /** Gift card payment details. */
        giftcardPaymentDetails?: GiftCardPaymentDetails$1;
    }
    interface RegularPaymentDetails$1 {
        /** Wix Payments order ID. */
        paymentOrderId?: string | null;
        /**
         * Payment gateway's transaction ID. This ID can be used with the Wix Payments [Transactions API](https://dev.wix.com/docs/rest/api-reference/wix-payments/transactions/introduction).
         * This field is only returned when the value of `offline_payment` is `false`.
         */
        gatewayTransactionId?: string | null;
        /**
         * Payment method. Non-exhaustive list of supported values:
         * + `CreditCard`, `Alipay`, `AstropayCash`, `AstropayDBT`, `AstropayMBT`, `Bitcoin`, `BitPay`, `Cash`, `ConvenienceStore`, `EPay`, `Fake`, `Giropay`, `IDeal`, `InPerson`, `Klarna`, `MercadoPago`, `Netpay`, `NordeaSolo`, `Offline`, `PagSeguro`, `PayEasy`, `PayPal`, `Paysafecard`, `Paysafecash`, `PointOfSale`, `Poli`, `Privat24`, `Przelewy24`, `RapidTransfer`, `Sepa`, `Skrill`, `Sofort`, `Trustly`, `Neteller`, `Unionpay`, `UniPay`, `Yandex`
         */
        paymentMethod?: string | null;
        /** Transaction ID in the payment provider's system. For example, at PayPal, Square, Stripe, etc. Not returned for offline payments. */
        providerTransactionId?: string | null;
        /** Whether the payment was made offline. For example, when using cash or when marked as paid in the Business Manager. */
        offlinePayment?: boolean;
        /** Payment status. */
        status?: TransactionStatus$1;
        /** Whether there is a payment agreement that allows for future charges. */
        savedPaymentMethod?: boolean;
    }
    enum TransactionStatus$1 {
        UNDEFINED = "UNDEFINED",
        APPROVED = "APPROVED",
        PENDING = "PENDING",
        PENDING_MERCHANT = "PENDING_MERCHANT",
        CANCELED = "CANCELED",
        DECLINED = "DECLINED",
        REFUNDED = "REFUNDED",
        PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
        AUTHORIZED = "AUTHORIZED",
        VOIDED = "VOIDED"
    }
    interface GiftCardPaymentDetails$1 {
        /** Gift card payment ID. */
        giftCardPaymentId?: string;
        /** ID of the app that created the gift card. */
        appId?: string;
        /**
         * Whether the gift card is voided.
         * @readonly
         */
        voided?: boolean;
    }
    interface MembershipPaymentDetails$1 {
        /** Membership ID. */
        membershipId?: string;
        /** ID of the line item this membership applies to. */
        lineItemId?: string;
        /** Payment status. */
        status?: MembershipPaymentStatus$1;
        /** Membership name. */
        name?: MembershipName$5;
        /** The transaction ID in the membership system. Can be used to void the transaction. */
        externalTransactionId?: string | null;
        /**
         * Whether the membership is voided.
         * @readonly
         */
        voided?: boolean;
        /** ID of the application providing this payment option. */
        providerAppId?: string;
    }
    enum MembershipPaymentStatus$1 {
        /** CHARGED - Payment was charged */
        CHARGED = "CHARGED",
        /** CHARGE_FAILED - The attempt to charge that payment have failed, for example due to lack of credits */
        CHARGE_FAILED = "CHARGE_FAILED"
    }
    interface MembershipName$5 {
        /** The name of this membership */
        original?: string;
        /** Optional - Translated name of this membership. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface Refund$1 {
        /**
         * Refund ID.
         * @readonly
         */
        _id?: string;
        /** List of transactions. */
        transactions?: RefundTransaction$1[];
        /** Refund business details. */
        details?: RefundDetails$1;
        /** Date and time the refund was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. Defaults to current time when not provided. */
        _createdDate?: Date;
    }
    interface RefundTransaction$1 {
        /** ID of the payment associated with this refund. */
        paymentId?: string;
        /** Refund amount. */
        amount?: Price$1;
        /** Refund status. */
        refundStatus?: RefundStatus$1;
        /**
         * Payment gateway's refund ID. This ID can be used with the Wix Payments [Transactions API](https://dev.wix.com/docs/rest/api-reference/wix-payments/transactions/introduction).
         * This field is only returned when the value of `external_refund` is `false`.
         */
        gatewayRefundId?: string | null;
        /** ID of the refund in the payment provider's system. For example, at PayPal, Square, Stripe, etc. Not returned for external refunds. */
        providerRefundId?: string | null;
        /** Whether refund was made externally and manually on the payment provider's side. */
        externalRefund?: boolean;
    }
    enum RefundStatus$1 {
        PENDING = "PENDING",
        SUCCEEDED = "SUCCEEDED",
        FAILED = "FAILED"
    }
    /** Business model of a refund request */
    interface RefundDetails$1 {
        /** Order line item IDs and quantities that were refunded. */
        items?: RefundItem$1[];
        /** Whether the shipping fee was also refunded. */
        shippingIncluded?: boolean;
        /** Reason for the refund, provided by customer (optional). */
        reason?: string | null;
    }
    interface RefundItem$1 {
        /** Line item ID the refunded line item. */
        lineItemId?: string;
        /** Line item quantity refunded. */
        quantity?: number;
    }
    interface TestUrlAdditionalBindingsRequest {
    }
    interface TestUrlAdditionalBindingsResponse {
        responseString?: string;
    }
    interface MessageEnvelope$a {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$a;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$a extends IdentificationDataIdOneOf$a {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$a;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$a {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$a {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    interface UpdateInternalDocumentsEvent extends UpdateInternalDocumentsEventOperationOneOf {
        /** insert/update documents */
        update?: InternalDocumentUpdateOperation;
        /** delete by document ids */
        deleteByIds?: DeleteByIdsOperation;
        /** delete documents matching filter */
        deleteByFilter?: DeleteByFilterOperation;
        /** update internal documents matching filter */
        updateByFilter?: InternalDocumentUpdateByFilterOperation;
        /** update only existing documents */
        updateExisting?: InternalUpdateExistingOperation;
        /** insert/update documents with versioning */
        versionedUpdate?: VersionedDocumentUpdateOperation;
        /** delete by document ids with versioning */
        versionedDeleteByIds?: VersionedDeleteByIdsOperation;
        /** type of the documents */
        documentType?: string;
        /** language of the documents (mandatory) */
        language?: string | null;
        /** one or more search documents */
        addDocuments?: InternalDocument[];
        /** one or more ids of indexed documents to be removed. Removal will happen before addition (if both provided) */
        removeDocumentIds?: string[];
        /** id to pass to processing notification */
        correlationId?: string | null;
    }
    /** @oneof */
    interface UpdateInternalDocumentsEventOperationOneOf {
        /** insert/update documents */
        update?: InternalDocumentUpdateOperation;
        /** delete by document ids */
        deleteByIds?: DeleteByIdsOperation;
        /** delete documents matching filter */
        deleteByFilter?: DeleteByFilterOperation;
        /** update internal documents matching filter */
        updateByFilter?: InternalDocumentUpdateByFilterOperation;
        /** update only existing documents */
        updateExisting?: InternalUpdateExistingOperation;
        /** insert/update documents with versioning */
        versionedUpdate?: VersionedDocumentUpdateOperation;
        /** delete by document ids with versioning */
        versionedDeleteByIds?: VersionedDeleteByIdsOperation;
    }
    interface InternalDocument {
        /** document with mandatory fields (id) and with fields specific to the type of the document */
        document?: Record<string, any> | null;
    }
    interface InternalDocumentUpdateOperation {
        /** documents to index or update */
        documents?: InternalDocument[];
    }
    interface DeleteByIdsOperation {
        /** ids of the documents to delete */
        documentIds?: string[];
    }
    interface DeleteByFilterOperation {
        /** documents matching this filter wil be deleted. only filterable documents defined in document_type can be used for filtering */
        filter?: Record<string, any> | null;
    }
    interface InternalDocumentUpdateByFilterOperation {
        /** documents matching this filter will be updated */
        filter?: Record<string, any> | null;
        /** partial document to apply */
        document?: InternalDocument;
    }
    interface InternalUpdateExistingOperation {
        /** documents to update */
        documents?: InternalDocument[];
    }
    interface VersionedDocumentUpdateOperation {
        /** documents to create or overwrite */
        documents?: InternalDocument[];
        /** versioning mode to use instead of default */
        versioningMode?: VersioningMode;
    }
    enum VersioningMode {
        /** use default versioning mode agreed with search team */
        DEFAULT = "DEFAULT",
        /** execute only if version is greater than existing */
        GREATER_THAN = "GREATER_THAN",
        /** execute only if version is greater or equal to existing */
        GREATER_OR_EQUAL = "GREATER_OR_EQUAL"
    }
    interface VersionedDeleteByIdsOperation {
        /** ids with version of the documents to delete */
        documentIds?: VersionedDocumentId[];
    }
    interface VersionedDocumentId {
        /** document id */
        documentId?: string;
        /** document version */
        version?: string;
        /** versioning mode to use instead of default */
        versioningMode?: VersioningMode;
    }
    interface TriggerReindexRequest {
        metasiteId: string;
        orderIds?: string[];
    }
    interface TriggerReindexResponse {
    }
    interface DomainEvent$a extends DomainEventBodyOneOf$a {
        createdEvent?: EntityCreatedEvent$a;
        updatedEvent?: EntityUpdatedEvent$a;
        deletedEvent?: EntityDeletedEvent$a;
        actionEvent?: ActionEvent$a;
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
    interface DomainEventBodyOneOf$a {
        createdEvent?: EntityCreatedEvent$a;
        updatedEvent?: EntityUpdatedEvent$a;
        deletedEvent?: EntityDeletedEvent$a;
        actionEvent?: ActionEvent$a;
    }
    interface EntityCreatedEvent$a {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$a {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$a {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$a {
        bodyAsJson?: string;
    }
    interface Empty$6 {
    }
    interface BatchOfTriggerReindexOrderRequest {
        requests?: TriggerReindexOrderRequest[];
    }
    interface SendBuyerConfirmationEmailRequest {
        orderId: string;
    }
    interface SendBuyerConfirmationEmailResponse {
    }
    interface SendBuyerPaymentsReceivedEmailRequest {
        orderId: string;
    }
    interface SendBuyerPaymentsReceivedEmailResponse {
    }
    interface SendBuyerPickupConfirmationEmailRequest {
        orderId: string;
    }
    interface SendBuyerPickupConfirmationEmailResponse {
    }
    interface BulkSendBuyerPickupConfirmationEmailsRequest {
        /** IDs of orders to send pickup emails for. */
        orderIds?: string[];
    }
    interface BulkSendBuyerPickupConfirmationEmailsResponse {
    }
    interface SendBuyerShippingConfirmationEmailRequest {
        orderId: string;
    }
    interface SendBuyerShippingConfirmationEmailResponse {
    }
    interface BulkSendBuyerShippingConfirmationEmailsRequest {
        /** IDs of orders to send pickup emails for. */
        orderIds?: string[];
    }
    interface BulkSendBuyerShippingConfirmationEmailsResponse {
    }
    interface SendMerchantOrderReceivedNotificationRequest {
        orderId: string;
    }
    interface SendMerchantOrderReceivedNotificationResponse {
    }
    interface SendCancelRefundEmailRequest {
        /** The ID of order that is canceled/refunded */
        orderId: string;
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
        /** Refund amount */
        refundAmount: Price$1;
    }
    interface SendCancelRefundEmailResponse {
    }
    interface SendMerchantOrderReceivedPushRequest {
        orderId: string;
    }
    interface SendMerchantOrderReceivedPushResponse {
    }
    interface PreviewEmailByTypeRequest {
        emailType: PreviewEmailType;
    }
    enum PreviewEmailType {
        ORDER_PLACED = "ORDER_PLACED",
        DOWNLOAD_LINKS = "DOWNLOAD_LINKS",
        ORDER_SHIPPED = "ORDER_SHIPPED",
        ORDER_READY_FOR_PICKUP = "ORDER_READY_FOR_PICKUP"
    }
    interface PreviewEmailByTypeResponse {
        emailPreview?: string;
    }
    interface PreviewRefundEmailRequest {
        orderId: string;
        /** Refund amount */
        refundAmount: Price$1;
        /** Refund business details */
        details?: RefundDetails$1;
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
    }
    interface PreviewRefundEmailResponse {
        emailPreview?: string;
    }
    interface PreviewCancelEmailRequest {
        orderId: string;
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
    }
    interface PreviewCancelEmailResponse {
        emailPreview?: string;
    }
    interface PreviewCancelRefundEmailRequest {
        orderId: string;
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
        /** Refund amount */
        refundAmount?: Price$1;
    }
    interface PreviewCancelRefundEmailResponse {
        emailPreview?: string;
    }
    interface PreviewBuyerPaymentsReceivedEmailRequest {
    }
    interface PreviewBuyerPaymentsReceivedEmailResponse {
        emailPreview?: string;
    }
    interface PreviewBuyerConfirmationEmailRequest {
    }
    interface PreviewBuyerConfirmationEmailResponse {
        emailPreview?: string;
    }
    interface PreviewBuyerPickupConfirmationEmailRequest {
    }
    interface PreviewBuyerPickupConfirmationEmailResponse {
        emailPreview?: string;
    }
    interface PreviewShippingConfirmationEmailRequest {
    }
    interface PreviewShippingConfirmationEmailResponse {
        emailPreview?: string;
    }
    interface PreviewResendDownloadLinksEmailRequest {
    }
    interface PreviewResendDownloadLinksEmailResponse {
        emailPreview?: string;
    }
    interface PreparePaymentCollectionRequest {
        /** Ecom order ID. */
        ecomOrderId: string;
        /** Amount to collect */
        amount: Price$1;
        /**
         * Optional parameter. When present, payment collection will be performed using given payment gateway order.
         * Existing payment gateway order will be updated with a new amount.
         * When parameter is absent, new payment gateway order will be created and used for payment collection.
         */
        paymentGatewayOrderId?: string | null;
    }
    interface PreparePaymentCollectionResponse {
        /** Payment gateway order id which is associated with given payment */
        paymentGatewayOrderId?: string;
    }
    interface GetPaymentCollectabilityStatusRequest {
        /** Ecom order ID. */
        ecomOrderId: string;
    }
    interface GetPaymentCollectabilityStatusResponse {
        /** Payment collectability status */
        status?: PaymentCollectabilityStatus;
        /** Collectable order amount */
        amount?: Price$1;
    }
    enum PaymentCollectabilityStatus {
        UNKNOWN = "UNKNOWN",
        COLLECTABLE = "COLLECTABLE",
        NONCOLLECTABLE_ORDER_IS_CANCELLED = "NONCOLLECTABLE_ORDER_IS_CANCELLED",
        NONCOLLECTABLE_ORDER_IS_PAID = "NONCOLLECTABLE_ORDER_IS_PAID",
        NONCOLLECTABLE_MISSING_PAYMENT_METHOD = "NONCOLLECTABLE_MISSING_PAYMENT_METHOD"
    }
    interface RecordManuallyCollectedPaymentRequest {
        /** Order ID. */
        orderId: string;
        /** Amount to be recorded as approved manual payment for given order */
        amount: Price$1;
    }
    interface RecordManuallyCollectedPaymentResponse {
    }
    interface MarkOrderAsPaidRequest {
        /** Ecom order ID. */
        ecomOrderId: string;
    }
    interface MarkOrderAsPaidResponse {
        /** Updated order. */
        order?: Order$1;
    }
    /** Triggered when the payment status of an order is updated */
    interface PaymentStatusUpdated {
        /** The order that was updated */
        order?: Order$1;
        /** The previous status (before the update) */
        previousPaymentStatus?: PaymentStatus$1;
    }
    interface BulkMarkOrdersAsPaidRequest {
        /** IDs of orders to mark as paid. */
        ecomOrderIds: string[];
    }
    interface BulkMarkOrdersAsPaidResponse {
        /**
         * Items updated by the bulk action.
         * The Order entity within the results optimistically changes its payment status to paid, however this process is async.
         */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkOrderResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata$3;
        /** Updated item. Optional - returned only if requested with `return_full_entity` set to `true`. */
        item?: Order$1;
    }
    interface ItemMetadata$3 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$7;
    }
    interface ApplicationError$7 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata$3 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface GetRefundabilityStatusRequest$1 {
        /** Order ID. */
        ecomOrderId: string;
    }
    interface GetRefundabilityStatusResponse$1 {
        /** Refundability details. */
        refundabilities?: Refundability$1[];
        /** Whether the order supports refunding per item. */
        refundablePerItem?: boolean;
    }
    interface Refundability$1 extends RefundabilityAdditionalRefundabilityInfoOneOf$1 {
        /** Reason why payment is not refundable. */
        nonRefundableReason?: NonRefundableReason$1;
        /** Reason why payment is only refundable manually. */
        manuallyRefundableReason?: ManuallyRefundableReason$1;
        /** Payment ID. */
        paymentId?: string;
        /** Payment refundability status. */
        refundabilityStatus?: RefundableStatus$1;
        /** Link to payment provider dashboard. */
        providerLink?: string | null;
    }
    /** @oneof */
    interface RefundabilityAdditionalRefundabilityInfoOneOf$1 {
        /** Reason why payment is not refundable. */
        nonRefundableReason?: NonRefundableReason$1;
        /** Reason why payment is only refundable manually. */
        manuallyRefundableReason?: ManuallyRefundableReason$1;
    }
    enum RefundableStatus$1 {
        NOT_REFUNDABLE = "NOT_REFUNDABLE",
        MANUAL = "MANUAL",
        REFUNDABLE = "REFUNDABLE"
    }
    enum NonRefundableReason$1 {
        NONE = "NONE",
        ALREADY_REFUNDED = "ALREADY_REFUNDED",
        PROVIDER_IS_DOWN = "PROVIDER_IS_DOWN",
        INTERNAL_ERROR = "INTERNAL_ERROR",
        NOT_PAID = "NOT_PAID",
        ACCESS_DENIED = "ACCESS_DENIED",
        ZERO_PRICE = "ZERO_PRICE",
        DISABLED_BY_PROVIDER = "DISABLED_BY_PROVIDER",
        PENDING_REFUND = "PENDING_REFUND",
        FORBIDDEN = "FORBIDDEN",
        TRANSACTION_NOT_FOUND = "TRANSACTION_NOT_FOUND"
    }
    enum ManuallyRefundableReason$1 {
        EXPIRED = "EXPIRED",
        NOT_SUPPORTED = "NOT_SUPPORTED",
        OFFLINE = "OFFLINE"
    }
    interface CreatePaymentGatewayOrderRequest {
        /** Ecom order ID. */
        ecomOrderId: string;
        /** Information about the user who initiated the payment. */
        chargedBy?: ChargedBy;
    }
    interface ChargedBy {
        /** ID - id of the user who initiated the payment */
        _id?: string;
        /** Full name - name of the user who initiated the payment */
        fullName?: string | null;
    }
    interface CreatePaymentGatewayOrderResponse {
        /** ID of the order created in the payment gateway */
        paymentGatewayOrderId?: string;
    }
    interface ChargeMembershipsRequest {
        /** Order ID. */
        ecomOrderId: string;
        /**
         * The member id. Do not attempt to get it from the request context, since in some cases the caller is not a member
         * but a user which is using the membership on behalf of the a member
         */
        memberId: string;
        /** List of items to be paid by memberships */
        membershipCharges?: MembershipChargeItem[];
    }
    interface MembershipChargeItem {
        /** The id of used membership */
        membershipId?: string;
        /** ID of the application providing this payment option */
        appId?: string;
        /** The name of used membership */
        membershipName?: MembershipName$5;
        /** Additional data about this membership */
        membershipAdditionalData?: Record<string, any> | null;
        /** Catalog and item reference info. */
        catalogReference?: CatalogReference$6;
        /** Properties of the service. When relevant, contains information such as date and number of participants. */
        serviceProperties?: ServiceProperties$4;
        /**
         * Usually would be the same as catalogReference.catalogItemId
         * For cases when these are not the same, this field would return the actual id of the item in the catalog
         * For example, for Wix bookings, catalogReference.catalogItemId is the booking id, and this value is being set to be the service id
         */
        rootCatalogItemId?: string | null;
        /** line item id of Checkout/Order line item */
        lineItemId?: string;
    }
    interface ServiceProperties$4 {
        /**
         * Date and time the service is to be provided, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * For example, the start time of a class.
         */
        scheduledDate?: Date;
        /** The number of people participating in the service. For example, the number of people attending a class or the number of people per hotel room. */
        numberOfParticipants?: number | null;
    }
    interface ChargeMembershipsResponse {
    }
    interface TriggerRefundRequest$1 {
        /** The order this refund related to */
        ecomOrderId: string;
        /** Refund operations information */
        payments: PaymentRefund$1[];
        /** Business model of a refund */
        details?: RefundDetails$1;
        /** Side effect details related to refund */
        sideEffects?: RefundSideEffects$1;
    }
    interface PaymentRefund$1 {
        /** Specific payment within the order to refund */
        paymentId?: string;
        /** Refund amount. Not relevant for membership refunds. */
        amount?: Price$1;
        /**
         * Whether refund is made externally and manually (on the payment provider's side)
         * When false (default), the payment gateway will be called in order to make an actual refund, and then the payment will be marked as refunded.
         * When true, the payment will only be *marked* as refunded, and no actual refund will be performed.
         */
        externalRefund?: boolean;
    }
    interface RefundSideEffects$1 {
        /** Inventory restock details as part of this refund. */
        restockInfo?: RestockInfo$1;
        /** Whether to send a refund confirmation email to the customer. */
        sendOrderRefundedEmail?: boolean;
        /** Custom message added to the refund confirmation email. */
        customMessage?: string | null;
    }
    interface RestockInfo$1 {
        /** Restock type. */
        type?: RestockType$1;
        /** Restocked line items and quantities. Only relevant for `{"type": "SOME_ITEMS"}`. */
        items?: RestockItem$1[];
    }
    enum RestockType$1 {
        NO_ITEMS = "NO_ITEMS",
        ALL_ITEMS = "ALL_ITEMS",
        SOME_ITEMS = "SOME_ITEMS"
    }
    interface RestockItem$1 {
        /** ID of the line item being restocked. */
        lineItemId?: string;
        /** Line item quantity being restocked. */
        quantity?: number;
    }
    interface TriggerRefundResponse$1 {
        /** All order's transactions after the refunds were added */
        orderTransactions?: OrderTransactions$1;
        /** Created refund ID */
        refundId?: string | null;
        /** Payment ID's that the refund execution had failed for */
        failedPaymentIds?: ItemMetadata$3[];
    }
    /** Triggered when a refund is created. */
    interface RefundCreated$1 {
        /** Updated order transactions. */
        orderTransactions?: OrderTransactions$1;
        /** ID of the created refund. */
        refundId?: string;
        /** Inventory restock details as part of this refund.. */
        restockInfo?: RestockInfo$1;
        /** Whether to send a refund confirmation email to the customer. */
        sendOrderRefundedEmail?: boolean;
        /** Custom message added to the refund confirmation email. */
        customMessage?: string | null;
        /** Refunded line items and quantities that are part of the created refund. */
        refundItems?: RefundItem$1[];
    }
    interface CalculateRefundRequest$1 {
        /** Order ID */
        ecomOrderId: string;
        /** Refunded line items and quantity */
        refundItems?: CalculateRefundItemRequest$1[];
        /** Should include shipping in refund calculation */
        refundShipping?: boolean;
    }
    interface CalculateRefundItemRequest$1 {
        /** ID of the line item being refunded */
        _id?: string;
        /** How much of that line item is being refunded */
        quantity?: number;
    }
    interface CalculateRefundResponse$1 {
        /** Total refundable amount */
        total?: Price$1;
        /** Tax cost of the order */
        tax?: Price$1;
        /** Discount given for this order */
        discount?: Price$1;
        /** Total cost of the order (without tax) */
        subtotal?: Price$1;
        /** Total shipping cost for order */
        shipping?: Price$1;
        /** Previous refund given on that order */
        previouslyRefundedAmount?: Price$1;
        /** The refundable items of that order */
        items?: CalculateRefundItemResponse$1[];
    }
    interface CalculateRefundItemResponse$1 {
        /** Line item ID */
        _id?: string;
        /** Refundable amount for requested quantity of items (price of requested quantity of items without tax and discount) */
        price?: Price$1;
    }
    interface DiffmatokyPayload$1 {
        left?: string;
        right?: string;
        compareChannel?: string;
        entityId?: string;
        errorInformation?: ErrorInformation$1;
        tags?: string[];
    }
    interface ErrorInformation$1 {
        stackTrace?: string;
    }
    interface ContinueSideEffectsFlowInLegacyData {
        storeId?: string;
        orderId?: string;
        ordersExperiments?: OrdersExperiments;
    }
    interface OrdersExperiments {
        epCommitTax?: boolean;
        moveMerchantEmailToEp?: boolean;
        moveBuyerOrderConfirmationEmailToEp?: boolean;
        producedByEpBridge?: boolean;
        enableRewrittenSideEffects?: boolean;
    }
    interface IndexingMessage$1 {
        _id?: string;
        opType?: number;
        requiredVersions?: string[];
    }
    interface GetOrderRequest {
        /** ID of the order to retrieve. */
        _id: string;
    }
    interface GetOrderResponse {
        /** The requested order. */
        order?: Order$1;
    }
    interface InternalQueryOrdersResponse {
        /** List of orders. */
        orders?: Order$1[];
        /** Details on the paged set of results returned. */
        metadata?: PlatformPagingMetadata$1;
    }
    interface QueryOrderRequest {
        /** Query options. */
        query?: PlatformQuery$1;
    }
    interface QueryOrderResponse {
        /** List of orders. */
        orders?: Order$1[];
        /** Details on the paged set of results returned. */
        metadata?: PlatformPagingMetadata$1;
    }
    interface SearchOrdersRequest {
        /** Search options. */
        search?: CursorSearch;
    }
    interface CursorSearch extends CursorSearchPagingMethodOneOf {
        /** Cursor pointing to page of results. `cursorPaging.cursor` cannot be used with 'filter' or 'sort'. */
        cursorPaging?: CursorPaging$2;
        /**
         * Filter object.
         *
         * For example, the following `filter` object will only return orders with payment statuses of paid and/or partially paid:
         * `"filter": {"paymentStatus": {"$in": ["PAID", "PARTIALLY_PAID"]}}`
         *
         * Learn more about the filter format [here](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
         */
        filter?: Record<string, any> | null;
        /**
         * Array of sort objects that specify the order in which results should be sorted.
         *
         * For example, the following `sort` array will sort by `createdDate` in descending order:
         * `"sort": [{"fieldName": "createdDate", "order":"DESC"}]`.
         *
         * Learn more about the sort format [here](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
         */
        sort?: Sorting$2[];
    }
    /** @oneof */
    interface CursorSearchPagingMethodOneOf {
        /** Cursor pointing to page of results. `cursorPaging.cursor` cannot be used with 'filter' or 'sort'. */
        cursorPaging?: CursorPaging$2;
    }
    interface SearchOrdersResponse {
        /** List of orders. */
        orders?: Order$1[];
        /** Details on the paged set of results returned. */
        metadata?: CursorPagingMetadata$1;
    }
    interface CursorPagingMetadata$1 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Cursor strings that point to the next page, previous page, or both. */
        cursors?: Cursors$2;
        /**
         * Whether there are more pages to retrieve following the current page.
         *
         * + `true`: Another page of results can be retrieved.
         * + `false`: This is the last page.
         */
        hasNext?: boolean | null;
    }
    interface CreateOrderRequest$1 {
        /** Order info. */
        order: Order$1;
    }
    interface CreateOrderResponse$1 {
        /** Newly created order. */
        order?: Order$1;
    }
    interface UpdateOrderRequest {
        /** Order to be updated. */
        order: Order$1;
    }
    interface UpdateOrderResponse {
        /** Newly created order. */
        order?: Order$1;
    }
    interface BulkUpdateOrdersRequest {
        /** Orders to be updated. */
        orders: MaskedOrder[];
        /** Set to `true` if you wish to receive back the updated orders in the response */
        returnEntity?: boolean;
    }
    interface MaskedOrder {
        /** Order to be updated. */
        order?: Order$1;
    }
    interface BulkUpdateOrdersResponse {
        /** Bulk action results. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface CommitDeltasRequest {
        /** Order id to be updated */
        _id: string;
        /**
         * Draft order Id representing this change.
         * Use this ID to get this specific draft content. call .../v1/draft-orders/{draft_order_id}/get
         */
        draftOrderId?: string;
        /** Draft order changes to be applied */
        changes: DraftOrderDiffs;
        /** Side-effects to happen after order is updated */
        commitSettings?: DraftOrderCommitSettings;
        /** Reason for edit, given by user (optional). */
        reason?: string | null;
    }
    interface DraftOrderDiffs extends DraftOrderDiffsShippingUpdateInfoOneOf {
        /** Shipping info and selected shipping option details. */
        changedShippingInfo?: ShippingInformation$2;
        /** Remove existing shipping info. */
        shippingInfoRemoved?: boolean;
        /** Added/updated/removed order line items. */
        lineItems?: V1LineItemDelta[];
        /**
         * Added/updated/removed discounts.
         * todo: set (.wix.api.maxSize). need to find it. existing : merchant can have 100 + 1 coupon + ? due to automatic discounts
         */
        appliedDiscounts?: AppliedDiscountDelta[];
        /** Added/updated/removed additional fee. */
        additionalFees?: AdditionalFeeDelta[];
        /**
         * Deprecated. Use `taxInfo` instead.
         * This field will be removed on September 30, 2024.
         * Updated Tax summary. overwrites existing tax summary.
         */
        taxSummary?: TaxSummary$4;
        /**
         * Updated order price summary. overwrites existing price summary.
         * balance will be updated automatically.
         */
        priceSummary?: PriceSummary$4;
    }
    /** @oneof */
    interface DraftOrderDiffsShippingUpdateInfoOneOf {
        /** Shipping info and selected shipping option details. */
        changedShippingInfo?: ShippingInformation$2;
        /** Remove existing shipping info. */
        shippingInfoRemoved?: boolean;
    }
    interface V1LineItemDelta extends V1LineItemDeltaDeltaOneOf {
        /** The line item was added. */
        lineItemAdded?: boolean;
        /** The line item was modified. */
        changedDetails?: ItemChangedDetails;
        /** The line item was added. */
        lineItemRemoved?: boolean;
        /** Line item ID. */
        lineItemId?: string;
        lineItem?: OrderLineItemChangedDetails;
    }
    /** @oneof */
    interface V1LineItemDeltaDeltaOneOf {
        /** The line item was added. */
        lineItemAdded?: boolean;
        /** The line item was modified. */
        changedDetails?: ItemChangedDetails;
        /** The line item was added. */
        lineItemRemoved?: boolean;
    }
    interface OrderLineItemChangedDetails {
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName$4;
        /**
         * References to the line item's origin catalog.
         * This field is empty in the case of a custom line item.
         */
        catalogReference?: CatalogReference$6;
        /** Line item quantity. */
        quantity?: number;
        /** Total discount for this line item's entire quantity. */
        totalDiscount?: Price$1;
        /** Line item description lines. Used for display purposes for the cart, checkout and order. */
        descriptionLines?: DescriptionLine$4[];
        /** Line item image. */
        image?: string;
        /** Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties$4;
        /** Item type. Either a preset type or custom. */
        itemType?: ItemType$4;
        /**
         * Fulfiller ID. Field is empty when the line item is self-fulfilled.
         *
         * To get fulfillment information, pass the order ID to [List Fulfillments For Single Order](https://www.wix.com/velo/reference/wix-ecom-backend/orderfulfillments/listfulfillmentsforsingleorder).
         */
        fulfillerId?: string | null;
        /** Line item price after line item discounts for display purposes. */
        price?: Price$1;
        /** Line item price before line item discounts for display purposes. Defaults to `price` when not provided. */
        priceBeforeDiscounts?: Price$1;
        /** Total price after all discounts and tax. */
        totalPriceAfterTax?: Price$1;
        /**
         * Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_OFFLINE` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         */
        paymentOption?: DeltaPaymentOptionType;
        /**
         * Deprecated. Use `taxInfo` instead.
         * This field will be removed on September 30, 2024.
         * Tax details for this line item.
         */
        taxDetails?: ItemTaxFullDetails$4;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription$4;
        /** Total price **after** catalog-defined discount and line item discounts. */
        lineItemPrice?: Price$1;
        /** Total price after all discounts excluding tax. */
        totalPriceBeforeTax?: Price$1;
    }
    /** Type of selected payment option for catalog item */
    enum DeltaPaymentOptionType {
        /** irrelevant */
        UNKNOWN_PAYMENT_OPTION = "UNKNOWN_PAYMENT_OPTION",
        /** The entire payment for given item will happen after the checkout. */
        FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
        /**
         * Payment for this item can only be done using a membership and must be manually redeemed in the dashboard by the site owner.
         * Note: when this option is used, price will be 0.
         */
        MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
    }
    interface ItemChangedDetails {
        /** The quantity before the change. */
        quantityBeforeChange?: number | null;
        /** The price before the change. */
        priceBeforeChange?: Price$1;
        /** The price description before the change */
        priceDescriptionBeforeChange?: PriceDescription$4;
    }
    interface AppliedDiscountDelta extends AppliedDiscountDeltaDeltaOneOf {
        editedDiscount?: AppliedDiscount$5;
        discountRemoved?: boolean;
        /** Discount id. */
        discountId?: string;
    }
    /** @oneof */
    interface AppliedDiscountDeltaDeltaOneOf {
        editedDiscount?: AppliedDiscount$5;
        discountRemoved?: boolean;
    }
    interface AdditionalFeeDelta extends AdditionalFeeDeltaDeltaOneOf {
        editedAdditionalFee?: AdditionalFee$4;
        additionalFeeRemoved?: boolean;
        /** Additional fee id. */
        additionalFeeId?: string;
    }
    /** @oneof */
    interface AdditionalFeeDeltaDeltaOneOf {
        editedAdditionalFee?: AdditionalFee$4;
        additionalFeeRemoved?: boolean;
    }
    interface DraftOrderCommitSettings {
        /** If false, do not send notifications to buyer. Default is true. */
        sendNotificationsToBuyer?: boolean | null;
        /** If false, do not send notifications to business. Default is true. */
        sendNotificationsToBusiness?: boolean | null;
        /** If false,do not add activities to the order. Default is true. */
        addActivitiesToOrder?: boolean | null;
        /** If false, do not send mails to custom fulfillers in case of a change of shippable items fulfilled by custom fulfillers. Default is true. */
        sendNotificationsToCustomFulfillers?: boolean | null;
        /** Inventory changes to be applied. Either to restock, or decrease. */
        inventoryUpdates?: InventoryUpdateDetails[];
    }
    interface InventoryUpdateDetails {
        /** Action to be applied - decrease or restock */
        actionType?: InventoryAction;
        /** Order line item id */
        lineItemId?: string;
        /** The amount to be increased or restocked */
        quantityChange?: number;
    }
    enum InventoryAction {
        /** Restock inventory */
        RESTOCK = "RESTOCK",
        /** Decrease inventory. Without failing on negative inventory. */
        DECREASE = "DECREASE"
    }
    interface CommitDeltasResponse {
        /** Order after deltas are applied */
        order?: Order$1;
    }
    /** Triggered when order is edited by draftOrders */
    interface OrderDeltasCommitted {
        /** The order after committed changes. */
        order?: Order$1;
        /** Draft order Id representing this change. */
        draftOrderId?: string;
        /** Applied changes. */
        changes?: CommittedDiffs;
        /** Side-effects requested to happen as a result of this edit. */
        commitSettings?: DraftOrderCommitSettings;
        /**
         * Date and time when order deltas were committed.
         * @readonly
         */
        commitDate?: Date;
    }
    interface CommittedDiffs extends CommittedDiffsShippingUpdateInfoOneOf {
        /** Shipping info and selected shipping option details. */
        changedShippingInfo?: ShippingInformation$2;
        /** Remove existing shipping info. */
        shippingInfoRemoved?: boolean;
        /** Added/updated/removed order line items. */
        lineItems?: LineItemDelta[];
        /**
         * Added/updated/removed discounts.
         * todo: set (.wix.api.maxSize). need to find it. existing : merchant can have 100 + 1 coupon + ? due to automatic discounts
         */
        appliedDiscounts?: AppliedDiscountDelta[];
        /** Added/updated/removed additional fee. */
        additionalFees?: AdditionalFeeDelta[];
    }
    /** @oneof */
    interface CommittedDiffsShippingUpdateInfoOneOf {
        /** Shipping info and selected shipping option details. */
        changedShippingInfo?: ShippingInformation$2;
        /** Remove existing shipping info. */
        shippingInfoRemoved?: boolean;
    }
    interface LineItemDelta extends LineItemDeltaDeltaOneOf {
        lineItemAdded?: boolean;
        changedDetails?: ItemChangedDetails;
        lineItemRemoved?: OrderLineItemChangedDetails;
        /** Line item ID. */
        lineItemId?: string;
    }
    /** @oneof */
    interface LineItemDeltaDeltaOneOf {
        lineItemAdded?: boolean;
        changedDetails?: ItemChangedDetails;
        lineItemRemoved?: OrderLineItemChangedDetails;
    }
    interface ArchiveOrderRequest {
        /** Order ID. */
        _id: string;
    }
    interface ArchiveOrderResponse {
        /** Archived order. */
        order?: Order$1;
    }
    interface BulkArchiveOrdersRequest {
        /** IDs of orders to archive. */
        ids: string[];
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface BulkArchiveOrdersResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkArchiveOrdersByFilterRequest {
        /** Filter object. Learn more about supported filters [here](https://bo.wix.com/wix-docs/rest/ecommerce/orders/filter-and-sort). */
        filter: Record<string, any> | null;
    }
    interface BulkArchiveOrdersByFilterResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface UnArchiveOrderRequest {
        /** Order ID. */
        _id: string;
    }
    interface UnArchiveOrderResponse {
        /** Unarchived order. */
        order?: Order$1;
    }
    interface BulkUnArchiveOrdersRequest {
        /** IDs or orders to unarchive. */
        ids: string[];
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface BulkUnArchiveOrdersResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkUnArchiveOrdersByFilterRequest {
        /** Filter object. Learn more about supported filters [here](https://bo.wix.com/wix-docs/rest/ecommerce/orders/filter-and-sort). */
        filter: Record<string, any> | null;
    }
    interface BulkUnArchiveOrdersByFilterResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface UpdateBuyerInfoRequest {
        /**
         * Order ID.
         * @readonly
         */
        _id: string;
        /** Buyer info. */
        buyerInfo?: BuyerInfoUpdate;
    }
    interface BuyerInfoUpdate {
        /** Contact ID. */
        contactId?: string | null;
        /** Email associated with the buyer. */
        email?: string | null;
    }
    interface UpdateBuyerInfoResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface UpdateBuyerEmailRequest {
        /** @readonly */
        _id: string;
        email?: string | null;
    }
    interface UpdateBuyerEmailResponse {
        order?: Order$1;
    }
    interface UpdateOrderShippingAddressRequest {
        /** Order ID. */
        _id: string;
        /** Shipping address and contact details to be updated. */
        shippingAddress: AddressWithContact$4;
    }
    interface UpdateOrderShippingAddressResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface UpdateBillingContactDetailsRequest {
        /**
         * Order ID.
         * @readonly
         */
        _id: string;
        /** Contact details. */
        addressContactDetails?: FullAddressContactDetails$4;
    }
    interface UpdateBillingContactDetailsResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface UpdateOrderLineItemRequest {
        /** Order ID */
        _id: string;
        /** Order line item to update */
        lineItem: OrderLineItem;
    }
    interface UpdateOrderLineItemResponse {
        /** Updated order data */
        order?: Order$1;
    }
    interface UpdateOrderLineItemsRequest {
        /** Order ID */
        orderId: string;
        /** Order line items to update */
        lineItems: MaskedOrderLineItem[];
    }
    interface MaskedOrderLineItem {
        /** Order line item to update */
        lineItem?: OrderLineItem;
    }
    interface UpdateOrderLineItemsResponse {
        /** Updated order data */
        order?: Order$1;
    }
    interface AddInternalActivityRequest {
        /** Order ID. */
        _id: string;
        /** Activity info. */
        activity: InternalActivity;
    }
    interface InternalActivity extends InternalActivityContentOneOf {
        /** Order refunded. */
        orderRefunded?: OrderRefunded$1;
        /** Order placed. */
        orderPlaced?: OrderPlaced;
        /** Order paid. Either by the store owner (for offline orders), or when an online transaction was confirmed. */
        orderPaid?: OrderPaid;
        /** Order shipping status set as fulfilled. */
        orderFulfilled?: OrderFulfilled;
        /** Order shipping status set as not fulfilled. */
        orderNotFulfilled?: OrderNotFulfilled;
        /** Order canceled. */
        orderCanceled?: OrderCanceled;
        /** Download link was sent (relevant for orders with digital line items). */
        downloadLinkSent?: DownloadLinkSent;
        /** Shipping tracking number added to order. */
        trackingNumberAdded?: TrackingNumberAdded;
        /** Shipping tracking number was edited. */
        trackingNumberEdited?: TrackingNumberEdited;
        /** Shipping tracking link added to order. */
        trackingLinkAdded?: TrackingLinkAdded;
        /** An email confirmation of order shipment was sent. */
        shippingConfirmationEmailSent?: ShippingConfirmationEmailSent;
        /** Invoice was added to order. */
        invoiceAdded?: InvoiceAdded;
        /** Invoice sent to customer via email. */
        invoiceSent?: InvoiceSent;
        /** Email sent to fulfiller. */
        fulfillerEmailSent?: FulfillerEmailSent;
        /** Shipping address was updated. */
        shippingAddressEdited?: ShippingAddressEdited;
        /** Order email was updated. */
        emailEdited?: EmailEdited;
        /** Email notification for pickup sent. */
        pickupReadyEmailSent?: PickupReadyEmailSent;
        /** Order created as a result of items exchange. */
        orderCreatedFromExchange?: OrderCreatedFromExchange;
        /** New exchange order created. */
        newExchangeOrderCreated?: NewExchangeOrderCreated;
        /** Order partially paid. During the checkout for orders with deposit items. */
        orderPartiallyPaid?: OrderPartiallyPaid;
        /** Draft order changes applied */
        draftOrderChangesApplied?: DraftOrderChangesApplied;
        /** Payment method is saved for order */
        savedPaymentMethod?: SavedPaymentMethod;
        /**
         * Internal activity ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Internal activity author's email.
         * @readonly
         */
        authorEmail?: string | null;
        /**
         * Internal activity creation date and time.
         * @readonly
         */
        _createdDate?: Date;
    }
    /** @oneof */
    interface InternalActivityContentOneOf {
        /** Order refunded. */
        orderRefunded?: OrderRefunded$1;
        /** Order placed. */
        orderPlaced?: OrderPlaced;
        /** Order paid. Either by the store owner (for offline orders), or when an online transaction was confirmed. */
        orderPaid?: OrderPaid;
        /** Order shipping status set as fulfilled. */
        orderFulfilled?: OrderFulfilled;
        /** Order shipping status set as not fulfilled. */
        orderNotFulfilled?: OrderNotFulfilled;
        /** Order canceled. */
        orderCanceled?: OrderCanceled;
        /** Download link was sent (relevant for orders with digital line items). */
        downloadLinkSent?: DownloadLinkSent;
        /** Shipping tracking number added to order. */
        trackingNumberAdded?: TrackingNumberAdded;
        /** Shipping tracking number was edited. */
        trackingNumberEdited?: TrackingNumberEdited;
        /** Shipping tracking link added to order. */
        trackingLinkAdded?: TrackingLinkAdded;
        /** An email confirmation of order shipment was sent. */
        shippingConfirmationEmailSent?: ShippingConfirmationEmailSent;
        /** Invoice was added to order. */
        invoiceAdded?: InvoiceAdded;
        /** Invoice sent to customer via email. */
        invoiceSent?: InvoiceSent;
        /** Email sent to fulfiller. */
        fulfillerEmailSent?: FulfillerEmailSent;
        /** Shipping address was updated. */
        shippingAddressEdited?: ShippingAddressEdited;
        /** Order email was updated. */
        emailEdited?: EmailEdited;
        /** Email notification for pickup sent. */
        pickupReadyEmailSent?: PickupReadyEmailSent;
        /** Order created as a result of items exchange. */
        orderCreatedFromExchange?: OrderCreatedFromExchange;
        /** New exchange order created. */
        newExchangeOrderCreated?: NewExchangeOrderCreated;
        /** Order partially paid. During the checkout for orders with deposit items. */
        orderPartiallyPaid?: OrderPartiallyPaid;
        /** Draft order changes applied */
        draftOrderChangesApplied?: DraftOrderChangesApplied;
        /** Payment method is saved for order */
        savedPaymentMethod?: SavedPaymentMethod;
    }
    /** Order placed */
    interface OrderPlaced {
    }
    /** Order marked as paid, either by the store owner (for offline orders), or when an online transaction was confirmed */
    interface OrderPaid {
    }
    /** Order shipping status set as fulfilled */
    interface OrderFulfilled {
    }
    /** Order shipping status set as not fulfilled */
    interface OrderNotFulfilled {
    }
    /** Order canceled */
    interface OrderCanceled {
    }
    /** A download link was sent (relevant for orders with digital line items) */
    interface DownloadLinkSent {
    }
    /** Shipping tracking number was set */
    interface TrackingNumberAdded {
    }
    /** Shipping tracking number was edited */
    interface TrackingNumberEdited {
    }
    /** Shipping tracking link was set */
    interface TrackingLinkAdded {
    }
    /** An email confirmation of order shipment was sent */
    interface ShippingConfirmationEmailSent {
    }
    /** Invoice was set in the order */
    interface InvoiceAdded {
    }
    /** Invoice sent to customer via email */
    interface InvoiceSent {
    }
    /** Email was sent to fulfiller */
    interface FulfillerEmailSent {
    }
    /** Shipping address was updated */
    interface ShippingAddressEdited {
    }
    /** Order email was updated */
    interface EmailEdited {
    }
    /** An email notification for pickup was sent */
    interface PickupReadyEmailSent {
    }
    /** Order marked as partially paid when an online transaction was confirmed with partial minimal required amount of total sum */
    interface OrderPartiallyPaid {
    }
    interface AddInternalActivityResponse {
        /** Updated order. */
        order?: Order$1;
        /**
         * ID of the added internal activity.
         * Use this ID to either [update](https://bo.wix.com/wix-docs/rest/ecommerce/orders/update-activity) or [delete](https://bo.wix.com/wix-docs/rest/ecommerce/orders/delete-activity) the activity.
         */
        activityId?: string;
    }
    interface AddActivityRequest {
        /** Order ID. */
        _id: string;
        /** Activity info. */
        activity: PublicActivity;
    }
    interface PublicActivity extends PublicActivityContentOneOf {
        /** Custom activity details. */
        customActivity?: CustomActivity;
        /** Merchant commment. */
        merchantComment?: MerchantComment;
    }
    /** @oneof */
    interface PublicActivityContentOneOf {
        /** Custom activity details. */
        customActivity?: CustomActivity;
        /** Merchant commment. */
        merchantComment?: MerchantComment;
    }
    interface AddActivityResponse {
        /** Updated order. */
        order?: Order$1;
        /**
         * ID of the added activity.
         * Use this ID to either [update](https://bo.wix.com/wix-docs/rest/ecommerce/orders/update-activity) or [delete](https://bo.wix.com/wix-docs/rest/ecommerce/orders/delete-activity) the activity.
         */
        activityId?: string;
    }
    interface AddActivitiesRequest {
        /** Order ID. */
        orderId: string;
        /** Activities to add. */
        activities: PublicActivity[];
    }
    interface AddActivitiesResponse {
        /** Updated order. */
        order?: Order$1;
        /**
         * IDs of the added activities.
         * Use this IDs to either [update](https://bo.wix.com/wix-docs/rest/ecommerce/orders/update-activities) or [delete](https://bo.wix.com/wix-docs/rest/ecommerce/orders/delete-activities) the activities.
         */
        activityIds?: string[];
    }
    interface UpdateActivityRequest {
        /** Order ID. */
        _id: string;
        /** ID of the activity to update. */
        activityId: string;
        /** Activity info. */
        activity: PublicActivity;
    }
    interface UpdateActivityResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface DeleteActivityRequest {
        /** Order ID. */
        _id: string;
        /** ID of the activity to delete. */
        activityId: string;
    }
    interface DeleteActivityResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface UpdateLineItemsDescriptionLinesRequest {
        /** Order ID. */
        _id: string;
        /** Line items. */
        lineItems: LineItemUpdate[];
    }
    interface LineItemUpdate {
        /** Line item ID. */
        lineItemId?: string;
        /**
         * Description lines' info.
         * If description line already exists for this name, it will be replaced.
         */
        descriptionLines?: DescriptionLine$4[];
    }
    interface UpdateLineItemsDescriptionLinesResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface MarkOrderAsSeenByHumanRequest {
        /** Order ID. */
        _id: string;
    }
    interface MarkOrderAsSeenByHumanResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface CancelOrderRequest {
        /** Order ID. */
        _id: string;
        /** Whether to send an order canceled email to the buyer. */
        sendOrderCanceledEmail?: boolean;
        /** Custom note to be added to the email (optional). */
        customMessage?: string | null;
        /** Whether to restock all items in the order. This will only apply to products in the Wix Stores inventory. */
        restockAllItems?: boolean;
    }
    interface CancelOrderResponse {
        /** Canceled order. */
        order?: Order$1;
    }
    interface OrderCanceledEventOrderCanceled {
        /** The order that was cancelled */
        order?: Order$1;
        /** Should restock all items on that order */
        restockAllItems?: boolean;
        /** Should send a confirmation mail to the customer */
        sendOrderCanceledEmail?: boolean;
        /** Personal note added to the email */
        customMessage?: string | null;
    }
    interface MarkAsFulfilledRequest {
        /** Order ID. */
        _id: string;
    }
    interface MarkAsFulfilledResponse {
        /** Updated order. */
        order?: Order$1;
    }
    /** Triggered when the fulfillment status of an order is updated */
    interface FulfillmentStatusUpdated {
        /** The order that was updated */
        order?: Order$1;
        /** The previous status (before the update) */
        previousFulfillmentStatus?: FulfillmentStatus$2;
        /** the new status (after the update) */
        newFulfillmentStatus?: FulfillmentStatus$2;
        /** the action that caused this update */
        action?: string;
    }
    interface BulkMarkAsFulfilledRequest {
        /** IDs of orders to be marked as fulfilled. */
        ids: string[];
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface BulkMarkAsFulfilledResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkMarkAsFulfilledByFilterRequest {
        /** Filter object. Learn more about supported filters [here](https://bo.wix.com/wix-docs/rest/ecommerce/orders/filter-and-sort). */
        filter: Record<string, any> | null;
    }
    interface BulkMarkAsFulfilledByFilterResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface MarkAsUnfulfilledRequest {
        /** Order ID. */
        _id: string;
    }
    interface MarkAsUnfulfilledResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface BulkMarkAsUnfulfilledRequest {
        /** IDs of orders to be marked as not fulfilled. */
        ids: string[];
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface BulkMarkAsUnfulfilledResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkMarkAsUnfulfilledByFilterRequest {
        /** Filter object. Learn more about supported filters [here](https://bo.wix.com/wix-docs/rest/ecommerce/orders/filter-and-sort). */
        filter: Record<string, any> | null;
    }
    interface BulkMarkAsUnfulfilledByFilterResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface V1MarkOrderAsPaidRequest {
        /** Order ID. */
        _id: string;
    }
    interface V1MarkOrderAsPaidResponse {
        /** Updated order. */
        order?: Order$1;
    }
    interface V1BulkMarkOrdersAsPaidRequest {
        /** IDs of orders to mark as paid. */
        ids: string[];
    }
    interface V1BulkMarkOrdersAsPaidResponse {
        /**
         * Items updated by the bulk action.
         * The Order entity within the results optimistically changes its payment status to paid, however this process is async.
         */
        results?: BulkOrderResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface V1CreatePaymentGatewayOrderRequest {
        /** eCom Order ID */
        ecomOrderId: string;
    }
    interface V1CreatePaymentGatewayOrderResponse {
        /** ID of the order created in the payment gateway */
        paymentGatewayOrderId?: string;
    }
    interface GetShipmentsRequest {
        _id: string;
    }
    interface GetShipmentsResponse {
        shipmentIds?: string[];
    }
    interface AggregateOrdersRequest {
        /** Filter applied to original data */
        filter?: Record<string, any> | null;
        /** This is an object defining aggregation itself */
        aggregation: Record<string, any> | null;
        /**
         * Optional custom separator string that can be used to override default separator value '|'
         * for hierarchical responses of multifaceted aggregation requests like:
         * '{"aggregation": {"example_request_key": {"$count" : ["deliveryMethod", "shippingRegion"]}}}'
         * with example response for default '|' separator like:
         * '{"aggregates" :{"example_request_key": {"(Mail|Region 1)": 5, "(Pickup|Region 2)": 10}}}'
         */
        hierarchySeparatorOverride?: string | null;
    }
    interface AggregateOrdersResponse {
        aggregates?: Record<string, any> | null;
    }
    interface DecrementItemsQuantityRequest {
        /** Order ID */
        _id: string;
        /** Which items to decrement, and how much to decrement from each one */
        decrementData: DecrementData[];
    }
    interface DecrementData {
        /** ID of the line item being decremented. */
        lineItemId?: string;
        /** Line item quantity being decremented. */
        decrementBy?: number;
        /** Whether to restock the line item (triggers inventory update). */
        restock?: boolean;
    }
    interface DecrementItemsQuantityResponse {
        /** Updated order data */
        order?: Order$1;
    }
    /** Triggered when order items are marked as restocked */
    interface OrderItemsRestocked {
        /** The order which items were restocked */
        order?: Order$1;
        /** Restocked items and quantities */
        restockItems?: V1RestockItem[];
    }
    interface V1RestockItem {
        /** ID of the line item being restocked. */
        lineItemId?: string;
        /** Line item quantity being restocked. */
        quantity?: number;
    }
    interface BulkUpdateOrderTagsRequest {
        /** IDs of orders to update tags for. */
        orderIds: string[];
        /** Tags to be added to orders */
        assignTags?: Tags;
        /** Tags to be removed from orders */
        unassignTags?: Tags;
    }
    interface BulkUpdateOrderTagsResponse {
        results?: BulkUpdateOrderTagsResult[];
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkUpdateOrderTagsResult {
        itemMetadata?: ItemMetadata$3;
    }
    /** Triggered when the the order status changes to approved */
    interface OrderApproved {
        /** The order that was updated */
        order?: Order$1;
    }
    interface Task {
        key?: TaskKey;
        executeAt?: Date;
        payload?: string | null;
    }
    interface TaskKey {
        appId?: string;
        instanceId?: string;
        subjectId?: string | null;
    }
    interface TaskAction extends TaskActionActionOneOf {
        complete?: Complete;
        cancel?: Cancel;
        reschedule?: Reschedule;
    }
    /** @oneof */
    interface TaskActionActionOneOf {
        complete?: Complete;
        cancel?: Cancel;
        reschedule?: Reschedule;
    }
    interface Complete {
    }
    interface Cancel {
    }
    interface Reschedule {
        executeAt?: Date;
        payload?: string | null;
    }
    interface InvoiceSentEvent {
        _id?: IdAndVersion;
        /** @readonly */
        data?: InvoiceFields;
        /** @readonly */
        status?: InvoiceStatus;
    }
    interface IdAndVersion {
        _id?: string | null;
        version?: number | null;
    }
    interface InvoiceFields {
        /** The invoice number allocated the invoice by the server. The number is limited to at most 11 digits. */
        number?: string | null;
        /** The invoice 3-letter currency code in [ISO-4217 alphabetic](https://www.iso.org/iso-4217-currency-codes.html) format. */
        currencyCode?: string | null;
        /** The invoice customer. The customer must be a contact of the site, with an email. */
        customer?: Customer;
        /**
         * Invoice dates: issue date and due date are mandatory and provided when the invoice is created.
         * Last seen date is the optional date when the invoice was last seen be UoU.
         */
        dates?: InvoiceDates;
        /**
         * Line items containing the details of the products or services relevant to the invoice, with their name, prices,
         * and quantity. There must be at least one line item on the invoice.
         */
        lineItems?: LineItems;
        /**
         * Locale of the invoice, containing the language.
         * This field is not mandatory but is used for display purposes, to determine the appearance of numbers and dates
         * on the invoice.
         */
        locale?: Locale;
        /**
         * The totals on the invoice.
         * The totals.subtotal, totals.total and totals.taxed_amount are calculated by the server based on the line items.
         * Alternatively, these fields can be provided in the invoice creation request, in this case, these values are fixed.
         * The totals contain fees and a discount, that apply to the invoice.
         */
        totals?: TotalPrice;
        /** An optional discount on the invoice. */
        discount?: Discount$3;
        /** The taxes of the invoice. */
        taxes?: CalculatedTaxes;
        /** The payments on the invoice. The invoice has status paid if its payments cover the invoice total. */
        payments?: Payments;
        /** Invoice metadata */
        metaData?: MetaData;
        /** Not used */
        creationAdditional_BIInformation?: string | null;
        /**
         * The balance and amount paid on the invoice.
         * This read-only field is calculated based on the invoice totals and payments.
         * @readonly
         */
        dynamicTotals?: InvoiceDynamicPriceTotals;
        /** The invoice title */
        title?: string | null;
        /** Invoice custom fields */
        customFields?: CustomFieldValue[];
        /** Not used */
        designTemplateId?: string | null;
        /** Not used */
        createOrder?: boolean | null;
        /** The optional deposit of the invoice */
        deposit?: Deposit;
        /** Associated checkout for this invoice */
        ecomCheckoutId?: string | null;
    }
    interface Customer {
        contactId?: string | null;
        name?: string | null;
        email?: Email;
        address?: QuotesAddress;
        phone?: Phone;
        company?: Company;
        firstName?: string | null;
        lastName?: string | null;
        billingAddress?: CommonAddress;
        shippingAddress?: CommonAddress;
    }
    interface Email {
        address?: string;
    }
    interface QuotesAddress {
        street?: string | null;
        city?: string | null;
        zip?: string | null;
        state?: string | null;
        country?: string | null;
        /** @readonly */
        description?: AddressDescription;
    }
    interface AddressDescription {
        content?: string;
        placement?: Placement;
    }
    enum Placement {
        Unknown = "Unknown",
        Replace = "Replace",
        Before = "Before",
        After = "After"
    }
    interface Phone {
        number?: string;
    }
    interface Company {
        name?: string;
        _id?: string | null;
    }
    /** Physical address */
    interface CommonAddress extends CommonAddressStreetOneOf {
        /** Street name and number. */
        streetAddress?: StreetAddress$4;
        /** Main address line, usually street and number as free text. */
        addressLine1?: string | null;
        /** Country code. */
        country?: string | null;
        /** Subdivision shorthand. Usually, a short code (2 or 3 letters) that represents a state, region, prefecture, or province. e.g. NY */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Zip/postal code. */
        postalCode?: string | null;
        /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
        addressLine2?: string | null;
    }
    /** @oneof */
    interface CommonAddressStreetOneOf {
        /** Street name and number. */
        streetAddress?: StreetAddress$4;
        /** Main address line, usually street and number as free text. */
        addressLine?: string | null;
    }
    interface Subdivision {
        /** Short subdivision code. */
        code?: string;
        /** Subdivision full name. */
        name?: string;
    }
    enum SubdivisionType {
        UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
        /** State */
        ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
        /** County */
        ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
        /** City/town */
        ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
        /** Neighborhood/quarter */
        ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
        /** Street/block */
        ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
        /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
        COUNTRY = "COUNTRY"
    }
    /** Subdivision Concordance values */
    interface StandardDetails {
        /** subdivision iso-3166-2 code according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). e.g. US-NY, GB-SCT, NO-30 */
        iso31662?: string | null;
    }
    interface InvoiceDates {
        /** use UTC midnight date to set the issue date according to the site time zone */
        issueDate?: Date;
        /** use UTC midnight date to set the due date according to the site time zone */
        dueDate?: Date;
        /** <a href="http://joda-time.sourceforge.net/timezones.html">Valid time zones</a> */
        timeZoneCode?: string | null;
        /**
         * ignored in request use in response to get the site time zone
         * @readonly
         */
        lastSeenDate?: Date;
    }
    interface LineItems {
        lineItems?: LineItem$6[];
    }
    interface LineItem$6 {
        _id?: string;
        name?: string;
        description?: string | null;
        price?: BigDecimalWrapper;
        taxedTotal?: BigDecimalWrapper;
        quantity?: BigDecimalWrapper;
        taxes?: LineItemTax[];
        /** The source of the line item */
        source?: Source;
        /** The line-item level metadata. */
        metadata?: LineItemMetaData;
    }
    interface BigDecimalWrapper {
        serializedValue?: number;
    }
    interface LineItemTax {
        name?: string;
        rate?: BigDecimalWrapper;
        code?: string | null;
    }
    interface Source {
        /**
         * Source app or service ID.
         * @readonly
         */
        sourceId?: string;
        /**
         * App or service type.
         * @readonly
         */
        sourceType?: SourceType;
    }
    enum SourceType {
        UNKNOWN_SOURCE_TYPE = "UNKNOWN_SOURCE_TYPE",
        WIX_APP = "WIX_APP",
        EXTERNAL = "EXTERNAL",
        ADMIN = "ADMIN",
        OTHER = "OTHER"
    }
    interface LineItemMetaData {
        metadata?: Record<string, string>;
    }
    interface Locale {
        /** ISO 639 alpha-2 or alpha-3 language code, or a language subtag */
        language?: string;
        /** An ISO 3166 alpha-2 country code or a UN M.49 numeric-3 area code. */
        country?: string | null;
        invariant?: string | null;
    }
    interface TotalPrice {
        /** the subtotal of the line items without the tax reduction */
        subtotal?: BigDecimalWrapper;
        /** the total price taking into account the itemized fees and the taxes */
        total?: BigDecimalWrapper;
        fees?: ItemizedFee[];
        discountAmount?: BigDecimalWrapper;
        taxedAmount?: BigDecimalWrapper;
    }
    interface ItemizedFee {
        name?: string;
        price?: BigDecimalWrapper;
    }
    interface Discount$3 extends DiscountOneDiscountTypeOneOf {
        /** Discount as percentage value. */
        percentage?: BigDecimalWrapper;
    }
    /** @oneof */
    interface DiscountOneDiscountTypeOneOf {
        /** Discount as percentage value. */
        percentage?: BigDecimalWrapper;
    }
    interface CalculatedTaxes {
        /** consider calculated or not - cannot enforce set */
        taxes?: CalculatedTax[];
    }
    interface CalculatedTax {
        name?: string;
        rate?: BigDecimalWrapper;
        /** the costs on which the taxes are applied */
        taxable?: BigDecimalWrapper;
        /** the taxes as a result of the */
        taxed?: BigDecimalWrapper;
        code?: string | null;
    }
    interface Payments {
        payments?: InvoicesPayment[];
    }
    interface InvoicesPayment {
        /** document */
        _id?: string;
        type?: string;
        amount?: BigDecimalWrapper;
        date?: Date;
        /**
         * The orderId of the order in cashier associated with the payment.
         * This field is populated for external payments that are charged by invoices via AddPayment endpoint.
         */
        orderId?: string | null;
        /**
         * The transactionId corresponding to the orderId of the payment which are returned by cashier.
         * This field is populated for external payments that are charged by invoices via AddPayment endpoint as well.
         */
        transactionId?: string | null;
    }
    interface MetaData {
        notes?: string | null;
        legalTerms?: string | null;
        sourceUrl?: string | null;
        sourceProperties?: Record<string, string>;
        source?: string | null;
        sourceRefId?: string | null;
        /** Optional indicator whether to allow editing of the invoice by other applications other than the source. Default is true. */
        allowEditByOthers?: boolean | null;
    }
    interface InvoiceDynamicPriceTotals {
        paidAmount?: BigDecimalWrapper;
        balance?: BigDecimalWrapper;
    }
    /**
     * A custom field value is used to add additional data to a financial document or to a financial document template.
     * The custom field value may be based on a custom field definition.
     */
    interface CustomFieldValue {
        /**
         * The unique id of the custom field value
         * @readonly
         */
        _id?: string | null;
        /** The display name of the custom field value */
        displayName?: string;
        /** The optional namespace of the custom field value. This field may be used to indicate intended usage or source. */
        namespace?: string | null;
        /** The group of the custom field indicates its intended placement in the financial document */
        group?: CustomFieldGroup;
        /** The value of the custom field */
        value?: Value;
        /** The optional key of the custom field definition on which the custom field value is based */
        originCustomFieldKey?: string | null;
    }
    enum CustomFieldGroup {
        UNKNOWN_CUSTOM_FIELD_GROUP = "UNKNOWN_CUSTOM_FIELD_GROUP",
        BUSINESS_DETAILS = "BUSINESS_DETAILS",
        CUSTOMER_DETAILS = "CUSTOMER_DETAILS",
        DOCUMENT = "DOCUMENT",
        FOOTER = "FOOTER",
        OTHER = "OTHER"
    }
    interface Value {
        value?: string;
        valueType?: ValueType;
    }
    enum ValueType {
        UNKNOWN_VALUE_TYPE = "UNKNOWN_VALUE_TYPE",
        STRING = "STRING",
        DATE = "DATE",
        BOOLEAN = "BOOLEAN",
        NUMBER = "NUMBER"
    }
    interface Deposit {
        /** The flat amount of the deposit. The flat amount of the deposit must be less than the invoice total. */
        flatAmount?: string;
        /**
         * The read-only percentage value of the deposit.
         * It is computed according to the flat_amount and the invoice total and is rounded to 2 digits precision.
         * @readonly
         */
        percentage?: string;
        /** The type of the deposit. The default is FLAT. */
        type?: DepositType;
    }
    enum DepositType {
        UNKNOWN = "UNKNOWN",
        FLAT = "FLAT",
        PERCENTAGE = "PERCENTAGE"
    }
    /**
     * InvoiceStatus allowed transitions based on current status:
     * Draft -> Deleted, Paid, Partially Paid, Sent
     * Sent -> Draft, Deleted, Void, Paid, Partially Paid, Processing, (Overdue)
     * Processing -> PartiallyPaid, Paid, Sent
     * Paid -> Void
     * PartiallyPaid -> Void, (PartialAndOverdue)
     * Void -> Deleted
     * Deleted
     */
    enum InvoiceStatus {
        Draft = "Draft",
        Sent = "Sent",
        Processing = "Processing",
        Paid = "Paid",
        Overdue = "Overdue",
        Void = "Void",
        Deleted = "Deleted",
        PartiallyPaid = "PartiallyPaid",
        PartialAndOverdue = "PartialAndOverdue"
    }
    interface TriggerSideEffectsFromLegacyData {
        storeId?: string;
        orderId?: string;
        ordersExperiments?: OrdersExperiments;
    }
    interface QueryOrdersForMetasiteOptions {
        /** paginated internal orders query request */
        internalQueryOrdersRequest?: InternalQueryOrdersRequest;
    }
    interface GetOrderForMetasiteIdentifiers {
        /** meta site Id for EP order to retrieve */
        metasiteId: string;
        /** Order Id for EP order to retrieve */
        orderId: string;
    }
    interface ListOrderTransactionsForMetasiteIdentifiers {
        /** meta site Id for EP order transactions to retrieve */
        metasiteId: string;
        /** Order Id for EP order transactions to retrieve */
        orderId: string;
    }
    interface TriggerReindexOptions {
        orderIds?: string[];
    }
    interface BulkSendBuyerPickupConfirmationEmailsOptions {
        /** IDs of orders to send pickup emails for. */
        orderIds?: string[];
    }
    interface BulkSendBuyerShippingConfirmationEmailsOptions {
        /** IDs of orders to send pickup emails for. */
        orderIds?: string[];
    }
    interface SendCancelRefundEmailOptions {
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
        /** Refund amount */
        refundAmount: Price$1;
    }
    interface PreviewRefundEmailOptions {
        /** Refund amount */
        refundAmount: Price$1;
        /** Refund business details */
        details?: RefundDetails$1;
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
    }
    interface PreviewCancelEmailOptions {
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
    }
    interface PreviewCancelRefundEmailOptions {
        /** Personal note added to the email (optional) */
        customMessage?: string | null;
        /** Refund amount */
        refundAmount?: Price$1;
    }
    interface PreparePaymentCollectionOptions {
        /**
         * Optional parameter. When present, payment collection will be performed using given payment gateway order.
         * Existing payment gateway order will be updated with a new amount.
         * When parameter is absent, new payment gateway order will be created and used for payment collection.
         */
        paymentGatewayOrderId?: string | null;
    }
    interface PaymentCollectionCreatePaymentGatewayOrderOptions {
        /** Information about the user who initiated the payment. */
        chargedBy?: ChargedBy;
    }
    interface ChargeMembershipsOptions {
        /** List of items to be paid by memberships */
        membershipCharges?: MembershipChargeItem[];
    }
    interface TriggerRefundOptions$1 {
        /** Business model of a refund */
        details?: RefundDetails$1;
        /** Side effect details related to refund */
        sideEffects?: RefundSideEffects$1;
    }
    interface CalculateRefundOptions$1 {
        /** Refunded line items and quantity */
        refundItems?: CalculateRefundItemRequest$1[];
        /** Should include shipping in refund calculation */
        refundShipping?: boolean;
    }
    /**
     * Retrieves an order.
     *
     *
     * The `getOrder()` function returns a Promise that resolves when the specified order is retrieved.
     *
     * To retrieve an order's payment and refund details, including amounts, payment methods, and payment statuses, pass the order ID to [`listTransactionsForSingleOrder( )`](https://www.wix.com/velo/reference/wix-ecom-backend/ordertransactions/listtransactionsforsingleorder).
     * @param _id - ID of the order to retrieve.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Fulfilled - The requested order.
     */
    function getOrder(_id: string): Promise<Order$1>;
    interface InternalQueryOrdersOptions {
        /** Query options. */
        query?: PlatformQuery$1;
    }
    interface QueryCursorResult$2 {
        cursors: Cursors$2;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface OrdersQueryResult extends QueryCursorResult$2 {
        items: Order$1[];
        query: OrdersQueryBuilder;
        next: () => Promise<OrdersQueryResult>;
        prev: () => Promise<OrdersQueryResult>;
    }
    interface OrdersQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        eq: (propertyName: "_id" | "number" | "_createdDate" | "_updatedDate" | "lineItems.productName.original" | "lineItems.catalogReference.catalogItemId" | "lineItems.catalogReference.appId" | "lineItems.subscriptionInfo.id" | "buyerInfo.memberId" | "buyerInfo.contactId" | "buyerInfo.email" | "paymentStatus" | "fulfillmentStatus" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "shippingInfo.title" | "shippingInfo.logistics.deliveryTime" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to" | "shippingInfo.region.name" | "status" | "archived" | "createdBy.userId" | "channelInfo.type" | "channelInfo.externalOrderId" | "seenByAHuman" | "checkoutId" | "fulfillmentStatusesAggregate.statuses", value: any) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ne: (propertyName: "_id" | "number" | "_createdDate" | "_updatedDate" | "lineItems.productName.original" | "lineItems.catalogReference.catalogItemId" | "lineItems.catalogReference.appId" | "lineItems.subscriptionInfo.id" | "buyerInfo.memberId" | "buyerInfo.contactId" | "buyerInfo.email" | "paymentStatus" | "fulfillmentStatus" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "shippingInfo.title" | "shippingInfo.logistics.deliveryTime" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to" | "shippingInfo.region.name" | "status" | "archived" | "createdBy.userId" | "channelInfo.type" | "channelInfo.externalOrderId" | "seenByAHuman" | "checkoutId" | "fulfillmentStatusesAggregate.statuses", value: any) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ge: (propertyName: "number" | "_createdDate" | "_updatedDate" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to", value: any) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        gt: (propertyName: "number" | "_createdDate" | "_updatedDate" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to", value: any) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        le: (propertyName: "number" | "_createdDate" | "_updatedDate" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to", value: any) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        lt: (propertyName: "number" | "_createdDate" | "_updatedDate" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to", value: any) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         * @documentationMaturity preview
         */
        startsWith: (propertyName: "buyerInfo.email" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "shippingInfo.logistics.deliveryTime", value: string) => OrdersQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         * @documentationMaturity preview
         */
        hasSome: (propertyName: "number" | "_createdDate" | "_updatedDate" | "buyerInfo.email" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "shippingInfo.logistics.deliveryTime" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to" | "archived" | "seenByAHuman", value: any[]) => OrdersQueryBuilder;
        /** @documentationMaturity preview */
        in: (propertyName: "_id" | "number" | "_createdDate" | "_updatedDate" | "lineItems.productName.original" | "lineItems.catalogReference.catalogItemId" | "lineItems.catalogReference.appId" | "lineItems.subscriptionInfo.id" | "buyerInfo.memberId" | "buyerInfo.contactId" | "buyerInfo.email" | "paymentStatus" | "fulfillmentStatus" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "shippingInfo.title" | "shippingInfo.logistics.deliveryTime" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to" | "shippingInfo.region.name" | "status" | "archived" | "createdBy.userId" | "channelInfo.type" | "channelInfo.externalOrderId" | "seenByAHuman" | "checkoutId" | "fulfillmentStatusesAggregate.statuses", value: any) => OrdersQueryBuilder;
        /** @documentationMaturity preview */
        exists: (propertyName: "number" | "_createdDate" | "_updatedDate" | "buyerInfo.email" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "shippingInfo.logistics.deliveryTime" | "shippingInfo.logistics.deliveryTimeSlot.from" | "shippingInfo.logistics.deliveryTimeSlot.to" | "archived" | "seenByAHuman", value: boolean) => OrdersQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        ascending: (...propertyNames: Array<"_id" | "number" | "_createdDate" | "_updatedDate" | "buyerInfo.email" | "paymentStatus" | "fulfillmentStatus" | "priceSummary.totalPrice" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "status">) => OrdersQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        descending: (...propertyNames: Array<"_id" | "number" | "_createdDate" | "_updatedDate" | "buyerInfo.email" | "paymentStatus" | "fulfillmentStatus" | "priceSummary.totalPrice" | "priceSummary.total" | "billingInfo.contactDetails.firstName" | "billingInfo.contactDetails.lastName" | "status">) => OrdersQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
         * @documentationMaturity preview
         */
        limit: (limit: number) => OrdersQueryBuilder;
        /** @param cursor - A pointer to specific record
         * @documentationMaturity preview
         */
        skipTo: (cursor: string) => OrdersQueryBuilder;
        /** @documentationMaturity preview */
        find: () => Promise<OrdersQueryResult>;
    }
    /**
     * Retrieves a list of orders, given the provided paging, filtering, and sorting.
     *
     *
     * Search Orders runs with these defaults, which you can override:
     *
     * - `createdDate` is sorted in `DESC` order
     * - `cursorPaging.limit` is `100`
     * - `filter: {"status": {"$ne": "INITIALIZED"}}` - other order statuses can be queried, but orders with `status: "INITIALIZED"` are never returned
     *
     * For field support for filters and sorting, see [Orders: Supported Filters and Sorting](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/orders/supported-filters-and-sorting).
     *
     * To learn about working with _Search_ endpoints, see
     * [API Query Language](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language), and
     * [Sorting and Paging](https://dev.wix.com/docs/rest/articles/getting-started/sorting-and-paging).
     * @public
     * @documentationMaturity preview
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function searchOrders(options?: SearchOrdersOptions): Promise<SearchOrdersResponse>;
    interface SearchOrdersOptions {
        /** Search options. */
        search?: CursorSearch;
    }
    /**
     * Creates an order.
     *
     *
     * The `createOrder()` function returns a Promise that resolves when the order is created.
     *
     * > **Notes:**
     * > + If an item is digital - `lineItems[i].itemType.preset: DIGITAL` - then `lineItems[i].digitalFile` must be provided.
     * > + If `lineItems[i].id` is passed, it must be either a valid GUID, or empty.
     * @param order - Order info.
     * @public
     * @requiredField order
     * @requiredField order.billingInfo.contactDetails
     * @requiredField order.billingInfo.contactDetails.firstName
     * @requiredField order.channelInfo
     * @requiredField order.lineItems
     * @requiredField order.lineItems.catalogReference.appId
     * @requiredField order.lineItems.catalogReference.catalogItemId
     * @requiredField order.lineItems.descriptionLines.name
     * @requiredField order.lineItems.itemType
     * @requiredField order.lineItems.price
     * @requiredField order.lineItems.productName
     * @requiredField order.lineItems.productName.original
     * @requiredField order.lineItems.quantity
     * @requiredField order.lineItems.subscriptionInfo.subscriptionSettings.interval
     * @requiredField order.priceSummary
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Newly created order.
     */
    function createOrder$1(order: Order$1): Promise<Order$1>;
    /**
     * Updates an order.
     *
     *
     * The `updateOrder()` function returns a Promise that resolves when the specified order's information is updated.
     *
     * Currently, the following fields can be updated:
     * + `order.buyerInfo.email`
     * + `order.recipientInfo.address`
     * + `order.recipientInfo.contactDetails`
     * + `order.shippingInfo.logistics.shippingDestination.address`
     * + `order.shippingInfo.logistics.shippingDestination.contactDetails`
     *
     * To update a field's value, include the new value in the `order` object in the body params.
     * To remove a field's value, pass `null`.
     *
     * > **Note:** Removing `buyerInfo` or `contactDetails` fields results in an error.
     *
     * To update an order's payment status, use [`updatePaymentStatus( )`](https://www.wix.com/velo/reference/wix-ecom-backend/ordertransactions/updatepaymentstatus).
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @requiredField order
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Newly created order.
     */
    function updateOrder(_id: string | null, order: UpdateOrder, options?: UpdateOrderOptions): Promise<Order$1>;
    interface UpdateOrder {
        /**
         * Order ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Order number displayed in the site owner's dashboard (auto-generated).
         * @readonly
         */
        number?: string;
        /**
         * Date and time the order was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the order was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Order line items.
         * @readonly
         */
        lineItems?: OrderLineItem[];
        /** Buyer information. */
        buyerInfo?: BuyerInfo$6;
        /**
         * Order payment status.
         * + `NOT_PAID` - This can be an order made online, but not yet paid. In such cases `order.status` will be `INITIALIZED`.
         * + This status also applies when an offline order needs to be manually marked as paid. In such cases `order.status` will be `APPROVED`.
         * + `PAID` - All payments associated with this order are paid. For online payments: [`payment.regularPaymentDetails.status: APPROVED`](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/order-transactions/order-transactions-object). For gift cards: [`payment.giftCardPaymentDetails.voided: false`](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/order-transactions/order-transactions-object).
         * + `PARTIALLY_REFUNDED` - Order was refunded, but refund amount is less than order total price.
         * + `FULLY_REFUNDED` - Order fully refunded. Refund amount equals total price.
         * + `PENDING` - Payments received but not yet confirmed by the payment provider.
         * + `PARTIALLY_PAID` -  At least one payment was received and approved, covering less than total price amount.
         */
        paymentStatus?: PaymentStatus$1;
        /**
         * Order fulfillment status.
         * @readonly
         */
        fulfillmentStatus?: FulfillmentStatus$2;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         */
        buyerLanguage?: string | null;
        /** Weight measurement unit - defaults to site's weight unit. */
        weightUnit?: WeightUnit$5;
        /** Currency used for the pricing of this order in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) format. */
        currency?: string | null;
        /** Whether tax is included in line item prices. */
        taxIncludedInPrices?: boolean;
        /**
         * Site language in which original values are shown.
         * @readonly
         */
        siteLanguage?: string | null;
        /**
         * Order price summary.
         * @readonly
         */
        priceSummary?: PriceSummary$4;
        /** Billing address and contact details. */
        billingInfo?: AddressWithContact$4;
        /** Shipping info and selected shipping option details. */
        shippingInfo?: ShippingInformation$2;
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /**
         * Order status.
         * + `INITIALIZED` - Order was created, but not yet approved or declined.
         * + `APPROVED` - Order was approved. This happens when either the online payment succeeded or the order is an offline order. Once an order is approved, many side effects are triggered. For example, holding of stock in the inventory and sending of notification emails.
         * + `CANCELED` - Order was canceled by the user.
         */
        status?: OrderStatus;
        /** Whether order is archived. */
        archived?: boolean | null;
        /**
         * Tax summary.
         * Deprecated. Use `taxInfo` instead.
         * This field will be removed on September 30, 2024.
         */
        taxSummary?: TaxSummary$4;
        /** Tax information. */
        taxInfo?: OrderTaxInfo;
        /** Applied discounts. */
        appliedDiscounts?: AppliedDiscount$5[];
        /**
         * Order activities.
         * @readonly
         */
        activities?: Activity$1[];
        /** Order attribution source. */
        attributionSource?: AttributionSource;
        /**
         * ID of the order's initiator.
         * @readonly
         */
        createdBy?: CreatedBy$2;
        /** Information about the sales channel that submitted this order. */
        channelInfo?: ChannelInfo$2;
        /** Whether a human has seen the order. Set when an order is clicked on in the dashboard. */
        seenByAHuman?: boolean | null;
        /** Checkout ID. */
        checkoutId?: string | null;
        /** Custom fields. */
        customFields?: CustomField$3[];
        /**
         * Balance summary.
         * @readonly
         */
        balanceSummary?: BalanceSummary;
        /** Additional fees applied to the order. */
        additionalFees?: AdditionalFee$4[];
        /**
         * Custom field data for the order object.
         *
         * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
         */
        extendedFields?: ExtendedFields$5;
        /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
        purchaseFlowId?: string | null;
        /**
         * Order recipient address and contact details.
         *
         * This field may differ from the address in `shippingInfo.logistics` when:
         * + The chosen shipping option is pickup point or store pickup.
         * + No shipping option is selected.
         */
        recipientInfo?: AddressWithContact$4;
    }
    interface UpdateOrderOptions {
    }
    interface BulkUpdateOrdersOptions {
        /** Set to `true` if you wish to receive back the updated orders in the response */
        returnEntity?: boolean;
    }
    interface CommitDeltasOptions {
        /**
         * Draft order Id representing this change.
         * Use this ID to get this specific draft content. call .../v1/draft-orders/{draft_order_id}/get
         */
        draftOrderId?: string;
        /** Draft order changes to be applied */
        changes: DraftOrderDiffs;
        /** Side-effects to happen after order is updated */
        commitSettings?: DraftOrderCommitSettings;
        /** Reason for edit, given by user (optional). */
        reason?: string | null;
    }
    interface BulkArchiveOrdersOptions {
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface BulkUnArchiveOrdersOptions {
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface UpdateBuyerInfoOptions {
        /** Buyer info. */
        buyerInfo?: BuyerInfoUpdate;
    }
    interface UpdateBuyerEmailOptions {
        email?: string | null;
    }
    interface UpdateOrderShippingAddressOptions {
        /** Shipping address and contact details to be updated. */
        shippingAddress: AddressWithContact$4;
    }
    interface UpdateBillingContactDetailsOptions {
        /** Contact details. */
        addressContactDetails?: FullAddressContactDetails$4;
    }
    interface UpdateOrderLineItemIdentifiers {
        /** Order ID */
        _id: string;
        /** Line item ID. */
        lineItemId?: string;
    }
    interface UpdateOrderLineItem {
        /** Line item ID. */
        _id?: string;
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName$4;
        /** Catalog and item reference. Holds IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$6;
        /** Line item quantity. */
        quantity?: number;
        /**
         * Total discount for this line item's entire quantity.
         * @readonly
         */
        totalDiscount?: Price$1;
        /** Line item description lines. Used for display purposes for the cart, checkout and order. */
        descriptionLines?: DescriptionLine$4[];
        /** Line item image. */
        image?: string;
        /** Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties$4;
        /** Item type. Either a preset type or custom. */
        itemType?: ItemType$4;
        /**
         * Fulfiller ID. Field is empty when the line item is self-fulfilled.
         *
         * To get fulfillment information, pass the order ID to [List Fulfillments For Single Order](https://www.wix.com/velo/reference/wix-ecom-backend/orderfulfillments/listfulfillmentsforsingleorder).
         */
        fulfillerId?: string | null;
        /**
         * Number of items that were refunded.
         * @readonly
         */
        refundQuantity?: number | null;
        /**
         * Number of items restocked.
         * @readonly
         */
        restockQuantity?: number | null;
        /** Line item price after line item discounts for display purposes. */
        price?: Price$1;
        /**
         * Line item price before line item discounts for display purposes. Defaults to `price` when not provided.
         * @readonly
         */
        priceBeforeDiscounts?: Price$1;
        /**
         * Total price after discounts, and before tax.
         * @readonly
         */
        totalPriceBeforeTax?: Price$1;
        /**
         * Total price after all discounts and tax.
         * @readonly
         */
        totalPriceAfterTax?: Price$1;
        /**
         * Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE` - The entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `DEPOSIT_ONLINE` - Partial payment for the given item to be paid upfront during the checkout. Eligible for catalog items with type `DEPOSIT_ONLINE` only.
         */
        paymentOption?: PaymentOptionType$4;
        /**
         * Deprecated. Use `taxInfo` instead.
         * This field will be removed on September 30, 2024.
         * Tax details for this line item.
         */
        taxDetails?: ItemTaxFullDetails$4;
        /** Represents all the relevant tax details for a specific line item. */
        taxInfo?: LineItemTaxInfo;
        /** Digital file identifier, relevant only for items with type DIGITAL. */
        digitalFile?: DigitalFile$1;
        /** Subscription info. */
        subscriptionInfo?: SubscriptionInfo$1;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription$4;
        /**
         * Item's price amount to be charged during checkout. Relevant for items with a `paymentOption` value of `"DEPOSIT_ONLINE"`.
         * @readonly
         */
        depositAmount?: Price$1;
    }
    interface UpdateOrderLineItemOptions {
    }
    interface UpdateActivityIdentifiers {
        /** Order ID. */
        _id: string;
        /** ID of the activity to update. */
        activityId: string;
    }
    interface DeleteActivityIdentifiers {
        /** Order ID. */
        _id: string;
        /** ID of the activity to delete. */
        activityId: string;
    }
    /**
     * Cancels an order.
     *
     *
     * The `cancelOrder()` function returns a Promise that resolves when the specified order is canceled and the `order.status` field changes to `CANCELED`.
     * @param _id - Order ID.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function cancelOrder(_id: string, options?: CancelOrderOptions): Promise<CancelOrderResponse>;
    interface CancelOrderOptions {
        /** Whether to send an order canceled email to the buyer. */
        sendOrderCanceledEmail?: boolean;
        /** Custom note to be added to the email (optional). */
        customMessage?: string | null;
        /** Whether to restock all items in the order. This will only apply to products in the Wix Stores inventory. */
        restockAllItems?: boolean;
    }
    interface BulkMarkAsFulfilledOptions {
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface BulkMarkAsUnfulfilledOptions {
        /** Whether to return the full updated order entities in the response. */
        returnFullEntity?: boolean;
    }
    interface AggregateOrdersOptions {
        /** Filter applied to original data */
        filter?: Record<string, any> | null;
        /** This is an object defining aggregation itself */
        aggregation: Record<string, any> | null;
        /**
         * Optional custom separator string that can be used to override default separator value '|'
         * for hierarchical responses of multifaceted aggregation requests like:
         * '{"aggregation": {"example_request_key": {"$count" : ["deliveryMethod", "shippingRegion"]}}}'
         * with example response for default '|' separator like:
         * '{"aggregates" :{"example_request_key": {"(Mail|Region 1)": 5, "(Pickup|Region 2)": 10}}}'
         */
        hierarchySeparatorOverride?: string | null;
    }
    interface BulkUpdateOrderTagsOptions {
        /** Tags to be added to orders */
        assignTags?: Tags;
        /** Tags to be removed from orders */
        unassignTags?: Tags;
    }
    type ecomV1OrderOrders_universal_d_OrderLineItem = OrderLineItem;
    type ecomV1OrderOrders_universal_d_LineItemTaxInfo = LineItemTaxInfo;
    type ecomV1OrderOrders_universal_d_LineItemTaxBreakdown = LineItemTaxBreakdown;
    type ecomV1OrderOrders_universal_d_LocationAndQuantity = LocationAndQuantity;
    type ecomV1OrderOrders_universal_d_DeliveryLogisticsAddressOneOf = DeliveryLogisticsAddressOneOf;
    type ecomV1OrderOrders_universal_d_OrderStatus = OrderStatus;
    const ecomV1OrderOrders_universal_d_OrderStatus: typeof OrderStatus;
    type ecomV1OrderOrders_universal_d_OrderTaxInfo = OrderTaxInfo;
    type ecomV1OrderOrders_universal_d_OrderTaxBreakdown = OrderTaxBreakdown;
    type ecomV1OrderOrders_universal_d_MerchantDiscountMerchantDiscountReasonOneOf = MerchantDiscountMerchantDiscountReasonOneOf;
    type ecomV1OrderOrders_universal_d_DiscountReason = DiscountReason;
    const ecomV1OrderOrders_universal_d_DiscountReason: typeof DiscountReason;
    type ecomV1OrderOrders_universal_d_ActivityContentOneOf = ActivityContentOneOf;
    type ecomV1OrderOrders_universal_d_CustomActivity = CustomActivity;
    type ecomV1OrderOrders_universal_d_MerchantComment = MerchantComment;
    type ecomV1OrderOrders_universal_d_OrderCreatedFromExchange = OrderCreatedFromExchange;
    type ecomV1OrderOrders_universal_d_NewExchangeOrderCreated = NewExchangeOrderCreated;
    type ecomV1OrderOrders_universal_d_LineItemExchangeData = LineItemExchangeData;
    type ecomV1OrderOrders_universal_d_DraftOrderChangesApplied = DraftOrderChangesApplied;
    type ecomV1OrderOrders_universal_d_OrderChange = OrderChange;
    type ecomV1OrderOrders_universal_d_OrderChangeValueOneOf = OrderChangeValueOneOf;
    type ecomV1OrderOrders_universal_d_LineItemChanges = LineItemChanges;
    type ecomV1OrderOrders_universal_d_LineItemQuantityChange = LineItemQuantityChange;
    type ecomV1OrderOrders_universal_d_LineItemQuantityChangeType = LineItemQuantityChangeType;
    const ecomV1OrderOrders_universal_d_LineItemQuantityChangeType: typeof LineItemQuantityChangeType;
    type ecomV1OrderOrders_universal_d_LineItemPriceChange = LineItemPriceChange;
    type ecomV1OrderOrders_universal_d_ManagedLineItem = ManagedLineItem;
    type ecomV1OrderOrders_universal_d_ManagedDiscount = ManagedDiscount;
    type ecomV1OrderOrders_universal_d_TranslatedValue = TranslatedValue;
    type ecomV1OrderOrders_universal_d_LineItemAmount = LineItemAmount;
    type ecomV1OrderOrders_universal_d_ManagedAdditionalFee = ManagedAdditionalFee;
    type ecomV1OrderOrders_universal_d_TotalPriceChange = TotalPriceChange;
    type ecomV1OrderOrders_universal_d_SavedPaymentMethod = SavedPaymentMethod;
    type ecomV1OrderOrders_universal_d_AttributionSource = AttributionSource;
    const ecomV1OrderOrders_universal_d_AttributionSource: typeof AttributionSource;
    type ecomV1OrderOrders_universal_d_CreatedByStringOneOf = CreatedByStringOneOf;
    type ecomV1OrderOrders_universal_d_BalanceSummary = BalanceSummary;
    type ecomV1OrderOrders_universal_d_Balance = Balance;
    type ecomV1OrderOrders_universal_d_FulfillmentStatusesAggregate = FulfillmentStatusesAggregate;
    type ecomV1OrderOrders_universal_d_Tags = Tags;
    type ecomV1OrderOrders_universal_d_TagList = TagList;
    type ecomV1OrderOrders_universal_d_TriggerReindexOrderRequest = TriggerReindexOrderRequest;
    type ecomV1OrderOrders_universal_d_GetMetasiteDataRequest = GetMetasiteDataRequest;
    type ecomV1OrderOrders_universal_d_GetMetasiteDataResponse = GetMetasiteDataResponse;
    type ecomV1OrderOrders_universal_d_MetaSite = MetaSite;
    type ecomV1OrderOrders_universal_d_App = App;
    type ecomV1OrderOrders_universal_d_State = State;
    const ecomV1OrderOrders_universal_d_State: typeof State;
    type ecomV1OrderOrders_universal_d_Namespace = Namespace;
    const ecomV1OrderOrders_universal_d_Namespace: typeof Namespace;
    type ecomV1OrderOrders_universal_d_SeoData = SeoData;
    type ecomV1OrderOrders_universal_d_MetaTag = MetaTag;
    type ecomV1OrderOrders_universal_d_HtmlApplication = HtmlApplication;
    type ecomV1OrderOrders_universal_d_ExternalUriMapping = ExternalUriMapping;
    type ecomV1OrderOrders_universal_d_UserDataResponse = UserDataResponse;
    type ecomV1OrderOrders_universal_d_QueryOrdersForMetasiteRequest = QueryOrdersForMetasiteRequest;
    type ecomV1OrderOrders_universal_d_InternalQueryOrdersRequest = InternalQueryOrdersRequest;
    type ecomV1OrderOrders_universal_d_QueryOrdersForMetasiteResponse = QueryOrdersForMetasiteResponse;
    type ecomV1OrderOrders_universal_d_GetOrderForMetasiteRequest = GetOrderForMetasiteRequest;
    type ecomV1OrderOrders_universal_d_GetOrderForMetasiteResponse = GetOrderForMetasiteResponse;
    type ecomV1OrderOrders_universal_d_ListOrderTransactionsForMetasiteRequest = ListOrderTransactionsForMetasiteRequest;
    type ecomV1OrderOrders_universal_d_ListOrderTransactionsForMetasiteResponse = ListOrderTransactionsForMetasiteResponse;
    type ecomV1OrderOrders_universal_d_TestUrlAdditionalBindingsRequest = TestUrlAdditionalBindingsRequest;
    type ecomV1OrderOrders_universal_d_TestUrlAdditionalBindingsResponse = TestUrlAdditionalBindingsResponse;
    type ecomV1OrderOrders_universal_d_UpdateInternalDocumentsEvent = UpdateInternalDocumentsEvent;
    type ecomV1OrderOrders_universal_d_UpdateInternalDocumentsEventOperationOneOf = UpdateInternalDocumentsEventOperationOneOf;
    type ecomV1OrderOrders_universal_d_InternalDocument = InternalDocument;
    type ecomV1OrderOrders_universal_d_InternalDocumentUpdateOperation = InternalDocumentUpdateOperation;
    type ecomV1OrderOrders_universal_d_DeleteByIdsOperation = DeleteByIdsOperation;
    type ecomV1OrderOrders_universal_d_DeleteByFilterOperation = DeleteByFilterOperation;
    type ecomV1OrderOrders_universal_d_InternalDocumentUpdateByFilterOperation = InternalDocumentUpdateByFilterOperation;
    type ecomV1OrderOrders_universal_d_InternalUpdateExistingOperation = InternalUpdateExistingOperation;
    type ecomV1OrderOrders_universal_d_VersionedDocumentUpdateOperation = VersionedDocumentUpdateOperation;
    type ecomV1OrderOrders_universal_d_VersioningMode = VersioningMode;
    const ecomV1OrderOrders_universal_d_VersioningMode: typeof VersioningMode;
    type ecomV1OrderOrders_universal_d_VersionedDeleteByIdsOperation = VersionedDeleteByIdsOperation;
    type ecomV1OrderOrders_universal_d_VersionedDocumentId = VersionedDocumentId;
    type ecomV1OrderOrders_universal_d_TriggerReindexRequest = TriggerReindexRequest;
    type ecomV1OrderOrders_universal_d_TriggerReindexResponse = TriggerReindexResponse;
    type ecomV1OrderOrders_universal_d_BatchOfTriggerReindexOrderRequest = BatchOfTriggerReindexOrderRequest;
    type ecomV1OrderOrders_universal_d_SendBuyerConfirmationEmailRequest = SendBuyerConfirmationEmailRequest;
    type ecomV1OrderOrders_universal_d_SendBuyerConfirmationEmailResponse = SendBuyerConfirmationEmailResponse;
    type ecomV1OrderOrders_universal_d_SendBuyerPaymentsReceivedEmailRequest = SendBuyerPaymentsReceivedEmailRequest;
    type ecomV1OrderOrders_universal_d_SendBuyerPaymentsReceivedEmailResponse = SendBuyerPaymentsReceivedEmailResponse;
    type ecomV1OrderOrders_universal_d_SendBuyerPickupConfirmationEmailRequest = SendBuyerPickupConfirmationEmailRequest;
    type ecomV1OrderOrders_universal_d_SendBuyerPickupConfirmationEmailResponse = SendBuyerPickupConfirmationEmailResponse;
    type ecomV1OrderOrders_universal_d_BulkSendBuyerPickupConfirmationEmailsRequest = BulkSendBuyerPickupConfirmationEmailsRequest;
    type ecomV1OrderOrders_universal_d_BulkSendBuyerPickupConfirmationEmailsResponse = BulkSendBuyerPickupConfirmationEmailsResponse;
    type ecomV1OrderOrders_universal_d_SendBuyerShippingConfirmationEmailRequest = SendBuyerShippingConfirmationEmailRequest;
    type ecomV1OrderOrders_universal_d_SendBuyerShippingConfirmationEmailResponse = SendBuyerShippingConfirmationEmailResponse;
    type ecomV1OrderOrders_universal_d_BulkSendBuyerShippingConfirmationEmailsRequest = BulkSendBuyerShippingConfirmationEmailsRequest;
    type ecomV1OrderOrders_universal_d_BulkSendBuyerShippingConfirmationEmailsResponse = BulkSendBuyerShippingConfirmationEmailsResponse;
    type ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedNotificationRequest = SendMerchantOrderReceivedNotificationRequest;
    type ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedNotificationResponse = SendMerchantOrderReceivedNotificationResponse;
    type ecomV1OrderOrders_universal_d_SendCancelRefundEmailRequest = SendCancelRefundEmailRequest;
    type ecomV1OrderOrders_universal_d_SendCancelRefundEmailResponse = SendCancelRefundEmailResponse;
    type ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedPushRequest = SendMerchantOrderReceivedPushRequest;
    type ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedPushResponse = SendMerchantOrderReceivedPushResponse;
    type ecomV1OrderOrders_universal_d_PreviewEmailByTypeRequest = PreviewEmailByTypeRequest;
    type ecomV1OrderOrders_universal_d_PreviewEmailType = PreviewEmailType;
    const ecomV1OrderOrders_universal_d_PreviewEmailType: typeof PreviewEmailType;
    type ecomV1OrderOrders_universal_d_PreviewEmailByTypeResponse = PreviewEmailByTypeResponse;
    type ecomV1OrderOrders_universal_d_PreviewRefundEmailRequest = PreviewRefundEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewRefundEmailResponse = PreviewRefundEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewCancelEmailRequest = PreviewCancelEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewCancelEmailResponse = PreviewCancelEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewCancelRefundEmailRequest = PreviewCancelRefundEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewCancelRefundEmailResponse = PreviewCancelRefundEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewBuyerPaymentsReceivedEmailRequest = PreviewBuyerPaymentsReceivedEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewBuyerPaymentsReceivedEmailResponse = PreviewBuyerPaymentsReceivedEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewBuyerConfirmationEmailRequest = PreviewBuyerConfirmationEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewBuyerConfirmationEmailResponse = PreviewBuyerConfirmationEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewBuyerPickupConfirmationEmailRequest = PreviewBuyerPickupConfirmationEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewBuyerPickupConfirmationEmailResponse = PreviewBuyerPickupConfirmationEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewShippingConfirmationEmailRequest = PreviewShippingConfirmationEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewShippingConfirmationEmailResponse = PreviewShippingConfirmationEmailResponse;
    type ecomV1OrderOrders_universal_d_PreviewResendDownloadLinksEmailRequest = PreviewResendDownloadLinksEmailRequest;
    type ecomV1OrderOrders_universal_d_PreviewResendDownloadLinksEmailResponse = PreviewResendDownloadLinksEmailResponse;
    type ecomV1OrderOrders_universal_d_PreparePaymentCollectionRequest = PreparePaymentCollectionRequest;
    type ecomV1OrderOrders_universal_d_PreparePaymentCollectionResponse = PreparePaymentCollectionResponse;
    type ecomV1OrderOrders_universal_d_GetPaymentCollectabilityStatusRequest = GetPaymentCollectabilityStatusRequest;
    type ecomV1OrderOrders_universal_d_GetPaymentCollectabilityStatusResponse = GetPaymentCollectabilityStatusResponse;
    type ecomV1OrderOrders_universal_d_PaymentCollectabilityStatus = PaymentCollectabilityStatus;
    const ecomV1OrderOrders_universal_d_PaymentCollectabilityStatus: typeof PaymentCollectabilityStatus;
    type ecomV1OrderOrders_universal_d_RecordManuallyCollectedPaymentRequest = RecordManuallyCollectedPaymentRequest;
    type ecomV1OrderOrders_universal_d_RecordManuallyCollectedPaymentResponse = RecordManuallyCollectedPaymentResponse;
    type ecomV1OrderOrders_universal_d_MarkOrderAsPaidRequest = MarkOrderAsPaidRequest;
    type ecomV1OrderOrders_universal_d_MarkOrderAsPaidResponse = MarkOrderAsPaidResponse;
    type ecomV1OrderOrders_universal_d_PaymentStatusUpdated = PaymentStatusUpdated;
    type ecomV1OrderOrders_universal_d_BulkMarkOrdersAsPaidRequest = BulkMarkOrdersAsPaidRequest;
    type ecomV1OrderOrders_universal_d_BulkMarkOrdersAsPaidResponse = BulkMarkOrdersAsPaidResponse;
    type ecomV1OrderOrders_universal_d_BulkOrderResult = BulkOrderResult;
    type ecomV1OrderOrders_universal_d_CreatePaymentGatewayOrderRequest = CreatePaymentGatewayOrderRequest;
    type ecomV1OrderOrders_universal_d_ChargedBy = ChargedBy;
    type ecomV1OrderOrders_universal_d_CreatePaymentGatewayOrderResponse = CreatePaymentGatewayOrderResponse;
    type ecomV1OrderOrders_universal_d_ChargeMembershipsRequest = ChargeMembershipsRequest;
    type ecomV1OrderOrders_universal_d_MembershipChargeItem = MembershipChargeItem;
    type ecomV1OrderOrders_universal_d_ChargeMembershipsResponse = ChargeMembershipsResponse;
    type ecomV1OrderOrders_universal_d_ContinueSideEffectsFlowInLegacyData = ContinueSideEffectsFlowInLegacyData;
    type ecomV1OrderOrders_universal_d_OrdersExperiments = OrdersExperiments;
    type ecomV1OrderOrders_universal_d_GetOrderRequest = GetOrderRequest;
    type ecomV1OrderOrders_universal_d_GetOrderResponse = GetOrderResponse;
    type ecomV1OrderOrders_universal_d_InternalQueryOrdersResponse = InternalQueryOrdersResponse;
    type ecomV1OrderOrders_universal_d_QueryOrderRequest = QueryOrderRequest;
    type ecomV1OrderOrders_universal_d_QueryOrderResponse = QueryOrderResponse;
    type ecomV1OrderOrders_universal_d_SearchOrdersRequest = SearchOrdersRequest;
    type ecomV1OrderOrders_universal_d_CursorSearch = CursorSearch;
    type ecomV1OrderOrders_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
    type ecomV1OrderOrders_universal_d_SearchOrdersResponse = SearchOrdersResponse;
    type ecomV1OrderOrders_universal_d_UpdateOrderRequest = UpdateOrderRequest;
    type ecomV1OrderOrders_universal_d_UpdateOrderResponse = UpdateOrderResponse;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrdersRequest = BulkUpdateOrdersRequest;
    type ecomV1OrderOrders_universal_d_MaskedOrder = MaskedOrder;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrdersResponse = BulkUpdateOrdersResponse;
    type ecomV1OrderOrders_universal_d_CommitDeltasRequest = CommitDeltasRequest;
    type ecomV1OrderOrders_universal_d_DraftOrderDiffs = DraftOrderDiffs;
    type ecomV1OrderOrders_universal_d_DraftOrderDiffsShippingUpdateInfoOneOf = DraftOrderDiffsShippingUpdateInfoOneOf;
    type ecomV1OrderOrders_universal_d_V1LineItemDelta = V1LineItemDelta;
    type ecomV1OrderOrders_universal_d_V1LineItemDeltaDeltaOneOf = V1LineItemDeltaDeltaOneOf;
    type ecomV1OrderOrders_universal_d_OrderLineItemChangedDetails = OrderLineItemChangedDetails;
    type ecomV1OrderOrders_universal_d_DeltaPaymentOptionType = DeltaPaymentOptionType;
    const ecomV1OrderOrders_universal_d_DeltaPaymentOptionType: typeof DeltaPaymentOptionType;
    type ecomV1OrderOrders_universal_d_ItemChangedDetails = ItemChangedDetails;
    type ecomV1OrderOrders_universal_d_AppliedDiscountDelta = AppliedDiscountDelta;
    type ecomV1OrderOrders_universal_d_AppliedDiscountDeltaDeltaOneOf = AppliedDiscountDeltaDeltaOneOf;
    type ecomV1OrderOrders_universal_d_AdditionalFeeDelta = AdditionalFeeDelta;
    type ecomV1OrderOrders_universal_d_AdditionalFeeDeltaDeltaOneOf = AdditionalFeeDeltaDeltaOneOf;
    type ecomV1OrderOrders_universal_d_DraftOrderCommitSettings = DraftOrderCommitSettings;
    type ecomV1OrderOrders_universal_d_InventoryUpdateDetails = InventoryUpdateDetails;
    type ecomV1OrderOrders_universal_d_InventoryAction = InventoryAction;
    const ecomV1OrderOrders_universal_d_InventoryAction: typeof InventoryAction;
    type ecomV1OrderOrders_universal_d_CommitDeltasResponse = CommitDeltasResponse;
    type ecomV1OrderOrders_universal_d_OrderDeltasCommitted = OrderDeltasCommitted;
    type ecomV1OrderOrders_universal_d_CommittedDiffs = CommittedDiffs;
    type ecomV1OrderOrders_universal_d_CommittedDiffsShippingUpdateInfoOneOf = CommittedDiffsShippingUpdateInfoOneOf;
    type ecomV1OrderOrders_universal_d_LineItemDelta = LineItemDelta;
    type ecomV1OrderOrders_universal_d_LineItemDeltaDeltaOneOf = LineItemDeltaDeltaOneOf;
    type ecomV1OrderOrders_universal_d_ArchiveOrderRequest = ArchiveOrderRequest;
    type ecomV1OrderOrders_universal_d_ArchiveOrderResponse = ArchiveOrderResponse;
    type ecomV1OrderOrders_universal_d_BulkArchiveOrdersRequest = BulkArchiveOrdersRequest;
    type ecomV1OrderOrders_universal_d_BulkArchiveOrdersResponse = BulkArchiveOrdersResponse;
    type ecomV1OrderOrders_universal_d_BulkArchiveOrdersByFilterRequest = BulkArchiveOrdersByFilterRequest;
    type ecomV1OrderOrders_universal_d_BulkArchiveOrdersByFilterResponse = BulkArchiveOrdersByFilterResponse;
    type ecomV1OrderOrders_universal_d_UnArchiveOrderRequest = UnArchiveOrderRequest;
    type ecomV1OrderOrders_universal_d_UnArchiveOrderResponse = UnArchiveOrderResponse;
    type ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersRequest = BulkUnArchiveOrdersRequest;
    type ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersResponse = BulkUnArchiveOrdersResponse;
    type ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersByFilterRequest = BulkUnArchiveOrdersByFilterRequest;
    type ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersByFilterResponse = BulkUnArchiveOrdersByFilterResponse;
    type ecomV1OrderOrders_universal_d_UpdateBuyerInfoRequest = UpdateBuyerInfoRequest;
    type ecomV1OrderOrders_universal_d_BuyerInfoUpdate = BuyerInfoUpdate;
    type ecomV1OrderOrders_universal_d_UpdateBuyerInfoResponse = UpdateBuyerInfoResponse;
    type ecomV1OrderOrders_universal_d_UpdateBuyerEmailRequest = UpdateBuyerEmailRequest;
    type ecomV1OrderOrders_universal_d_UpdateBuyerEmailResponse = UpdateBuyerEmailResponse;
    type ecomV1OrderOrders_universal_d_UpdateOrderShippingAddressRequest = UpdateOrderShippingAddressRequest;
    type ecomV1OrderOrders_universal_d_UpdateOrderShippingAddressResponse = UpdateOrderShippingAddressResponse;
    type ecomV1OrderOrders_universal_d_UpdateBillingContactDetailsRequest = UpdateBillingContactDetailsRequest;
    type ecomV1OrderOrders_universal_d_UpdateBillingContactDetailsResponse = UpdateBillingContactDetailsResponse;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItemRequest = UpdateOrderLineItemRequest;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItemResponse = UpdateOrderLineItemResponse;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItemsRequest = UpdateOrderLineItemsRequest;
    type ecomV1OrderOrders_universal_d_MaskedOrderLineItem = MaskedOrderLineItem;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItemsResponse = UpdateOrderLineItemsResponse;
    type ecomV1OrderOrders_universal_d_AddInternalActivityRequest = AddInternalActivityRequest;
    type ecomV1OrderOrders_universal_d_InternalActivity = InternalActivity;
    type ecomV1OrderOrders_universal_d_InternalActivityContentOneOf = InternalActivityContentOneOf;
    type ecomV1OrderOrders_universal_d_OrderPlaced = OrderPlaced;
    type ecomV1OrderOrders_universal_d_OrderPaid = OrderPaid;
    type ecomV1OrderOrders_universal_d_OrderFulfilled = OrderFulfilled;
    type ecomV1OrderOrders_universal_d_OrderNotFulfilled = OrderNotFulfilled;
    type ecomV1OrderOrders_universal_d_OrderCanceled = OrderCanceled;
    type ecomV1OrderOrders_universal_d_DownloadLinkSent = DownloadLinkSent;
    type ecomV1OrderOrders_universal_d_TrackingNumberAdded = TrackingNumberAdded;
    type ecomV1OrderOrders_universal_d_TrackingNumberEdited = TrackingNumberEdited;
    type ecomV1OrderOrders_universal_d_TrackingLinkAdded = TrackingLinkAdded;
    type ecomV1OrderOrders_universal_d_ShippingConfirmationEmailSent = ShippingConfirmationEmailSent;
    type ecomV1OrderOrders_universal_d_InvoiceAdded = InvoiceAdded;
    type ecomV1OrderOrders_universal_d_InvoiceSent = InvoiceSent;
    type ecomV1OrderOrders_universal_d_FulfillerEmailSent = FulfillerEmailSent;
    type ecomV1OrderOrders_universal_d_ShippingAddressEdited = ShippingAddressEdited;
    type ecomV1OrderOrders_universal_d_EmailEdited = EmailEdited;
    type ecomV1OrderOrders_universal_d_PickupReadyEmailSent = PickupReadyEmailSent;
    type ecomV1OrderOrders_universal_d_OrderPartiallyPaid = OrderPartiallyPaid;
    type ecomV1OrderOrders_universal_d_AddInternalActivityResponse = AddInternalActivityResponse;
    type ecomV1OrderOrders_universal_d_AddActivityRequest = AddActivityRequest;
    type ecomV1OrderOrders_universal_d_PublicActivity = PublicActivity;
    type ecomV1OrderOrders_universal_d_PublicActivityContentOneOf = PublicActivityContentOneOf;
    type ecomV1OrderOrders_universal_d_AddActivityResponse = AddActivityResponse;
    type ecomV1OrderOrders_universal_d_AddActivitiesRequest = AddActivitiesRequest;
    type ecomV1OrderOrders_universal_d_AddActivitiesResponse = AddActivitiesResponse;
    type ecomV1OrderOrders_universal_d_UpdateActivityRequest = UpdateActivityRequest;
    type ecomV1OrderOrders_universal_d_UpdateActivityResponse = UpdateActivityResponse;
    type ecomV1OrderOrders_universal_d_DeleteActivityRequest = DeleteActivityRequest;
    type ecomV1OrderOrders_universal_d_DeleteActivityResponse = DeleteActivityResponse;
    type ecomV1OrderOrders_universal_d_UpdateLineItemsDescriptionLinesRequest = UpdateLineItemsDescriptionLinesRequest;
    type ecomV1OrderOrders_universal_d_LineItemUpdate = LineItemUpdate;
    type ecomV1OrderOrders_universal_d_UpdateLineItemsDescriptionLinesResponse = UpdateLineItemsDescriptionLinesResponse;
    type ecomV1OrderOrders_universal_d_MarkOrderAsSeenByHumanRequest = MarkOrderAsSeenByHumanRequest;
    type ecomV1OrderOrders_universal_d_MarkOrderAsSeenByHumanResponse = MarkOrderAsSeenByHumanResponse;
    type ecomV1OrderOrders_universal_d_CancelOrderRequest = CancelOrderRequest;
    type ecomV1OrderOrders_universal_d_CancelOrderResponse = CancelOrderResponse;
    type ecomV1OrderOrders_universal_d_OrderCanceledEventOrderCanceled = OrderCanceledEventOrderCanceled;
    type ecomV1OrderOrders_universal_d_MarkAsFulfilledRequest = MarkAsFulfilledRequest;
    type ecomV1OrderOrders_universal_d_MarkAsFulfilledResponse = MarkAsFulfilledResponse;
    type ecomV1OrderOrders_universal_d_FulfillmentStatusUpdated = FulfillmentStatusUpdated;
    type ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledRequest = BulkMarkAsFulfilledRequest;
    type ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledResponse = BulkMarkAsFulfilledResponse;
    type ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledByFilterRequest = BulkMarkAsFulfilledByFilterRequest;
    type ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledByFilterResponse = BulkMarkAsFulfilledByFilterResponse;
    type ecomV1OrderOrders_universal_d_MarkAsUnfulfilledRequest = MarkAsUnfulfilledRequest;
    type ecomV1OrderOrders_universal_d_MarkAsUnfulfilledResponse = MarkAsUnfulfilledResponse;
    type ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledRequest = BulkMarkAsUnfulfilledRequest;
    type ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledResponse = BulkMarkAsUnfulfilledResponse;
    type ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledByFilterRequest = BulkMarkAsUnfulfilledByFilterRequest;
    type ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledByFilterResponse = BulkMarkAsUnfulfilledByFilterResponse;
    type ecomV1OrderOrders_universal_d_V1MarkOrderAsPaidRequest = V1MarkOrderAsPaidRequest;
    type ecomV1OrderOrders_universal_d_V1MarkOrderAsPaidResponse = V1MarkOrderAsPaidResponse;
    type ecomV1OrderOrders_universal_d_V1BulkMarkOrdersAsPaidRequest = V1BulkMarkOrdersAsPaidRequest;
    type ecomV1OrderOrders_universal_d_V1BulkMarkOrdersAsPaidResponse = V1BulkMarkOrdersAsPaidResponse;
    type ecomV1OrderOrders_universal_d_V1CreatePaymentGatewayOrderRequest = V1CreatePaymentGatewayOrderRequest;
    type ecomV1OrderOrders_universal_d_V1CreatePaymentGatewayOrderResponse = V1CreatePaymentGatewayOrderResponse;
    type ecomV1OrderOrders_universal_d_GetShipmentsRequest = GetShipmentsRequest;
    type ecomV1OrderOrders_universal_d_GetShipmentsResponse = GetShipmentsResponse;
    type ecomV1OrderOrders_universal_d_AggregateOrdersRequest = AggregateOrdersRequest;
    type ecomV1OrderOrders_universal_d_AggregateOrdersResponse = AggregateOrdersResponse;
    type ecomV1OrderOrders_universal_d_DecrementItemsQuantityRequest = DecrementItemsQuantityRequest;
    type ecomV1OrderOrders_universal_d_DecrementData = DecrementData;
    type ecomV1OrderOrders_universal_d_DecrementItemsQuantityResponse = DecrementItemsQuantityResponse;
    type ecomV1OrderOrders_universal_d_OrderItemsRestocked = OrderItemsRestocked;
    type ecomV1OrderOrders_universal_d_V1RestockItem = V1RestockItem;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsRequest = BulkUpdateOrderTagsRequest;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsResponse = BulkUpdateOrderTagsResponse;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsResult = BulkUpdateOrderTagsResult;
    type ecomV1OrderOrders_universal_d_OrderApproved = OrderApproved;
    type ecomV1OrderOrders_universal_d_Task = Task;
    type ecomV1OrderOrders_universal_d_TaskKey = TaskKey;
    type ecomV1OrderOrders_universal_d_TaskAction = TaskAction;
    type ecomV1OrderOrders_universal_d_TaskActionActionOneOf = TaskActionActionOneOf;
    type ecomV1OrderOrders_universal_d_Complete = Complete;
    type ecomV1OrderOrders_universal_d_Cancel = Cancel;
    type ecomV1OrderOrders_universal_d_Reschedule = Reschedule;
    type ecomV1OrderOrders_universal_d_InvoiceSentEvent = InvoiceSentEvent;
    type ecomV1OrderOrders_universal_d_IdAndVersion = IdAndVersion;
    type ecomV1OrderOrders_universal_d_InvoiceFields = InvoiceFields;
    type ecomV1OrderOrders_universal_d_Customer = Customer;
    type ecomV1OrderOrders_universal_d_Email = Email;
    type ecomV1OrderOrders_universal_d_QuotesAddress = QuotesAddress;
    type ecomV1OrderOrders_universal_d_AddressDescription = AddressDescription;
    type ecomV1OrderOrders_universal_d_Placement = Placement;
    const ecomV1OrderOrders_universal_d_Placement: typeof Placement;
    type ecomV1OrderOrders_universal_d_Phone = Phone;
    type ecomV1OrderOrders_universal_d_Company = Company;
    type ecomV1OrderOrders_universal_d_CommonAddress = CommonAddress;
    type ecomV1OrderOrders_universal_d_CommonAddressStreetOneOf = CommonAddressStreetOneOf;
    type ecomV1OrderOrders_universal_d_Subdivision = Subdivision;
    type ecomV1OrderOrders_universal_d_SubdivisionType = SubdivisionType;
    const ecomV1OrderOrders_universal_d_SubdivisionType: typeof SubdivisionType;
    type ecomV1OrderOrders_universal_d_StandardDetails = StandardDetails;
    type ecomV1OrderOrders_universal_d_InvoiceDates = InvoiceDates;
    type ecomV1OrderOrders_universal_d_LineItems = LineItems;
    type ecomV1OrderOrders_universal_d_BigDecimalWrapper = BigDecimalWrapper;
    type ecomV1OrderOrders_universal_d_LineItemTax = LineItemTax;
    type ecomV1OrderOrders_universal_d_Source = Source;
    type ecomV1OrderOrders_universal_d_SourceType = SourceType;
    const ecomV1OrderOrders_universal_d_SourceType: typeof SourceType;
    type ecomV1OrderOrders_universal_d_LineItemMetaData = LineItemMetaData;
    type ecomV1OrderOrders_universal_d_Locale = Locale;
    type ecomV1OrderOrders_universal_d_TotalPrice = TotalPrice;
    type ecomV1OrderOrders_universal_d_ItemizedFee = ItemizedFee;
    type ecomV1OrderOrders_universal_d_DiscountOneDiscountTypeOneOf = DiscountOneDiscountTypeOneOf;
    type ecomV1OrderOrders_universal_d_CalculatedTaxes = CalculatedTaxes;
    type ecomV1OrderOrders_universal_d_CalculatedTax = CalculatedTax;
    type ecomV1OrderOrders_universal_d_Payments = Payments;
    type ecomV1OrderOrders_universal_d_InvoicesPayment = InvoicesPayment;
    type ecomV1OrderOrders_universal_d_MetaData = MetaData;
    type ecomV1OrderOrders_universal_d_InvoiceDynamicPriceTotals = InvoiceDynamicPriceTotals;
    type ecomV1OrderOrders_universal_d_CustomFieldValue = CustomFieldValue;
    type ecomV1OrderOrders_universal_d_CustomFieldGroup = CustomFieldGroup;
    const ecomV1OrderOrders_universal_d_CustomFieldGroup: typeof CustomFieldGroup;
    type ecomV1OrderOrders_universal_d_Value = Value;
    type ecomV1OrderOrders_universal_d_ValueType = ValueType;
    const ecomV1OrderOrders_universal_d_ValueType: typeof ValueType;
    type ecomV1OrderOrders_universal_d_Deposit = Deposit;
    type ecomV1OrderOrders_universal_d_DepositType = DepositType;
    const ecomV1OrderOrders_universal_d_DepositType: typeof DepositType;
    type ecomV1OrderOrders_universal_d_InvoiceStatus = InvoiceStatus;
    const ecomV1OrderOrders_universal_d_InvoiceStatus: typeof InvoiceStatus;
    type ecomV1OrderOrders_universal_d_TriggerSideEffectsFromLegacyData = TriggerSideEffectsFromLegacyData;
    type ecomV1OrderOrders_universal_d_QueryOrdersForMetasiteOptions = QueryOrdersForMetasiteOptions;
    type ecomV1OrderOrders_universal_d_GetOrderForMetasiteIdentifiers = GetOrderForMetasiteIdentifiers;
    type ecomV1OrderOrders_universal_d_ListOrderTransactionsForMetasiteIdentifiers = ListOrderTransactionsForMetasiteIdentifiers;
    type ecomV1OrderOrders_universal_d_TriggerReindexOptions = TriggerReindexOptions;
    type ecomV1OrderOrders_universal_d_BulkSendBuyerPickupConfirmationEmailsOptions = BulkSendBuyerPickupConfirmationEmailsOptions;
    type ecomV1OrderOrders_universal_d_BulkSendBuyerShippingConfirmationEmailsOptions = BulkSendBuyerShippingConfirmationEmailsOptions;
    type ecomV1OrderOrders_universal_d_SendCancelRefundEmailOptions = SendCancelRefundEmailOptions;
    type ecomV1OrderOrders_universal_d_PreviewRefundEmailOptions = PreviewRefundEmailOptions;
    type ecomV1OrderOrders_universal_d_PreviewCancelEmailOptions = PreviewCancelEmailOptions;
    type ecomV1OrderOrders_universal_d_PreviewCancelRefundEmailOptions = PreviewCancelRefundEmailOptions;
    type ecomV1OrderOrders_universal_d_PreparePaymentCollectionOptions = PreparePaymentCollectionOptions;
    type ecomV1OrderOrders_universal_d_PaymentCollectionCreatePaymentGatewayOrderOptions = PaymentCollectionCreatePaymentGatewayOrderOptions;
    type ecomV1OrderOrders_universal_d_ChargeMembershipsOptions = ChargeMembershipsOptions;
    const ecomV1OrderOrders_universal_d_getOrder: typeof getOrder;
    type ecomV1OrderOrders_universal_d_InternalQueryOrdersOptions = InternalQueryOrdersOptions;
    type ecomV1OrderOrders_universal_d_OrdersQueryResult = OrdersQueryResult;
    type ecomV1OrderOrders_universal_d_OrdersQueryBuilder = OrdersQueryBuilder;
    const ecomV1OrderOrders_universal_d_searchOrders: typeof searchOrders;
    type ecomV1OrderOrders_universal_d_SearchOrdersOptions = SearchOrdersOptions;
    const ecomV1OrderOrders_universal_d_updateOrder: typeof updateOrder;
    type ecomV1OrderOrders_universal_d_UpdateOrder = UpdateOrder;
    type ecomV1OrderOrders_universal_d_UpdateOrderOptions = UpdateOrderOptions;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrdersOptions = BulkUpdateOrdersOptions;
    type ecomV1OrderOrders_universal_d_CommitDeltasOptions = CommitDeltasOptions;
    type ecomV1OrderOrders_universal_d_BulkArchiveOrdersOptions = BulkArchiveOrdersOptions;
    type ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersOptions = BulkUnArchiveOrdersOptions;
    type ecomV1OrderOrders_universal_d_UpdateBuyerInfoOptions = UpdateBuyerInfoOptions;
    type ecomV1OrderOrders_universal_d_UpdateBuyerEmailOptions = UpdateBuyerEmailOptions;
    type ecomV1OrderOrders_universal_d_UpdateOrderShippingAddressOptions = UpdateOrderShippingAddressOptions;
    type ecomV1OrderOrders_universal_d_UpdateBillingContactDetailsOptions = UpdateBillingContactDetailsOptions;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItemIdentifiers = UpdateOrderLineItemIdentifiers;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItem = UpdateOrderLineItem;
    type ecomV1OrderOrders_universal_d_UpdateOrderLineItemOptions = UpdateOrderLineItemOptions;
    type ecomV1OrderOrders_universal_d_UpdateActivityIdentifiers = UpdateActivityIdentifiers;
    type ecomV1OrderOrders_universal_d_DeleteActivityIdentifiers = DeleteActivityIdentifiers;
    const ecomV1OrderOrders_universal_d_cancelOrder: typeof cancelOrder;
    type ecomV1OrderOrders_universal_d_CancelOrderOptions = CancelOrderOptions;
    type ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledOptions = BulkMarkAsFulfilledOptions;
    type ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledOptions = BulkMarkAsUnfulfilledOptions;
    type ecomV1OrderOrders_universal_d_AggregateOrdersOptions = AggregateOrdersOptions;
    type ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsOptions = BulkUpdateOrderTagsOptions;
    namespace ecomV1OrderOrders_universal_d {
        export { Order$1 as Order, ecomV1OrderOrders_universal_d_OrderLineItem as OrderLineItem, ProductName$4 as ProductName, CatalogReference$6 as CatalogReference, Price$1 as Price, DescriptionLine$4 as DescriptionLine, DescriptionLineValueOneOf$4 as DescriptionLineValueOneOf, DescriptionLineDescriptionLineValueOneOf$4 as DescriptionLineDescriptionLineValueOneOf, DescriptionLineName$4 as DescriptionLineName, PlainTextValue$4 as PlainTextValue, Color$4 as Color, DescriptionLineType$4 as DescriptionLineType, PhysicalProperties$4 as PhysicalProperties, ItemType$4 as ItemType, ItemTypeItemTypeDataOneOf$4 as ItemTypeItemTypeDataOneOf, ItemTypeItemType$4 as ItemTypeItemType, PaymentOptionType$4 as PaymentOptionType, ItemTaxFullDetails$4 as ItemTaxFullDetails, ecomV1OrderOrders_universal_d_LineItemTaxInfo as LineItemTaxInfo, ecomV1OrderOrders_universal_d_LineItemTaxBreakdown as LineItemTaxBreakdown, JurisdictionType$4 as JurisdictionType, DigitalFile$1 as DigitalFile, SubscriptionInfo$1 as SubscriptionInfo, SubscriptionSettings$5 as SubscriptionSettings, SubscriptionFrequency$5 as SubscriptionFrequency, PriceDescription$4 as PriceDescription, ecomV1OrderOrders_universal_d_LocationAndQuantity as LocationAndQuantity, BuyerInfo$6 as BuyerInfo, BuyerInfoIdOneOf$4 as BuyerInfoIdOneOf, PaymentStatus$1 as PaymentStatus, FulfillmentStatus$2 as FulfillmentStatus, WeightUnit$5 as WeightUnit, PriceSummary$4 as PriceSummary, AddressWithContact$4 as AddressWithContact, Address$5 as Address, StreetAddress$4 as StreetAddress, AddressLocation$4 as AddressLocation, FullAddressContactDetails$4 as FullAddressContactDetails, VatId$5 as VatId, VatType$5 as VatType, ShippingInformation$2 as ShippingInformation, DeliveryLogistics$4 as DeliveryLogistics, ecomV1OrderOrders_universal_d_DeliveryLogisticsAddressOneOf as DeliveryLogisticsAddressOneOf, PickupDetails$5 as PickupDetails, PickupAddress$2 as PickupAddress, PickupMethod$4 as PickupMethod, DeliveryTimeSlot$4 as DeliveryTimeSlot, ShippingPrice$4 as ShippingPrice, ShippingRegion$4 as ShippingRegion, ecomV1OrderOrders_universal_d_OrderStatus as OrderStatus, TaxSummary$4 as TaxSummary, ecomV1OrderOrders_universal_d_OrderTaxInfo as OrderTaxInfo, ecomV1OrderOrders_universal_d_OrderTaxBreakdown as OrderTaxBreakdown, AppliedDiscount$5 as AppliedDiscount, AppliedDiscountDiscountSourceOneOf$4 as AppliedDiscountDiscountSourceOneOf, DiscountType$5 as DiscountType, Coupon$4 as Coupon, MerchantDiscount$4 as MerchantDiscount, ecomV1OrderOrders_universal_d_MerchantDiscountMerchantDiscountReasonOneOf as MerchantDiscountMerchantDiscountReasonOneOf, ecomV1OrderOrders_universal_d_DiscountReason as DiscountReason, DiscountRule$5 as DiscountRule, DiscountRuleName$5 as DiscountRuleName, LineItemDiscount$4 as LineItemDiscount, Activity$1 as Activity, ecomV1OrderOrders_universal_d_ActivityContentOneOf as ActivityContentOneOf, ecomV1OrderOrders_universal_d_CustomActivity as CustomActivity, ecomV1OrderOrders_universal_d_MerchantComment as MerchantComment, OrderRefunded$1 as OrderRefunded, ecomV1OrderOrders_universal_d_OrderCreatedFromExchange as OrderCreatedFromExchange, ecomV1OrderOrders_universal_d_NewExchangeOrderCreated as NewExchangeOrderCreated, ecomV1OrderOrders_universal_d_LineItemExchangeData as LineItemExchangeData, ecomV1OrderOrders_universal_d_DraftOrderChangesApplied as DraftOrderChangesApplied, ecomV1OrderOrders_universal_d_OrderChange as OrderChange, ecomV1OrderOrders_universal_d_OrderChangeValueOneOf as OrderChangeValueOneOf, ecomV1OrderOrders_universal_d_LineItemChanges as LineItemChanges, ecomV1OrderOrders_universal_d_LineItemQuantityChange as LineItemQuantityChange, ecomV1OrderOrders_universal_d_LineItemQuantityChangeType as LineItemQuantityChangeType, ecomV1OrderOrders_universal_d_LineItemPriceChange as LineItemPriceChange, ecomV1OrderOrders_universal_d_ManagedLineItem as ManagedLineItem, ecomV1OrderOrders_universal_d_ManagedDiscount as ManagedDiscount, ecomV1OrderOrders_universal_d_TranslatedValue as TranslatedValue, ecomV1OrderOrders_universal_d_LineItemAmount as LineItemAmount, ecomV1OrderOrders_universal_d_ManagedAdditionalFee as ManagedAdditionalFee, ecomV1OrderOrders_universal_d_TotalPriceChange as TotalPriceChange, ecomV1OrderOrders_universal_d_SavedPaymentMethod as SavedPaymentMethod, ActivityType$1 as ActivityType, ecomV1OrderOrders_universal_d_AttributionSource as AttributionSource, CreatedBy$2 as CreatedBy, ecomV1OrderOrders_universal_d_CreatedByStringOneOf as CreatedByStringOneOf, ChannelInfo$2 as ChannelInfo, ChannelType$5 as ChannelType, CustomField$3 as CustomField, ecomV1OrderOrders_universal_d_BalanceSummary as BalanceSummary, ecomV1OrderOrders_universal_d_Balance as Balance, AdditionalFee$4 as AdditionalFee, ecomV1OrderOrders_universal_d_FulfillmentStatusesAggregate as FulfillmentStatusesAggregate, ExtendedFields$5 as ExtendedFields, ecomV1OrderOrders_universal_d_Tags as Tags, ecomV1OrderOrders_universal_d_TagList as TagList, ecomV1OrderOrders_universal_d_TriggerReindexOrderRequest as TriggerReindexOrderRequest, SnapshotMessage$1 as SnapshotMessage, ecomV1OrderOrders_universal_d_GetMetasiteDataRequest as GetMetasiteDataRequest, ecomV1OrderOrders_universal_d_GetMetasiteDataResponse as GetMetasiteDataResponse, ecomV1OrderOrders_universal_d_MetaSite as MetaSite, ecomV1OrderOrders_universal_d_App as App, ecomV1OrderOrders_universal_d_State as State, ecomV1OrderOrders_universal_d_Namespace as Namespace, ecomV1OrderOrders_universal_d_SeoData as SeoData, ecomV1OrderOrders_universal_d_MetaTag as MetaTag, ecomV1OrderOrders_universal_d_HtmlApplication as HtmlApplication, ecomV1OrderOrders_universal_d_ExternalUriMapping as ExternalUriMapping, ecomV1OrderOrders_universal_d_UserDataResponse as UserDataResponse, ecomV1OrderOrders_universal_d_QueryOrdersForMetasiteRequest as QueryOrdersForMetasiteRequest, ecomV1OrderOrders_universal_d_InternalQueryOrdersRequest as InternalQueryOrdersRequest, PlatformQuery$1 as PlatformQuery, PlatformQueryPagingMethodOneOf$1 as PlatformQueryPagingMethodOneOf, Sorting$2 as Sorting, SortOrder$2 as SortOrder, PlatformPaging$1 as PlatformPaging, CursorPaging$2 as CursorPaging, ecomV1OrderOrders_universal_d_QueryOrdersForMetasiteResponse as QueryOrdersForMetasiteResponse, PlatformPagingMetadata$1 as PlatformPagingMetadata, Cursors$2 as Cursors, ecomV1OrderOrders_universal_d_GetOrderForMetasiteRequest as GetOrderForMetasiteRequest, ecomV1OrderOrders_universal_d_GetOrderForMetasiteResponse as GetOrderForMetasiteResponse, ecomV1OrderOrders_universal_d_ListOrderTransactionsForMetasiteRequest as ListOrderTransactionsForMetasiteRequest, ecomV1OrderOrders_universal_d_ListOrderTransactionsForMetasiteResponse as ListOrderTransactionsForMetasiteResponse, OrderTransactions$1 as OrderTransactions, Payment$1 as Payment, PaymentPaymentDetailsOneOf$1 as PaymentPaymentDetailsOneOf, RegularPaymentDetails$1 as RegularPaymentDetails, TransactionStatus$1 as TransactionStatus, GiftCardPaymentDetails$1 as GiftCardPaymentDetails, MembershipPaymentDetails$1 as MembershipPaymentDetails, MembershipPaymentStatus$1 as MembershipPaymentStatus, MembershipName$5 as MembershipName, Refund$1 as Refund, RefundTransaction$1 as RefundTransaction, RefundStatus$1 as RefundStatus, RefundDetails$1 as RefundDetails, RefundItem$1 as RefundItem, ecomV1OrderOrders_universal_d_TestUrlAdditionalBindingsRequest as TestUrlAdditionalBindingsRequest, ecomV1OrderOrders_universal_d_TestUrlAdditionalBindingsResponse as TestUrlAdditionalBindingsResponse, MessageEnvelope$a as MessageEnvelope, IdentificationData$a as IdentificationData, IdentificationDataIdOneOf$a as IdentificationDataIdOneOf, WebhookIdentityType$a as WebhookIdentityType, ecomV1OrderOrders_universal_d_UpdateInternalDocumentsEvent as UpdateInternalDocumentsEvent, ecomV1OrderOrders_universal_d_UpdateInternalDocumentsEventOperationOneOf as UpdateInternalDocumentsEventOperationOneOf, ecomV1OrderOrders_universal_d_InternalDocument as InternalDocument, ecomV1OrderOrders_universal_d_InternalDocumentUpdateOperation as InternalDocumentUpdateOperation, ecomV1OrderOrders_universal_d_DeleteByIdsOperation as DeleteByIdsOperation, ecomV1OrderOrders_universal_d_DeleteByFilterOperation as DeleteByFilterOperation, ecomV1OrderOrders_universal_d_InternalDocumentUpdateByFilterOperation as InternalDocumentUpdateByFilterOperation, ecomV1OrderOrders_universal_d_InternalUpdateExistingOperation as InternalUpdateExistingOperation, ecomV1OrderOrders_universal_d_VersionedDocumentUpdateOperation as VersionedDocumentUpdateOperation, ecomV1OrderOrders_universal_d_VersioningMode as VersioningMode, ecomV1OrderOrders_universal_d_VersionedDeleteByIdsOperation as VersionedDeleteByIdsOperation, ecomV1OrderOrders_universal_d_VersionedDocumentId as VersionedDocumentId, ecomV1OrderOrders_universal_d_TriggerReindexRequest as TriggerReindexRequest, ecomV1OrderOrders_universal_d_TriggerReindexResponse as TriggerReindexResponse, DomainEvent$a as DomainEvent, DomainEventBodyOneOf$a as DomainEventBodyOneOf, EntityCreatedEvent$a as EntityCreatedEvent, EntityUpdatedEvent$a as EntityUpdatedEvent, EntityDeletedEvent$a as EntityDeletedEvent, ActionEvent$a as ActionEvent, Empty$6 as Empty, ecomV1OrderOrders_universal_d_BatchOfTriggerReindexOrderRequest as BatchOfTriggerReindexOrderRequest, ecomV1OrderOrders_universal_d_SendBuyerConfirmationEmailRequest as SendBuyerConfirmationEmailRequest, ecomV1OrderOrders_universal_d_SendBuyerConfirmationEmailResponse as SendBuyerConfirmationEmailResponse, ecomV1OrderOrders_universal_d_SendBuyerPaymentsReceivedEmailRequest as SendBuyerPaymentsReceivedEmailRequest, ecomV1OrderOrders_universal_d_SendBuyerPaymentsReceivedEmailResponse as SendBuyerPaymentsReceivedEmailResponse, ecomV1OrderOrders_universal_d_SendBuyerPickupConfirmationEmailRequest as SendBuyerPickupConfirmationEmailRequest, ecomV1OrderOrders_universal_d_SendBuyerPickupConfirmationEmailResponse as SendBuyerPickupConfirmationEmailResponse, ecomV1OrderOrders_universal_d_BulkSendBuyerPickupConfirmationEmailsRequest as BulkSendBuyerPickupConfirmationEmailsRequest, ecomV1OrderOrders_universal_d_BulkSendBuyerPickupConfirmationEmailsResponse as BulkSendBuyerPickupConfirmationEmailsResponse, ecomV1OrderOrders_universal_d_SendBuyerShippingConfirmationEmailRequest as SendBuyerShippingConfirmationEmailRequest, ecomV1OrderOrders_universal_d_SendBuyerShippingConfirmationEmailResponse as SendBuyerShippingConfirmationEmailResponse, ecomV1OrderOrders_universal_d_BulkSendBuyerShippingConfirmationEmailsRequest as BulkSendBuyerShippingConfirmationEmailsRequest, ecomV1OrderOrders_universal_d_BulkSendBuyerShippingConfirmationEmailsResponse as BulkSendBuyerShippingConfirmationEmailsResponse, ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedNotificationRequest as SendMerchantOrderReceivedNotificationRequest, ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedNotificationResponse as SendMerchantOrderReceivedNotificationResponse, ecomV1OrderOrders_universal_d_SendCancelRefundEmailRequest as SendCancelRefundEmailRequest, ecomV1OrderOrders_universal_d_SendCancelRefundEmailResponse as SendCancelRefundEmailResponse, ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedPushRequest as SendMerchantOrderReceivedPushRequest, ecomV1OrderOrders_universal_d_SendMerchantOrderReceivedPushResponse as SendMerchantOrderReceivedPushResponse, ecomV1OrderOrders_universal_d_PreviewEmailByTypeRequest as PreviewEmailByTypeRequest, ecomV1OrderOrders_universal_d_PreviewEmailType as PreviewEmailType, ecomV1OrderOrders_universal_d_PreviewEmailByTypeResponse as PreviewEmailByTypeResponse, ecomV1OrderOrders_universal_d_PreviewRefundEmailRequest as PreviewRefundEmailRequest, ecomV1OrderOrders_universal_d_PreviewRefundEmailResponse as PreviewRefundEmailResponse, ecomV1OrderOrders_universal_d_PreviewCancelEmailRequest as PreviewCancelEmailRequest, ecomV1OrderOrders_universal_d_PreviewCancelEmailResponse as PreviewCancelEmailResponse, ecomV1OrderOrders_universal_d_PreviewCancelRefundEmailRequest as PreviewCancelRefundEmailRequest, ecomV1OrderOrders_universal_d_PreviewCancelRefundEmailResponse as PreviewCancelRefundEmailResponse, ecomV1OrderOrders_universal_d_PreviewBuyerPaymentsReceivedEmailRequest as PreviewBuyerPaymentsReceivedEmailRequest, ecomV1OrderOrders_universal_d_PreviewBuyerPaymentsReceivedEmailResponse as PreviewBuyerPaymentsReceivedEmailResponse, ecomV1OrderOrders_universal_d_PreviewBuyerConfirmationEmailRequest as PreviewBuyerConfirmationEmailRequest, ecomV1OrderOrders_universal_d_PreviewBuyerConfirmationEmailResponse as PreviewBuyerConfirmationEmailResponse, ecomV1OrderOrders_universal_d_PreviewBuyerPickupConfirmationEmailRequest as PreviewBuyerPickupConfirmationEmailRequest, ecomV1OrderOrders_universal_d_PreviewBuyerPickupConfirmationEmailResponse as PreviewBuyerPickupConfirmationEmailResponse, ecomV1OrderOrders_universal_d_PreviewShippingConfirmationEmailRequest as PreviewShippingConfirmationEmailRequest, ecomV1OrderOrders_universal_d_PreviewShippingConfirmationEmailResponse as PreviewShippingConfirmationEmailResponse, ecomV1OrderOrders_universal_d_PreviewResendDownloadLinksEmailRequest as PreviewResendDownloadLinksEmailRequest, ecomV1OrderOrders_universal_d_PreviewResendDownloadLinksEmailResponse as PreviewResendDownloadLinksEmailResponse, ecomV1OrderOrders_universal_d_PreparePaymentCollectionRequest as PreparePaymentCollectionRequest, ecomV1OrderOrders_universal_d_PreparePaymentCollectionResponse as PreparePaymentCollectionResponse, ecomV1OrderOrders_universal_d_GetPaymentCollectabilityStatusRequest as GetPaymentCollectabilityStatusRequest, ecomV1OrderOrders_universal_d_GetPaymentCollectabilityStatusResponse as GetPaymentCollectabilityStatusResponse, ecomV1OrderOrders_universal_d_PaymentCollectabilityStatus as PaymentCollectabilityStatus, ecomV1OrderOrders_universal_d_RecordManuallyCollectedPaymentRequest as RecordManuallyCollectedPaymentRequest, ecomV1OrderOrders_universal_d_RecordManuallyCollectedPaymentResponse as RecordManuallyCollectedPaymentResponse, ecomV1OrderOrders_universal_d_MarkOrderAsPaidRequest as MarkOrderAsPaidRequest, ecomV1OrderOrders_universal_d_MarkOrderAsPaidResponse as MarkOrderAsPaidResponse, ecomV1OrderOrders_universal_d_PaymentStatusUpdated as PaymentStatusUpdated, ecomV1OrderOrders_universal_d_BulkMarkOrdersAsPaidRequest as BulkMarkOrdersAsPaidRequest, ecomV1OrderOrders_universal_d_BulkMarkOrdersAsPaidResponse as BulkMarkOrdersAsPaidResponse, ecomV1OrderOrders_universal_d_BulkOrderResult as BulkOrderResult, ItemMetadata$3 as ItemMetadata, ApplicationError$7 as ApplicationError, BulkActionMetadata$3 as BulkActionMetadata, GetRefundabilityStatusRequest$1 as GetRefundabilityStatusRequest, GetRefundabilityStatusResponse$1 as GetRefundabilityStatusResponse, Refundability$1 as Refundability, RefundabilityAdditionalRefundabilityInfoOneOf$1 as RefundabilityAdditionalRefundabilityInfoOneOf, RefundableStatus$1 as RefundableStatus, NonRefundableReason$1 as NonRefundableReason, ManuallyRefundableReason$1 as ManuallyRefundableReason, ecomV1OrderOrders_universal_d_CreatePaymentGatewayOrderRequest as CreatePaymentGatewayOrderRequest, ecomV1OrderOrders_universal_d_ChargedBy as ChargedBy, ecomV1OrderOrders_universal_d_CreatePaymentGatewayOrderResponse as CreatePaymentGatewayOrderResponse, ecomV1OrderOrders_universal_d_ChargeMembershipsRequest as ChargeMembershipsRequest, ecomV1OrderOrders_universal_d_MembershipChargeItem as MembershipChargeItem, ServiceProperties$4 as ServiceProperties, ecomV1OrderOrders_universal_d_ChargeMembershipsResponse as ChargeMembershipsResponse, TriggerRefundRequest$1 as TriggerRefundRequest, PaymentRefund$1 as PaymentRefund, RefundSideEffects$1 as RefundSideEffects, RestockInfo$1 as RestockInfo, RestockType$1 as RestockType, RestockItem$1 as RestockItem, TriggerRefundResponse$1 as TriggerRefundResponse, RefundCreated$1 as RefundCreated, CalculateRefundRequest$1 as CalculateRefundRequest, CalculateRefundItemRequest$1 as CalculateRefundItemRequest, CalculateRefundResponse$1 as CalculateRefundResponse, CalculateRefundItemResponse$1 as CalculateRefundItemResponse, DiffmatokyPayload$1 as DiffmatokyPayload, ErrorInformation$1 as ErrorInformation, ecomV1OrderOrders_universal_d_ContinueSideEffectsFlowInLegacyData as ContinueSideEffectsFlowInLegacyData, ecomV1OrderOrders_universal_d_OrdersExperiments as OrdersExperiments, IndexingMessage$1 as IndexingMessage, ecomV1OrderOrders_universal_d_GetOrderRequest as GetOrderRequest, ecomV1OrderOrders_universal_d_GetOrderResponse as GetOrderResponse, ecomV1OrderOrders_universal_d_InternalQueryOrdersResponse as InternalQueryOrdersResponse, ecomV1OrderOrders_universal_d_QueryOrderRequest as QueryOrderRequest, ecomV1OrderOrders_universal_d_QueryOrderResponse as QueryOrderResponse, ecomV1OrderOrders_universal_d_SearchOrdersRequest as SearchOrdersRequest, ecomV1OrderOrders_universal_d_CursorSearch as CursorSearch, ecomV1OrderOrders_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf, ecomV1OrderOrders_universal_d_SearchOrdersResponse as SearchOrdersResponse, CursorPagingMetadata$1 as CursorPagingMetadata, CreateOrderRequest$1 as CreateOrderRequest, CreateOrderResponse$1 as CreateOrderResponse, ecomV1OrderOrders_universal_d_UpdateOrderRequest as UpdateOrderRequest, ecomV1OrderOrders_universal_d_UpdateOrderResponse as UpdateOrderResponse, ecomV1OrderOrders_universal_d_BulkUpdateOrdersRequest as BulkUpdateOrdersRequest, ecomV1OrderOrders_universal_d_MaskedOrder as MaskedOrder, ecomV1OrderOrders_universal_d_BulkUpdateOrdersResponse as BulkUpdateOrdersResponse, ecomV1OrderOrders_universal_d_CommitDeltasRequest as CommitDeltasRequest, ecomV1OrderOrders_universal_d_DraftOrderDiffs as DraftOrderDiffs, ecomV1OrderOrders_universal_d_DraftOrderDiffsShippingUpdateInfoOneOf as DraftOrderDiffsShippingUpdateInfoOneOf, ecomV1OrderOrders_universal_d_V1LineItemDelta as V1LineItemDelta, ecomV1OrderOrders_universal_d_V1LineItemDeltaDeltaOneOf as V1LineItemDeltaDeltaOneOf, ecomV1OrderOrders_universal_d_OrderLineItemChangedDetails as OrderLineItemChangedDetails, ecomV1OrderOrders_universal_d_DeltaPaymentOptionType as DeltaPaymentOptionType, ecomV1OrderOrders_universal_d_ItemChangedDetails as ItemChangedDetails, ecomV1OrderOrders_universal_d_AppliedDiscountDelta as AppliedDiscountDelta, ecomV1OrderOrders_universal_d_AppliedDiscountDeltaDeltaOneOf as AppliedDiscountDeltaDeltaOneOf, ecomV1OrderOrders_universal_d_AdditionalFeeDelta as AdditionalFeeDelta, ecomV1OrderOrders_universal_d_AdditionalFeeDeltaDeltaOneOf as AdditionalFeeDeltaDeltaOneOf, ecomV1OrderOrders_universal_d_DraftOrderCommitSettings as DraftOrderCommitSettings, ecomV1OrderOrders_universal_d_InventoryUpdateDetails as InventoryUpdateDetails, ecomV1OrderOrders_universal_d_InventoryAction as InventoryAction, ecomV1OrderOrders_universal_d_CommitDeltasResponse as CommitDeltasResponse, ecomV1OrderOrders_universal_d_OrderDeltasCommitted as OrderDeltasCommitted, ecomV1OrderOrders_universal_d_CommittedDiffs as CommittedDiffs, ecomV1OrderOrders_universal_d_CommittedDiffsShippingUpdateInfoOneOf as CommittedDiffsShippingUpdateInfoOneOf, ecomV1OrderOrders_universal_d_LineItemDelta as LineItemDelta, ecomV1OrderOrders_universal_d_LineItemDeltaDeltaOneOf as LineItemDeltaDeltaOneOf, ecomV1OrderOrders_universal_d_ArchiveOrderRequest as ArchiveOrderRequest, ecomV1OrderOrders_universal_d_ArchiveOrderResponse as ArchiveOrderResponse, ecomV1OrderOrders_universal_d_BulkArchiveOrdersRequest as BulkArchiveOrdersRequest, ecomV1OrderOrders_universal_d_BulkArchiveOrdersResponse as BulkArchiveOrdersResponse, ecomV1OrderOrders_universal_d_BulkArchiveOrdersByFilterRequest as BulkArchiveOrdersByFilterRequest, ecomV1OrderOrders_universal_d_BulkArchiveOrdersByFilterResponse as BulkArchiveOrdersByFilterResponse, ecomV1OrderOrders_universal_d_UnArchiveOrderRequest as UnArchiveOrderRequest, ecomV1OrderOrders_universal_d_UnArchiveOrderResponse as UnArchiveOrderResponse, ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersRequest as BulkUnArchiveOrdersRequest, ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersResponse as BulkUnArchiveOrdersResponse, ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersByFilterRequest as BulkUnArchiveOrdersByFilterRequest, ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersByFilterResponse as BulkUnArchiveOrdersByFilterResponse, ecomV1OrderOrders_universal_d_UpdateBuyerInfoRequest as UpdateBuyerInfoRequest, ecomV1OrderOrders_universal_d_BuyerInfoUpdate as BuyerInfoUpdate, ecomV1OrderOrders_universal_d_UpdateBuyerInfoResponse as UpdateBuyerInfoResponse, ecomV1OrderOrders_universal_d_UpdateBuyerEmailRequest as UpdateBuyerEmailRequest, ecomV1OrderOrders_universal_d_UpdateBuyerEmailResponse as UpdateBuyerEmailResponse, ecomV1OrderOrders_universal_d_UpdateOrderShippingAddressRequest as UpdateOrderShippingAddressRequest, ecomV1OrderOrders_universal_d_UpdateOrderShippingAddressResponse as UpdateOrderShippingAddressResponse, ecomV1OrderOrders_universal_d_UpdateBillingContactDetailsRequest as UpdateBillingContactDetailsRequest, ecomV1OrderOrders_universal_d_UpdateBillingContactDetailsResponse as UpdateBillingContactDetailsResponse, ecomV1OrderOrders_universal_d_UpdateOrderLineItemRequest as UpdateOrderLineItemRequest, ecomV1OrderOrders_universal_d_UpdateOrderLineItemResponse as UpdateOrderLineItemResponse, ecomV1OrderOrders_universal_d_UpdateOrderLineItemsRequest as UpdateOrderLineItemsRequest, ecomV1OrderOrders_universal_d_MaskedOrderLineItem as MaskedOrderLineItem, ecomV1OrderOrders_universal_d_UpdateOrderLineItemsResponse as UpdateOrderLineItemsResponse, ecomV1OrderOrders_universal_d_AddInternalActivityRequest as AddInternalActivityRequest, ecomV1OrderOrders_universal_d_InternalActivity as InternalActivity, ecomV1OrderOrders_universal_d_InternalActivityContentOneOf as InternalActivityContentOneOf, ecomV1OrderOrders_universal_d_OrderPlaced as OrderPlaced, ecomV1OrderOrders_universal_d_OrderPaid as OrderPaid, ecomV1OrderOrders_universal_d_OrderFulfilled as OrderFulfilled, ecomV1OrderOrders_universal_d_OrderNotFulfilled as OrderNotFulfilled, ecomV1OrderOrders_universal_d_OrderCanceled as OrderCanceled, ecomV1OrderOrders_universal_d_DownloadLinkSent as DownloadLinkSent, ecomV1OrderOrders_universal_d_TrackingNumberAdded as TrackingNumberAdded, ecomV1OrderOrders_universal_d_TrackingNumberEdited as TrackingNumberEdited, ecomV1OrderOrders_universal_d_TrackingLinkAdded as TrackingLinkAdded, ecomV1OrderOrders_universal_d_ShippingConfirmationEmailSent as ShippingConfirmationEmailSent, ecomV1OrderOrders_universal_d_InvoiceAdded as InvoiceAdded, ecomV1OrderOrders_universal_d_InvoiceSent as InvoiceSent, ecomV1OrderOrders_universal_d_FulfillerEmailSent as FulfillerEmailSent, ecomV1OrderOrders_universal_d_ShippingAddressEdited as ShippingAddressEdited, ecomV1OrderOrders_universal_d_EmailEdited as EmailEdited, ecomV1OrderOrders_universal_d_PickupReadyEmailSent as PickupReadyEmailSent, ecomV1OrderOrders_universal_d_OrderPartiallyPaid as OrderPartiallyPaid, ecomV1OrderOrders_universal_d_AddInternalActivityResponse as AddInternalActivityResponse, ecomV1OrderOrders_universal_d_AddActivityRequest as AddActivityRequest, ecomV1OrderOrders_universal_d_PublicActivity as PublicActivity, ecomV1OrderOrders_universal_d_PublicActivityContentOneOf as PublicActivityContentOneOf, ecomV1OrderOrders_universal_d_AddActivityResponse as AddActivityResponse, ecomV1OrderOrders_universal_d_AddActivitiesRequest as AddActivitiesRequest, ecomV1OrderOrders_universal_d_AddActivitiesResponse as AddActivitiesResponse, ecomV1OrderOrders_universal_d_UpdateActivityRequest as UpdateActivityRequest, ecomV1OrderOrders_universal_d_UpdateActivityResponse as UpdateActivityResponse, ecomV1OrderOrders_universal_d_DeleteActivityRequest as DeleteActivityRequest, ecomV1OrderOrders_universal_d_DeleteActivityResponse as DeleteActivityResponse, ecomV1OrderOrders_universal_d_UpdateLineItemsDescriptionLinesRequest as UpdateLineItemsDescriptionLinesRequest, ecomV1OrderOrders_universal_d_LineItemUpdate as LineItemUpdate, ecomV1OrderOrders_universal_d_UpdateLineItemsDescriptionLinesResponse as UpdateLineItemsDescriptionLinesResponse, ecomV1OrderOrders_universal_d_MarkOrderAsSeenByHumanRequest as MarkOrderAsSeenByHumanRequest, ecomV1OrderOrders_universal_d_MarkOrderAsSeenByHumanResponse as MarkOrderAsSeenByHumanResponse, ecomV1OrderOrders_universal_d_CancelOrderRequest as CancelOrderRequest, ecomV1OrderOrders_universal_d_CancelOrderResponse as CancelOrderResponse, ecomV1OrderOrders_universal_d_OrderCanceledEventOrderCanceled as OrderCanceledEventOrderCanceled, ecomV1OrderOrders_universal_d_MarkAsFulfilledRequest as MarkAsFulfilledRequest, ecomV1OrderOrders_universal_d_MarkAsFulfilledResponse as MarkAsFulfilledResponse, ecomV1OrderOrders_universal_d_FulfillmentStatusUpdated as FulfillmentStatusUpdated, ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledRequest as BulkMarkAsFulfilledRequest, ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledResponse as BulkMarkAsFulfilledResponse, ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledByFilterRequest as BulkMarkAsFulfilledByFilterRequest, ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledByFilterResponse as BulkMarkAsFulfilledByFilterResponse, ecomV1OrderOrders_universal_d_MarkAsUnfulfilledRequest as MarkAsUnfulfilledRequest, ecomV1OrderOrders_universal_d_MarkAsUnfulfilledResponse as MarkAsUnfulfilledResponse, ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledRequest as BulkMarkAsUnfulfilledRequest, ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledResponse as BulkMarkAsUnfulfilledResponse, ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledByFilterRequest as BulkMarkAsUnfulfilledByFilterRequest, ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledByFilterResponse as BulkMarkAsUnfulfilledByFilterResponse, ecomV1OrderOrders_universal_d_V1MarkOrderAsPaidRequest as V1MarkOrderAsPaidRequest, ecomV1OrderOrders_universal_d_V1MarkOrderAsPaidResponse as V1MarkOrderAsPaidResponse, ecomV1OrderOrders_universal_d_V1BulkMarkOrdersAsPaidRequest as V1BulkMarkOrdersAsPaidRequest, ecomV1OrderOrders_universal_d_V1BulkMarkOrdersAsPaidResponse as V1BulkMarkOrdersAsPaidResponse, ecomV1OrderOrders_universal_d_V1CreatePaymentGatewayOrderRequest as V1CreatePaymentGatewayOrderRequest, ecomV1OrderOrders_universal_d_V1CreatePaymentGatewayOrderResponse as V1CreatePaymentGatewayOrderResponse, ecomV1OrderOrders_universal_d_GetShipmentsRequest as GetShipmentsRequest, ecomV1OrderOrders_universal_d_GetShipmentsResponse as GetShipmentsResponse, ecomV1OrderOrders_universal_d_AggregateOrdersRequest as AggregateOrdersRequest, ecomV1OrderOrders_universal_d_AggregateOrdersResponse as AggregateOrdersResponse, ecomV1OrderOrders_universal_d_DecrementItemsQuantityRequest as DecrementItemsQuantityRequest, ecomV1OrderOrders_universal_d_DecrementData as DecrementData, ecomV1OrderOrders_universal_d_DecrementItemsQuantityResponse as DecrementItemsQuantityResponse, ecomV1OrderOrders_universal_d_OrderItemsRestocked as OrderItemsRestocked, ecomV1OrderOrders_universal_d_V1RestockItem as V1RestockItem, ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsRequest as BulkUpdateOrderTagsRequest, ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsResponse as BulkUpdateOrderTagsResponse, ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsResult as BulkUpdateOrderTagsResult, ecomV1OrderOrders_universal_d_OrderApproved as OrderApproved, ecomV1OrderOrders_universal_d_Task as Task, ecomV1OrderOrders_universal_d_TaskKey as TaskKey, ecomV1OrderOrders_universal_d_TaskAction as TaskAction, ecomV1OrderOrders_universal_d_TaskActionActionOneOf as TaskActionActionOneOf, ecomV1OrderOrders_universal_d_Complete as Complete, ecomV1OrderOrders_universal_d_Cancel as Cancel, ecomV1OrderOrders_universal_d_Reschedule as Reschedule, ecomV1OrderOrders_universal_d_InvoiceSentEvent as InvoiceSentEvent, ecomV1OrderOrders_universal_d_IdAndVersion as IdAndVersion, ecomV1OrderOrders_universal_d_InvoiceFields as InvoiceFields, ecomV1OrderOrders_universal_d_Customer as Customer, ecomV1OrderOrders_universal_d_Email as Email, ecomV1OrderOrders_universal_d_QuotesAddress as QuotesAddress, ecomV1OrderOrders_universal_d_AddressDescription as AddressDescription, ecomV1OrderOrders_universal_d_Placement as Placement, ecomV1OrderOrders_universal_d_Phone as Phone, ecomV1OrderOrders_universal_d_Company as Company, ecomV1OrderOrders_universal_d_CommonAddress as CommonAddress, ecomV1OrderOrders_universal_d_CommonAddressStreetOneOf as CommonAddressStreetOneOf, ecomV1OrderOrders_universal_d_Subdivision as Subdivision, ecomV1OrderOrders_universal_d_SubdivisionType as SubdivisionType, ecomV1OrderOrders_universal_d_StandardDetails as StandardDetails, ecomV1OrderOrders_universal_d_InvoiceDates as InvoiceDates, ecomV1OrderOrders_universal_d_LineItems as LineItems, LineItem$6 as LineItem, ecomV1OrderOrders_universal_d_BigDecimalWrapper as BigDecimalWrapper, ecomV1OrderOrders_universal_d_LineItemTax as LineItemTax, ecomV1OrderOrders_universal_d_Source as Source, ecomV1OrderOrders_universal_d_SourceType as SourceType, ecomV1OrderOrders_universal_d_LineItemMetaData as LineItemMetaData, ecomV1OrderOrders_universal_d_Locale as Locale, ecomV1OrderOrders_universal_d_TotalPrice as TotalPrice, ecomV1OrderOrders_universal_d_ItemizedFee as ItemizedFee, Discount$3 as Discount, ecomV1OrderOrders_universal_d_DiscountOneDiscountTypeOneOf as DiscountOneDiscountTypeOneOf, ecomV1OrderOrders_universal_d_CalculatedTaxes as CalculatedTaxes, ecomV1OrderOrders_universal_d_CalculatedTax as CalculatedTax, ecomV1OrderOrders_universal_d_Payments as Payments, ecomV1OrderOrders_universal_d_InvoicesPayment as InvoicesPayment, ecomV1OrderOrders_universal_d_MetaData as MetaData, ecomV1OrderOrders_universal_d_InvoiceDynamicPriceTotals as InvoiceDynamicPriceTotals, ecomV1OrderOrders_universal_d_CustomFieldValue as CustomFieldValue, ecomV1OrderOrders_universal_d_CustomFieldGroup as CustomFieldGroup, ecomV1OrderOrders_universal_d_Value as Value, ecomV1OrderOrders_universal_d_ValueType as ValueType, ecomV1OrderOrders_universal_d_Deposit as Deposit, ecomV1OrderOrders_universal_d_DepositType as DepositType, ecomV1OrderOrders_universal_d_InvoiceStatus as InvoiceStatus, ecomV1OrderOrders_universal_d_TriggerSideEffectsFromLegacyData as TriggerSideEffectsFromLegacyData, ecomV1OrderOrders_universal_d_QueryOrdersForMetasiteOptions as QueryOrdersForMetasiteOptions, ecomV1OrderOrders_universal_d_GetOrderForMetasiteIdentifiers as GetOrderForMetasiteIdentifiers, ecomV1OrderOrders_universal_d_ListOrderTransactionsForMetasiteIdentifiers as ListOrderTransactionsForMetasiteIdentifiers, ecomV1OrderOrders_universal_d_TriggerReindexOptions as TriggerReindexOptions, ecomV1OrderOrders_universal_d_BulkSendBuyerPickupConfirmationEmailsOptions as BulkSendBuyerPickupConfirmationEmailsOptions, ecomV1OrderOrders_universal_d_BulkSendBuyerShippingConfirmationEmailsOptions as BulkSendBuyerShippingConfirmationEmailsOptions, ecomV1OrderOrders_universal_d_SendCancelRefundEmailOptions as SendCancelRefundEmailOptions, ecomV1OrderOrders_universal_d_PreviewRefundEmailOptions as PreviewRefundEmailOptions, ecomV1OrderOrders_universal_d_PreviewCancelEmailOptions as PreviewCancelEmailOptions, ecomV1OrderOrders_universal_d_PreviewCancelRefundEmailOptions as PreviewCancelRefundEmailOptions, ecomV1OrderOrders_universal_d_PreparePaymentCollectionOptions as PreparePaymentCollectionOptions, ecomV1OrderOrders_universal_d_PaymentCollectionCreatePaymentGatewayOrderOptions as PaymentCollectionCreatePaymentGatewayOrderOptions, ecomV1OrderOrders_universal_d_ChargeMembershipsOptions as ChargeMembershipsOptions, TriggerRefundOptions$1 as TriggerRefundOptions, CalculateRefundOptions$1 as CalculateRefundOptions, ecomV1OrderOrders_universal_d_getOrder as getOrder, ecomV1OrderOrders_universal_d_InternalQueryOrdersOptions as InternalQueryOrdersOptions, ecomV1OrderOrders_universal_d_OrdersQueryResult as OrdersQueryResult, ecomV1OrderOrders_universal_d_OrdersQueryBuilder as OrdersQueryBuilder, ecomV1OrderOrders_universal_d_searchOrders as searchOrders, ecomV1OrderOrders_universal_d_SearchOrdersOptions as SearchOrdersOptions, createOrder$1 as createOrder, ecomV1OrderOrders_universal_d_updateOrder as updateOrder, ecomV1OrderOrders_universal_d_UpdateOrder as UpdateOrder, ecomV1OrderOrders_universal_d_UpdateOrderOptions as UpdateOrderOptions, ecomV1OrderOrders_universal_d_BulkUpdateOrdersOptions as BulkUpdateOrdersOptions, ecomV1OrderOrders_universal_d_CommitDeltasOptions as CommitDeltasOptions, ecomV1OrderOrders_universal_d_BulkArchiveOrdersOptions as BulkArchiveOrdersOptions, ecomV1OrderOrders_universal_d_BulkUnArchiveOrdersOptions as BulkUnArchiveOrdersOptions, ecomV1OrderOrders_universal_d_UpdateBuyerInfoOptions as UpdateBuyerInfoOptions, ecomV1OrderOrders_universal_d_UpdateBuyerEmailOptions as UpdateBuyerEmailOptions, ecomV1OrderOrders_universal_d_UpdateOrderShippingAddressOptions as UpdateOrderShippingAddressOptions, ecomV1OrderOrders_universal_d_UpdateBillingContactDetailsOptions as UpdateBillingContactDetailsOptions, ecomV1OrderOrders_universal_d_UpdateOrderLineItemIdentifiers as UpdateOrderLineItemIdentifiers, ecomV1OrderOrders_universal_d_UpdateOrderLineItem as UpdateOrderLineItem, ecomV1OrderOrders_universal_d_UpdateOrderLineItemOptions as UpdateOrderLineItemOptions, ecomV1OrderOrders_universal_d_UpdateActivityIdentifiers as UpdateActivityIdentifiers, ecomV1OrderOrders_universal_d_DeleteActivityIdentifiers as DeleteActivityIdentifiers, ecomV1OrderOrders_universal_d_cancelOrder as cancelOrder, ecomV1OrderOrders_universal_d_CancelOrderOptions as CancelOrderOptions, ecomV1OrderOrders_universal_d_BulkMarkAsFulfilledOptions as BulkMarkAsFulfilledOptions, ecomV1OrderOrders_universal_d_BulkMarkAsUnfulfilledOptions as BulkMarkAsUnfulfilledOptions, ecomV1OrderOrders_universal_d_AggregateOrdersOptions as AggregateOrdersOptions, ecomV1OrderOrders_universal_d_BulkUpdateOrderTagsOptions as BulkUpdateOrderTagsOptions, };
    }
    interface Checkout$1 {
        /**
         * Checkout ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Line items.
         *
         * Max: 300 items
         * @readonly
         */
        lineItems?: LineItem$5[];
        /** Billing information. */
        billingInfo?: AddressWithContact$3;
        /** Shipping information. */
        shippingInfo?: ShippingInfo$2;
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /** Buyer information. */
        buyerInfo?: BuyerInfo$5;
        /**
         * All converted prices are displayed in this currency in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         * @readonly
         */
        conversionCurrency?: string;
        /**
         * Calculated price summary for the checkout.
         * @readonly
         */
        priceSummary?: PriceSummary$3;
        /**
         * Errors when calculating totals.
         * @readonly
         */
        calculationErrors?: CalculationErrors$3;
        /**
         * Applied gift card details.
         *
         * >**Note:** Gift cards are supported through the Wix UI, though the service plugin is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
         * @readonly
         */
        giftCard?: GiftCard$4;
        /**
         * Applied discounts.
         * @readonly
         */
        appliedDiscounts?: AppliedDiscount$4[];
        /** Custom fields. */
        customFields?: CustomField$2[];
        /**
         * Weight measurement unit - defaults to site's weight unit.
         * @readonly
         */
        weightUnit?: WeightUnit$4;
        /**
         * Tax summary.
         * @readonly
         */
        taxSummary?: TaxSummary$3;
        /**
         * The currency used when submitting the order.
         * @readonly
         */
        currency?: string;
        /**
         * Sales channel that submitted the order.
         * + `"UNSPECIFIED"`: Unspecified sales channel. This value is not supported.
         * + `"WEB"`: A web client.
         * + `"POS"`: [Point of sale solutions](https://support.wix.com/en/wix-mobile-pos-2196395)
         * + `"EBAY"`: [eBay](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-ebay-shop)
         * + `"AMAZON"`: [Amazon](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-amazon-shop)
         * + `"WISH"`: [Wish](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-a-wish-shop)
         * + `"WIX_INVOICES"`: Wix Invoices app in [your dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Finvoices/settings/general-settings)
         * + `"WIX_APP_STORE"`: [Wix Owner app](https://support.wix.com/article/wix-owner-app-an-overview)
         * + `"BACKOFFICE_MERCHANT"`: Wix merchant backoffice
         * + `"OTHER_PLATFORM"`: Other sales platform.
         * @readonly
         */
        channelType?: ChannelType$4;
        /**
         * Site language in which original values are shown.
         * @readonly
         */
        siteLanguage?: string;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         * @readonly
         */
        buyerLanguage?: string;
        /**
         * Whether an order was successfully created from this checkout.
         * For an order to be successful, it must be successfully paid for (unless the total is 0).
         * @readonly
         */
        completed?: boolean;
        /**
         * Whether tax is included in line item prices.
         * @readonly
         */
        taxIncludedInPrice?: boolean;
        /**
         * ID of the checkout's initiator.
         * @readonly
         */
        createdBy?: CreatedBy$1;
        /**
         * Date and time the checkout was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the checkout was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Minimal amount to pay in order to place the order.
         * @readonly
         */
        payNow?: PriceSummary$3;
        /**
         * Remaining amount for the order to be fully paid.
         * @readonly
         */
        payLater?: PriceSummary$3;
        /** Memberships to apply when creating the order. */
        membershipOptions?: MembershipOptions$3;
        /** Additional Fees. */
        additionalFees?: AdditionalFee$3[];
        /** Cart ID that this checkout was created from. Empty if this checkout wasn't created from a cart. */
        cartId?: string | null;
        /**
         * List of validation violations raised by the [Validations Custom Extension SPI](https://www.wix.com/velo/reference/spis/wix-ecom/ecom-validations/introduction).
         * @readonly
         */
        violations?: Violation$3[];
        /**
         * Custom field data for the checkout object.
         *
         * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
         */
        extendedFields?: ExtendedFields$4;
        /**
         * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
         * @readonly
         */
        purchaseFlowId?: string | null;
        /**
         * Additional settings for customization of the checkout process.
         *
         * Custom settings can only be defined when [creating a checkout](https://www.wix.com/velo/reference/wix-ecom-backend/checkout/createcheckout).
         */
        customSettings?: CustomSettings$1;
    }
    interface LineItem$5 {
        /**
         * Line item ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Item quantity.
         *
         * Min: `"1"`
         * Max: `"100000"`
         */
        quantity?: number;
        /** Catalog and item reference. Holds IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$5;
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         * @readonly
         */
        productName?: ProductName$3;
        /**
         * URL to the item's page on the site.
         * @readonly
         */
        url?: string;
        /**
         * Item price **after** catalog-defined discount and line item discounts.
         * @readonly
         */
        price?: MultiCurrencyPrice$4;
        /**
         * Total line item price **after** catalog-defined discount and line item discounts.
         * @readonly
         */
        lineItemPrice?: MultiCurrencyPrice$4;
        /**
         * Item price **before** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        fullPrice?: MultiCurrencyPrice$4;
        /**
         * Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        priceBeforeDiscounts?: MultiCurrencyPrice$4;
        /**
         * Total price after all discounts and tax.
         * @readonly
         */
        totalPriceAfterTax?: MultiCurrencyPrice$4;
        /**
         * Total price after discounts, and before tax.
         * @readonly
         */
        totalPriceBeforeTax?: MultiCurrencyPrice$4;
        /**
         * Tax details for this line item.
         * @readonly
         */
        taxDetails?: ItemTaxFullDetails$3;
        /**
         * Discount for this line item's entire quantity.
         * @readonly
         */
        discount?: MultiCurrencyPrice$4;
        /**
         * Line item description lines. Used for displaying the cart, checkout and order.
         * @readonly
         */
        descriptionLines?: DescriptionLine$3[];
        /**
         * Line item image details.
         * @readonly
         */
        media?: string;
        /**
         * Item availability details.
         * @readonly
         */
        availability?: ItemAvailabilityInfo$3;
        /**
         * Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability.
         * @readonly
         */
        physicalProperties?: PhysicalProperties$3;
        /**
         * Item type. Either a preset type or custom.
         * @readonly
         */
        itemType?: ItemType$3;
        /**
         * Type of selected payment option for current item. Defaults to `"FULL_PAYMENT_ONLINE"`.
         * + `"FULL_PAYMENT_ONLINE"`: The entire payment for this item happens as part of the checkout.
         * + `"FULL_PAYMENT_OFFLINE"`: The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `"MEMBERSHIP"`: Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `"DEPOSIT_ONLINE"`: Partial payment for the given item to be paid upfront during the checkout. Amount to be paid is defined by deposit_amount field.
         * @readonly
         */
        paymentOption?: PaymentOptionType$3;
        /**
         * Service properties. When relevant, this contains information such as date and number of participants.
         * @readonly
         */
        serviceProperties?: ServiceProperties$3;
        /**
         * In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + In most cases, this field has the same value as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         * @readonly
         */
        rootCatalogItemId?: string | null;
        /**
         * Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67".
         * @readonly
         */
        priceDescription?: PriceDescription$3;
        /**
         * Partial payment to be paid upfront during the checkout. Eligible for catalog items with `lineItem.paymentOption` type `DEPOSIT_ONLINE` only.
         * @readonly
         */
        depositAmount?: MultiCurrencyPrice$4;
        /**
         * Item payment policy that requires customer consent to complete purchase. The payment policy will be displayed on the checkout page.
         * @readonly
         */
        consentRequiredPaymentPolicy?: string | null;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$5 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs.
         *
         * Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from your Wix Stores catalog, learn more about [eCommerce integration](https://www.wix.com/velo/reference/wix-stores-backend/ecommerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface ProductName$3 {
        /**
         * __Required.__ Item name in the site's default language.
         *
         * Min: 1 character.
         * Max: 200 characters.
         */
        original?: string;
        /**
         * Item name translated into the buyer's language.
         *
         * Min: 1 character.
         * Max: 400 characters.
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface MultiCurrencyPrice$4 {
        /** Amount. */
        amount?: string;
        /**
         * Converted amount.
         * @readonly
         */
        convertedAmount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
        /**
         * Converted amount formatted with currency symbol.
         * @readonly
         */
        formattedConvertedAmount?: string;
    }
    interface ItemTaxFullDetails$3 {
        /** Amount for which tax is calculated. */
        taxableAmount?: MultiCurrencyPrice$4;
        /** Tax rate %, as a decimal point between 0 and 1. */
        taxRate?: string;
        /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
        totalTax?: MultiCurrencyPrice$4;
        /**
         * If breakdown exists, the sum of rates in the breakdown must equal `tax_rate`. Deprecated - use 'tax_breakdown' instead.
         * @readonly
         */
        rateBreakdown?: TaxRateBreakdown$3[];
    }
    interface TaxRateBreakdown$3 {
        /** Name of tax against which the calculation was performed. */
        name?: string;
        /** Rate at which this tax detail was calculated. */
        rate?: string;
        /** Amount of tax for this tax detail. */
        tax?: MultiCurrencyPrice$4;
    }
    /**
     * TaxBreakdown represents tax information for a line item.
     * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
     */
    interface TaxBreakdown$3 {
        /** The name of the jurisdiction to which this tax detail applies. For example, "New York" or "Quebec". */
        jurisdiction?: string | null;
        /** The amount of this line item price that was considered nontaxable. (Decimal value) */
        nonTaxableAmount?: MultiCurrencyPrice$4;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.0000 signifies 200% tax. (Decimal value) */
        rate?: string | null;
        /** The amount of tax estimated for this line item. (Decimal value) */
        taxAmount?: MultiCurrencyPrice$4;
        /** The taxable amount of this line item. */
        taxableAmount?: MultiCurrencyPrice$4;
        /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
        taxType?: string | null;
        /**
         * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
         * This name should be explicit enough to allow the merchant to understand what tax was calculated.
         */
        taxName?: string | null;
        /** The type of the jurisdiction in which this tax detail applies. */
        jurisdictionType?: JurisdictionType$3;
    }
    /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
    enum JurisdictionType$3 {
        UNDEFINED = "UNDEFINED",
        COUNTRY = "COUNTRY",
        STATE = "STATE",
        COUNTY = "COUNTY",
        CITY = "CITY",
        SPECIAL = "SPECIAL"
    }
    interface DescriptionLine$3 extends DescriptionLineValueOneOf$3, DescriptionLineDescriptionLineValueOneOf$3 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$3;
        /** Description line color value. */
        colorInfo?: Color$3;
        /** Description line name. */
        name?: DescriptionLineName$3;
    }
    /** @oneof */
    interface DescriptionLineValueOneOf$3 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$3;
        /** Description line color value. */
        colorInfo?: Color$3;
    }
    /** @oneof */
    interface DescriptionLineDescriptionLineValueOneOf$3 {
    }
    interface DescriptionLineName$3 {
        /** Description line name in the site's default language. */
        original?: string;
        /**
         * Description line name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface PlainTextValue$3 {
        /** Description line plain text value in the site's default language. */
        original?: string;
        /**
         * Description line plain text value translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Color$3 {
        /** Description line color name in the site's default language. */
        original?: string;
        /**
         * Description line color name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
        /** HEX or RGB color code for display. */
        code?: string | null;
    }
    enum DescriptionLineType$3 {
        UNRECOGNISED = "UNRECOGNISED",
        PLAIN_TEXT = "PLAIN_TEXT",
        COLOR = "COLOR"
    }
    interface ItemAvailabilityInfo$3 {
        /**
         * Item availability status.
         * + `"NOT_FOUND"`: Item does not exist
         * + `"NOT_AVAILABLE"`: Item not in stock
         * + `"PARTIALLY_AVAILABLE"`: Available quantity is less than requested
         */
        status?: ItemAvailabilityStatus$3;
        /** Quantity available. */
        quantityAvailable?: number | null;
    }
    enum ItemAvailabilityStatus$3 {
        AVAILABLE = "AVAILABLE",
        NOT_FOUND = "NOT_FOUND",
        /** Not in stock */
        NOT_AVAILABLE = "NOT_AVAILABLE",
        /** Available quantity is less than requested */
        PARTIALLY_AVAILABLE = "PARTIALLY_AVAILABLE"
    }
    interface PhysicalProperties$3 {
        /** Line item weight. Measurement unit (`"KG"` or `"LB"`) is taken from `order.weightUnit`. */
        weight?: number | null;
        /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
        sku?: string | null;
        /** Whether this line item is shippable. */
        shippable?: boolean;
    }
    interface Scope$4 {
        /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
        namespace?: string;
        /** Coupon scope's applied group (e.g., event or ticket in Wix Events) */
        group?: Group$3;
    }
    interface Group$3 {
        /** Coupon scope's group (e.g., product or collection in Wix Stores). See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
        name?: string;
        /** Item ID (when the coupon scope is limited to just one item). */
        entityId?: string | null;
    }
    interface ItemType$3 extends ItemTypeItemTypeDataOneOf$3 {
        /** Preset item type. */
        preset?: ItemTypeItemType$3;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    /** @oneof */
    interface ItemTypeItemTypeDataOneOf$3 {
        /** Preset item type. */
        preset?: ItemTypeItemType$3;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    enum ItemTypeItemType$3 {
        UNRECOGNISED = "UNRECOGNISED",
        PHYSICAL = "PHYSICAL",
        DIGITAL = "DIGITAL",
        GIFT_CARD = "GIFT_CARD",
        SERVICE = "SERVICE"
    }
    interface SubscriptionOptionInfo$4 {
        /** Subscription option settings. */
        subscriptionSettings?: SubscriptionSettings$4;
        /** Subscription option title. */
        title?: Title$3;
        /** Subscription option description. */
        description?: Description$3;
    }
    interface SubscriptionSettings$4 {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency$4;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal` is `true`. */
        billingCycles?: number | null;
    }
    /** Frequency unit of recurring payment */
    enum SubscriptionFrequency$4 {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface Title$3 {
        /** Subscription option name in the site's default language. */
        original?: string;
        /**
         * Subscription option name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Description$3 {
        /** Subscription option description. */
        original?: string;
        /** Translated subscription option description. */
        translated?: string | null;
    }
    interface SecuredMedia$3 {
        /** Media ID in Wix Media Manager. */
        _id?: string;
        /** Original filename. */
        fileName?: string;
        /** File type. */
        fileType?: FileType$3;
    }
    enum FileType$3 {
        UNSPECIFIED = "UNSPECIFIED",
        SECURE_PICTURE = "SECURE_PICTURE",
        SECURE_VIDEO = "SECURE_VIDEO",
        SECURE_DOCUMENT = "SECURE_DOCUMENT",
        SECURE_MUSIC = "SECURE_MUSIC",
        SECURE_ARCHIVE = "SECURE_ARCHIVE"
    }
    /** Type of selected payment option for catalog item */
    enum PaymentOptionType$3 {
        /** The entire payment for this item happens as part of the checkout. */
        FULL_PAYMENT_ONLINE = "FULL_PAYMENT_ONLINE",
        /** The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods. */
        FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
        /** Payment for this item is done by charging a membership. When selected, `price` is `0`. */
        MEMBERSHIP = "MEMBERSHIP",
        /** Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`. */
        DEPOSIT_ONLINE = "DEPOSIT_ONLINE",
        /** Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`. */
        MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
    }
    interface ServiceProperties$3 {
        /**
         * Date and time the service is to be provided, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * For example, the start time of a class.
         */
        scheduledDate?: Date;
        /** The number of people participating in the service. For example, the number of people attending a class or the number of people per hotel room. */
        numberOfParticipants?: number | null;
    }
    interface PriceDescription$3 {
        /** __Required.__ Price description in the site's default language. */
        original?: string;
        /**
         * Price description translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface CatalogOverrideFields$3 {
        /** Item product name */
        productName?: ProductName$3;
        /** Item price **after** discounts. */
        price?: string | null;
        /** Item price **before** discount. */
        fullPrice?: string | null;
        /** Line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine$3[];
        /** Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability. */
        physicalProperties?: PhysicalProperties$3;
        /** Line item image details. */
        image?: string;
    }
    /** Billing Info and shipping details */
    interface AddressWithContact$3 {
        /** Address. */
        address?: ApiAddress;
        /** Contact details. */
        contactDetails?: FullAddressContactDetails$3;
    }
    /** Physical address */
    interface ApiAddress {
        /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
        country?: string | null;
        /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Postal or zip code. */
        postalCode?: string | null;
        /** Street address. */
        streetAddress?: StreetAddress$3;
        /** Main address line (usually street name and number). */
        addressLine1?: string | null;
        /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
        addressLine2?: string | null;
    }
    interface StreetAddress$3 {
        /** Street number. */
        number?: string;
        /** Street name. */
        name?: string;
    }
    interface AddressLocation$3 {
        /** Address latitude. */
        latitude?: number | null;
        /** Address longitude. */
        longitude?: number | null;
    }
    /** Full contact details for an address */
    interface FullAddressContactDetails$3 {
        /** First name. */
        firstName?: string | null;
        /** Last name. */
        lastName?: string | null;
        /** Phone number. */
        phone?: string | null;
        /** Company name. */
        company?: string | null;
        /** Tax information (for Brazil only). If ID is provided, `vatId.type` must also be set, `UNSPECIFIED` is not allowed. */
        vatId?: CommonVatId;
    }
    interface CommonVatId {
        /** Customer's tax ID. */
        _id?: string;
        /**
         * Tax type.
         *
         * Supported values:
         * + `CPF`: for individual tax payers
         * + `CNPJ`: for corporations
         */
        type?: CommonVatType;
    }
    /** tax info types */
    enum CommonVatType {
        UNSPECIFIED = "UNSPECIFIED",
        /** CPF - for individual tax payers. */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface ShippingInfo$2 {
        /** Shipping address and contact details. */
        shippingDestination?: AddressWithContact$3;
        /** Selected option out of the options allowed for the `region`. */
        selectedCarrierServiceOption?: SelectedCarrierServiceOption$3;
        /**
         * Shipping region. Based on the address provided.
         * @readonly
         */
        region?: ShippingRegion$3;
        /**
         * All carrier options for this shipping rule.
         * @readonly
         */
        carrierServiceOptions?: CarrierServiceOption$3[];
    }
    interface SelectedCarrierServiceOption$3 {
        /** Unique identifier of selected option. For example, "usps_std_overnight". */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         * @readonly
         */
        title?: string;
        /**
         * Delivery logistics.
         * @readonly
         */
        logistics?: DeliveryLogistics$3;
        /**
         * Shipping costs.
         * @readonly
         */
        cost?: SelectedCarrierServiceOptionPrices$3;
        /**
         * Were we able to find the requested shipping option, or otherwise we fallback to the default one (the first)
         * @readonly
         */
        requestedShippingOption?: boolean;
        /** Other charges */
        otherCharges?: SelectedCarrierServiceOptionOtherCharge$3[];
        /** This carrier's unique ID */
        carrierId?: string | null;
    }
    interface DeliveryLogistics$3 {
        /** Expected delivery time, in free text. For example, "3-5 business days". */
        deliveryTime?: string | null;
        /** Instructions for caller, e.g for pickup: "Please deliver during opening hours, and please don't park in disabled parking spot". */
        instructions?: string | null;
        /** Pickup details. */
        pickupDetails?: PickupDetails$4;
    }
    interface PickupDetails$4 {
        /** Pickup address. */
        address?: ApiAddress;
        /** Whether the pickup address is that of a business - this may effect tax calculation. */
        businessLocation?: boolean;
        /** Pickup method */
        pickupMethod?: PickupMethod$3;
    }
    enum PickupMethod$3 {
        UNKNOWN_METHOD = "UNKNOWN_METHOD",
        STORE_PICKUP = "STORE_PICKUP",
        PICKUP_POINT = "PICKUP_POINT"
    }
    interface DeliveryTimeSlot$3 {
        /** starting time of the delivery time slot */
        from?: Date;
        /** ending time of the delivery time slot */
        to?: Date;
    }
    interface SelectedCarrierServiceOptionPrices$3 {
        /** Total shipping price, after discount and after tax. */
        totalPriceAfterTax?: MultiCurrencyPrice$4;
        /** Total price of shipping after discounts (when relevant), and before tax. */
        totalPriceBeforeTax?: MultiCurrencyPrice$4;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$3;
        /** Shipping discount before tax. */
        totalDiscount?: MultiCurrencyPrice$4;
        /** Shipping price before discount and before tax. */
        price?: MultiCurrencyPrice$4;
    }
    interface SelectedCarrierServiceOptionOtherCharge$3 {
        /** Type of additional cost. */
        type?: ChargeType$3;
        /** Details of the charge, such as 'Full Coverage Insurance of up to 80% of value of shipment'. */
        details?: string | null;
        /** Price of added charge. */
        cost?: SelectedCarrierServiceOptionPrices$3;
    }
    enum ChargeType$3 {
        HANDLING_FEE = "HANDLING_FEE",
        INSURANCE = "INSURANCE"
    }
    interface ShippingRegion$3 {
        /**
         * Shipping region ID.
         * @readonly
         */
        _id?: string;
        /** Shipping region name. */
        name?: string;
    }
    interface CarrierServiceOption$3 {
        /** Carrier ID. */
        carrierId?: string;
        /** Shipping options offered by this carrier for this request. */
        shippingOptions?: ShippingOption$3[];
    }
    interface ShippingOption$3 {
        /**
         * Unique code of provided shipping option like "usps_std_overnight".
         * For legacy calculators this would be the UUID of the option.
         */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         */
        title?: string;
        /** Delivery logistics. */
        logistics?: DeliveryLogistics$3;
        /** Sipping price information. */
        cost?: ShippingPrice$3;
    }
    interface ShippingPrice$3 {
        /** Shipping price. */
        price?: MultiCurrencyPrice$4;
        /** Other costs such as insurance, handling & packaging for fragile items, etc. */
        otherCharges?: OtherCharge$3[];
    }
    interface OtherCharge$3 {
        /** Type of additional cost. */
        type?: ChargeType$3;
        /** Price of added cost. */
        price?: MultiCurrencyPrice$4;
    }
    interface BuyerInfo$5 extends BuyerInfoIdOneOf$3 {
        /**
         * Visitor ID - if the buyer is **not** a site member.
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID - If the buyer is a site member.
         * @readonly
         */
        memberId?: string;
        /**
         * Contact ID. For more information, see the Contacts API.
         * @readonly
         */
        contactId?: string | null;
        /** Buyer email address. */
        email?: string | null;
    }
    /** @oneof */
    interface BuyerInfoIdOneOf$3 {
        /**
         * Visitor ID - if the buyer is **not** a site member.
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID - If the buyer is a site member.
         * @readonly
         */
        memberId?: string;
    }
    interface PriceSummary$3 {
        /** Subtotal of all line items, before discounts and before tax. */
        subtotal?: MultiCurrencyPrice$4;
        /** Total shipping price, before discounts and before tax. */
        shipping?: MultiCurrencyPrice$4;
        /** Total tax. */
        tax?: MultiCurrencyPrice$4;
        /** Total calculated discount value. */
        discount?: MultiCurrencyPrice$4;
        /** Total price after discounts, gift cards, and tax. */
        total?: MultiCurrencyPrice$4;
        /** Total additional fees price before tax. */
        additionalFees?: MultiCurrencyPrice$4;
    }
    interface CalculationErrors$3 extends CalculationErrorsShippingCalculationErrorOneOf$3 {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details$3;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors$3;
        /** Tax calculation error. */
        taxCalculationError?: Details$3;
        /** Coupon calculation error. */
        couponCalculationError?: Details$3;
        /** Gift card calculation error. */
        giftCardCalculationError?: Details$3;
        /** Order validation errors. */
        orderValidationErrors?: ApplicationError$6[];
        /**
         * Membership payment methods calculation errors
         * For example, will indicate that a line item that must be paid with membership payment doesn't have one or selected memberships are invalid
         */
        membershipError?: Details$3;
        /** Discount Rule calculation error. */
        discountsCalculationError?: Details$3;
    }
    /** @oneof */
    interface CalculationErrorsShippingCalculationErrorOneOf$3 {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details$3;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors$3;
    }
    interface Details$3 extends DetailsKindOneOf$3 {
        applicationError?: ApplicationError$6;
        validationError?: ValidationError$3;
        systemError?: SystemError$3;
        /** deprecated in API's - to enable migration from rendering arbitrary tracing to rest response */
        tracing?: Record<string, string>;
    }
    /** @oneof */
    interface DetailsKindOneOf$3 {
        applicationError?: ApplicationError$6;
        validationError?: ValidationError$3;
        systemError?: SystemError$3;
    }
    interface ApplicationError$6 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    /**
     * example result:
     * {
     * "fieldViolations": [
     * {
     * "field": "fieldA",
     * "description": "invalid music note. supported notes: [do,re,mi,fa,sol,la,ti]",
     * "violatedRule": "OTHER",
     * "ruleName": "INVALID_NOTE",
     * "data": {
     * "value": "FI"
     * }
     * },
     * {
     * "field": "fieldB",
     * "description": "field value out of range. supported range: [0-20]",
     * "violatedRule": "MAX",
     * "data": {
     * "threshold": 20
     * }
     * },
     * {
     * "field": "fieldC",
     * "description": "invalid phone number. provide a valid phone number of size: [7-12], supported characters: [0-9, +, -, (, )]",
     * "violatedRule": "FORMAT",
     * "data": {
     * "type": "PHONE"
     * }
     * }
     * ]
     * }
     */
    interface ValidationError$3 {
        fieldViolations?: FieldViolation$3[];
    }
    enum RuleType$3 {
        VALIDATION = "VALIDATION",
        OTHER = "OTHER",
        MAX = "MAX",
        MIN = "MIN",
        MAX_LENGTH = "MAX_LENGTH",
        MIN_LENGTH = "MIN_LENGTH",
        MAX_SIZE = "MAX_SIZE",
        MIN_SIZE = "MIN_SIZE",
        FORMAT = "FORMAT",
        DECIMAL_LTE = "DECIMAL_LTE",
        DECIMAL_GTE = "DECIMAL_GTE",
        DECIMAL_LT = "DECIMAL_LT",
        DECIMAL_GT = "DECIMAL_GT",
        DECIMAL_MAX_SCALE = "DECIMAL_MAX_SCALE",
        INVALID_ENUM_VALUE = "INVALID_ENUM_VALUE",
        REQUIRED_FIELD = "REQUIRED_FIELD",
        FIELD_NOT_ALLOWED = "FIELD_NOT_ALLOWED",
        ONE_OF_ALIGNMENT = "ONE_OF_ALIGNMENT"
    }
    interface FieldViolation$3 {
        field?: string;
        description?: string;
        violatedRule?: RuleType$3;
        /** applicable when violated_rule=OTHER */
        ruleName?: string | null;
        data?: Record<string, any> | null;
    }
    interface SystemError$3 {
        /** Error code. */
        errorCode?: string | null;
    }
    interface CarrierErrors$3 {
        /** Carrier errors. */
        errors?: CarrierError$3[];
    }
    interface CarrierError$3 {
        /** Carrier ID. */
        carrierId?: string;
        /** Error details. */
        error?: Details$3;
    }
    interface GiftCard$4 {
        /** Gift Card ID. */
        _id?: string;
        /** Gift card obfuscated code. */
        obfuscatedCode?: string;
        /** Gift card value. */
        amount?: MultiCurrencyPrice$4;
        /** App ID of the gift card provider. */
        appId?: string;
    }
    interface AppliedDiscount$4 extends AppliedDiscountDiscountSourceOneOf$3 {
        /** Coupon details. */
        coupon?: Coupon$3;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$3;
        /** Discount rule */
        discountRule?: DiscountRule$4;
        /** Discount type. */
        discountType?: DiscountType$4;
        /** IDs of the line items the discount applies to. */
        lineItemIds?: string[];
    }
    /** @oneof */
    interface AppliedDiscountDiscountSourceOneOf$3 {
        /** Coupon details. */
        coupon?: Coupon$3;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$3;
        /** Discount rule */
        discountRule?: DiscountRule$4;
    }
    enum DiscountType$4 {
        GLOBAL = "GLOBAL",
        SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
        SHIPPING = "SHIPPING"
    }
    /** Coupon */
    interface Coupon$3 {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
        /** Coupon value. */
        amount?: MultiCurrencyPrice$4;
        /** Coupon name. */
        name?: string;
    }
    interface MerchantDiscount$3 {
        /** Discount value. */
        amount?: MultiCurrencyPrice$4;
        /** Discount Percentage. Will be calculated from items price before other discounts. */
        percentage?: number | null;
    }
    interface DiscountRule$4 {
        /** Discount rule ID */
        _id?: string;
        /** Discount rule name */
        name?: DiscountRuleName$4;
        /** Discount value. */
        amount?: MultiCurrencyPrice$4;
    }
    interface DiscountRuleName$4 {
        /** Original discount rule name (in site's default language). */
        original?: string;
        /** Translated discount rule name according to buyer language. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface LineItemDiscount$3 {
        /** ID of line item the discount applies to. */
        _id?: string;
        /** Discount value. */
        totalDiscountAmount?: MultiCurrencyPrice$4;
    }
    interface CustomField$2 {
        /** Custom field value. */
        value?: any;
        /** Custom field title. */
        title?: string;
        /** Translated custom field title. */
        translatedTitle?: string | null;
    }
    enum WeightUnit$4 {
        /** Weight unit can't be classified, due to an error */
        UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
        /** Kilograms */
        KG = "KG",
        /** Pounds */
        LB = "LB"
    }
    interface TaxSummary$3 {
        /**
         * Amount for which tax is calculated, added from line items.
         * @readonly
         */
        taxableAmount?: MultiCurrencyPrice$4;
        /**
         * Calculated tax, added from line items.
         * @readonly
         */
        totalTax?: MultiCurrencyPrice$4;
        /** Tax calculator that was active when the order was created. */
        calculationDetails?: TaxCalculationDetails$3;
    }
    interface TaxCalculationDetails$3 extends TaxCalculationDetailsCalculationDetailsOneOf$3 {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason$3;
        /** Details of the fallback rate calculation. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails$3;
        /** Rate calculation type. */
        rateType?: RateType$3;
    }
    /** @oneof */
    interface TaxCalculationDetailsCalculationDetailsOneOf$3 {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason$3;
        /** Details of the fallback rate calculation. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails$3;
    }
    enum RateType$3 {
        /** no tax being collected for this request due to location of purchase */
        NO_TAX_COLLECTED = "NO_TAX_COLLECTED",
        /** manual rate used for calculation */
        MANUAL_RATE = "MANUAL_RATE",
        /** autotax rate used for calculation */
        AUTO_RATE = "AUTO_RATE",
        /** fallback rate used for calculation */
        FALLBACK_RATE = "FALLBACK_RATE"
    }
    enum ManualCalculationReason$3 {
        /** user set calculator in Business Manager to be Manual */
        GLOBAL_SETTING_TO_MANUAL = "GLOBAL_SETTING_TO_MANUAL",
        /** specific region is on manual even though Global setting is Auto-tax */
        REGION_SETTING_TO_MANUAL = "REGION_SETTING_TO_MANUAL"
    }
    interface AutoTaxFallbackCalculationDetails$3 {
        /** reason for fallback */
        fallbackReason?: FallbackReason$3;
        /** invalid request (i.e. address), timeout, internal error, license error, and others will be encoded here */
        error?: ApplicationError$6;
    }
    enum FallbackReason$3 {
        /** auto-tax failed to be calculated */
        AUTO_TAX_FAILED = "AUTO_TAX_FAILED",
        /** auto-tax was temporarily deactivated on a system-level */
        AUTO_TAX_DEACTIVATED = "AUTO_TAX_DEACTIVATED"
    }
    /**
     * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
     * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
     */
    interface AggregatedTaxBreakdown$3 {
        /** The name of the tax against which this tax amount was calculated. */
        taxName?: string;
        /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
        taxType?: string;
        /** The name of the jurisdiction in which this tax detail applies. */
        jurisdiction?: string;
        /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
        jurisdictionTypeEnum?: JurisdictionType$3;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.000 signifies 200% tax. (Decimal value) */
        rate?: string;
        /** The sum of all the tax from line items that calculated by the tax identifiers. */
        aggregatedTaxAmount?: MultiCurrencyPrice$4;
    }
    enum ChannelType$4 {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        POS = "POS",
        EBAY = "EBAY",
        AMAZON = "AMAZON",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE",
        WIX_INVOICES = "WIX_INVOICES",
        BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
        WISH = "WISH",
        CLASS_PASS = "CLASS_PASS",
        GLOBAL_E = "GLOBAL_E",
        FACEBOOK = "FACEBOOK",
        ETSY = "ETSY",
        TIKTOK = "TIKTOK",
        FAIRE_COM = "FAIRE_COM"
    }
    interface CreatedBy$1 extends CreatedByIdOneOf$1 {
        /**
         * User ID - when the order was created by a Wix user on behalf of a buyer.
         * For example, via POS (point of service).
         */
        userId?: string;
        /** Member ID - when the order was created by a **logged in** site visitor. */
        memberId?: string;
        /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
        visitorId?: string;
        /** App ID - when the order was created by an external application or Wix service. */
        appId?: string;
    }
    /** @oneof */
    interface CreatedByIdOneOf$1 {
        /**
         * User ID - when the order was created by a Wix user on behalf of a buyer.
         * For example, via POS (point of service).
         */
        userId?: string;
        /** Member ID - when the order was created by a **logged in** site visitor. */
        memberId?: string;
        /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
        visitorId?: string;
        /** App ID - when the order was created by an external application or Wix service. */
        appId?: string;
    }
    /** Reserved for internal use. */
    interface MembershipOptions$3 {
        /**
         * Reserved for internal use.
         * @readonly
         */
        eligibleMemberships?: Membership$3[];
        /**
         * Reserved for internal use.
         * @readonly
         */
        invalidMemberships?: InvalidMembership$3[];
        /** Selected membership to apply to this checkout. */
        selectedMemberships?: SelectedMemberships$3;
    }
    interface Membership$3 {
        /** Membership ID. */
        _id?: string;
        /** ID of the application providing this payment option. */
        appId?: string;
        /** The name of this membership. */
        name?: MembershipName$4;
        /** Line item IDs which are "paid for" by this membership. */
        lineItemIds?: string[];
        /** Optional - For a membership that has limited credits, information about credit usage. */
        credits?: MembershipPaymentCredits$3;
        /** Optional - TMembership expiry date. */
        expirationDate?: Date;
        /** Additional data about this membership. */
        additionalData?: Record<string, any> | null;
    }
    interface MembershipName$4 {
        /** The name of this membership */
        original?: string;
        /** Optional - Translated name of this membership. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface MembershipPaymentCredits$3 {
        /** How much credit this membership has in total */
        total?: number;
        /** How much credit remained for this membership */
        remaining?: number;
    }
    interface InvalidMembership$3 {
        /** Membership details. */
        membership?: Membership$3;
        /** Reason why this membership is invalid and cannot be used. */
        reason?: string;
    }
    interface SelectedMemberships$3 {
        /** Selected memberships. */
        memberships?: SelectedMembership$3[];
    }
    interface SelectedMembership$3 {
        /** Membership ID. */
        _id?: string;
        /** ID of the app providing this payment option. */
        appId?: string;
        /** IDs of the line items this membership applies to. */
        lineItemIds?: string[];
    }
    interface AdditionalFee$3 {
        /** Additional fee's unique code (or ID) for future processing. */
        code?: string | null;
        /** Translated additional fee's name. */
        name?: string;
        /** Additional fee's price. */
        price?: MultiCurrencyPrice$4;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$3;
        /** Provider's app id. */
        providerAppId?: string | null;
        /** Additional fee's price before tax. */
        priceBeforeTax?: MultiCurrencyPrice$4;
        /**
         * Optional - Line items associated with this additional fee.
         * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
         */
        lineItemIds?: string[];
    }
    interface ConversionInfo$1 {
        /**
         * The site currency.
         * @readonly
         */
        siteCurrency?: string;
        /**
         * The rate used when converting from the site currency to the checkout currency.
         * @readonly
         */
        conversionRate?: string;
    }
    interface Violation$3 {
        /** Severity of the violation. The violations are shown on the cart and checkout pages. A warning is displayed as yellow, and allows a site visitor to proceed with caution. An error is displayed as red, and doesn't allow a site visitor to proceed with the eCommerce flow. */
        severity?: Severity$3;
        /** Target location on a checkout or cart page where the violation will be displayed. */
        target?: Target$3;
        /** Violation description. Can include rich text. Only HTTP or HTTPS links in the following format are allowed: `<a href="https://www.wix.com">Click me</a>`. */
        description?: string | null;
    }
    enum Severity$3 {
        /** The user is allowed to move forward in the flow. */
        WARNING = "WARNING",
        /**
         * The user is blocked from moving forward in the flow.
         * For example, if callerContext is CART - moving to checkout is blocked. if callerContext is CHECKOUT, placing an order is blocked.
         */
        ERROR = "ERROR"
    }
    interface Target$3 extends TargetTargetTypeOneOf$3 {
        /** General (other) violation. */
        other?: Other$3;
        /** Specific line item violation. */
        lineItem?: TargetLineItem$3;
    }
    /** @oneof */
    interface TargetTargetTypeOneOf$3 {
        /** General (other) violation. */
        other?: Other$3;
        /** Specific line item violation. */
        lineItem?: TargetLineItem$3;
    }
    /** Available locations on the webpage */
    enum NameInOther$3 {
        /** default location, in case no specific location is specified */
        OTHER_DEFAULT = "OTHER_DEFAULT"
    }
    /** Available locations on the line item */
    enum NameInLineItem$3 {
        /** default location, in case no specific location is specified */
        LINE_ITEM_DEFAULT = "LINE_ITEM_DEFAULT"
    }
    /** General (other) violation. */
    interface Other$3 {
        /** Location on a checkout or a cart page where a general (other) violation will be displayed. */
        name?: NameInOther$3;
    }
    /** Specific line item violation. */
    interface TargetLineItem$3 {
        /** Location on a checkout or a cart page where the specific line item violation will be displayed. */
        name?: NameInLineItem$3;
        /** ID of the line item containing the violation. */
        _id?: string | null;
    }
    interface ExtendedFields$4 {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    interface CustomSettings$1 {
        /**
         * Whether to restrict the option to add or remove a gift card on the checkout page.
         *
         * Default: `false`
         */
        lockGiftCard?: boolean;
        /**
         * Whether to restrict the option to add or remove a coupon code on the checkout page.
         *
         * Default: `false`
         */
        lockCouponCode?: boolean;
    }
    interface UpdatedCheckoutMessage {
        /** Previous checkout. */
        oldCheckout?: Checkout$1;
        /** Updated checkout. */
        updatedCheckout?: Checkout$1;
    }
    interface CreateCheckoutRequest$2 {
        /** Checkout information. */
        checkoutInfo?: Checkout$1;
        /** The code of an existing coupon to apply to checkout. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Line items to be added to checkout. */
        lineItems?: LineItem$5[];
        /**
         * **Required**
         *  Sales channel type.
         */
        channelType: ChannelType$4;
        /**
         * Gift card code.
         *
         * The checkout can only hold 1 `giftCardCode` at a time. If an additional `giftCardCode` is added, it will override the existing `giftCardCode`.
         *
         * >**Note:** Gift cards are supported through the Wix UI, though the service plugin is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
         */
        giftCardCode?: string | null;
        /**
         * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
         *
         * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
         */
        overrideCheckoutUrl?: string | null;
    }
    interface CustomLineItem$3 {
        /**
         * Custom line item quantity.
         *
         * Min: `1`
         * Max: `100000`
         */
        quantity?: number;
        /** Custom line item price. For security reasons, the `price` field should come from backend Velo code, and not be passed from the frontend. */
        price?: string;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription$3;
        /** Custom line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine$3[];
        /**
         * Custom line item media.
         * + Link to an image/video from the [Wix Media Manager](https://support.wix.com/en/article/wix-media-about-the-media-manager) - `"wix:image://v1/3c76e2_c53...4ea4~mv2.jpg#originWidth=1000&originHeight=1000"`.
         * + An image from the web - `"http(s)://<image url>"`.
         */
        media?: string;
        /**
         * Custom line item ID. If passed, `id` must be unique.
         * Default: auto-generated ID.
         */
        _id?: string | null;
        /** Tax group ID for this custom line item. */
        taxGroupId?: string | null;
        /**
         * *Required** - Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName$3;
        /**
         * Optional - URL to the item's page on the site. When not provided, the link back from the cart page to the relevant product page will not work.
         * The URL is optional and if not provided, the site URL will be used.
         */
        url?: string;
        /** *Required** - Item type. Either a preset type or custom. */
        itemType?: ItemType$3;
        /** Optional - Item price **before** catalog-defined discount. Defaults to `price` when not provided. */
        fullPrice?: string | null;
        /**
         * Optional - Item quantity available for purchase. Only return this if inventory is managed.
         * Not returning this field means that the buyer can "infinitely" tick up the number of items in the cart.
         */
        quantityAvailable?: number | null;
        /** Optional - Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties$3;
        /**
         * Optional - Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE` - Entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE` - Entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `DEPOSIT_ONLINE` -  Partial payment for the given item to be paid upfront during the checkout. Amount to be paid is defined by deposit_amount field.
         */
        paymentOption?: PaymentOptionType$3;
        /**
         * Optional - Service properties. When relevant, this contains information such as date and number of participants.
         * Used, among other things, when checking for valid memberships.
         */
        serviceProperties?: ServiceProperties$3;
        /**
         * Optional - In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + in most cases, this field is the name as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         */
        rootCatalogItemId?: string | null;
        /**
         * Optional - partial payment for the given item to be paid upfront during the checkout.
         * Eligible for catalog items with type `DEPOSIT_ONLINE`.
         * If omitted - item's price will not be split and is expected to be paid in single installment
         */
        depositAmount?: string | null;
        /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$5;
    }
    interface MerchantDiscountInput$2 {
        /** Discount amount. */
        amount?: string;
        /** IDs of the line items the discount applies to. */
        lineItemIds?: string[];
    }
    interface CreateCheckoutResponse$2 {
        /** Newly created checkout. */
        checkout?: Checkout$1;
    }
    interface ShippingCalculationErrorData extends ShippingCalculationErrorDataShippingCalculationErrorOneOf {
        generalShippingCalculationError?: Details$3;
        carrierErrors?: CarrierErrors$3;
    }
    /** @oneof */
    interface ShippingCalculationErrorDataShippingCalculationErrorOneOf {
        generalShippingCalculationError?: Details$3;
        carrierErrors?: CarrierErrors$3;
    }
    interface GetCheckoutRequest {
        /** Checkout ID. */
        _id: string;
    }
    interface GetCheckoutResponse {
        /** The requested checkout. */
        checkout?: Checkout$1;
    }
    interface GetCheckoutWithAllExtendedFieldsRequest {
        /** Checkout ID. */
        _id?: string;
    }
    interface GetCheckoutWithAllExtendedFieldsResponse {
        /** The requested checkout. */
        checkout?: Checkout$1;
    }
    interface GetCheckoutByCartIdRequest {
        /** Cart ID. */
        _id: string;
    }
    interface GetCheckoutByCartIdResponse {
        /** The requested checkout. */
        checkout?: Checkout$1;
    }
    interface GetWixCheckoutURLRequest {
        /** Checkout ID. */
        _id: string;
    }
    interface GetWixCheckoutURLResponse {
        /** Checkout URL. */
        checkoutUrl?: string;
    }
    interface GetCheckoutURLRequest {
        /** Checkout ID. */
        _id: string;
    }
    interface GetCheckoutURLResponse {
        /** Checkout URL. */
        checkoutUrl?: string;
    }
    interface UpdateCheckoutRequest {
        /** Checkout information. */
        checkout: Checkout$1;
        /** The code of an existing coupon to apply to checkout. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Gift card code. */
        giftCardCode?: string | null;
        /**
         * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
         *
         * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
         */
        overrideCheckoutUrl?: string | null;
    }
    interface UpdateCheckoutResponse {
        /** Updated checkout. */
        checkout?: Checkout$1;
    }
    interface RemoveCouponRequest$2 {
        /** ID of the checkout to remove the coupon from. */
        _id: string;
    }
    interface RemoveCouponResponse$2 {
        /** Updated checkout after removal of coupon. */
        checkout?: Checkout$1;
    }
    interface RemoveGiftCardRequest {
        /** ID of the checkout to remove the gift card from. */
        _id: string;
    }
    interface RemoveGiftCardResponse {
        /** Updated checkout after removal of gift card. */
        checkout?: Checkout$1;
    }
    interface RemoveOverrideCheckoutUrlRequest {
        /** ID of the checkout to remove the override checkout url from. */
        _id: string;
    }
    interface RemoveOverrideCheckoutUrlResponse {
        /** Updated checkout after removal of override checkout url. */
        checkout?: Checkout$1;
    }
    interface AddToCheckoutRequest {
        /** Checkout ID. */
        _id: string;
        /** Catalog line items. */
        lineItems?: LineItem$5[];
    }
    interface AddToCheckoutResponse {
        /** Updated checkout. */
        checkout?: Checkout$1;
    }
    interface RemoveLineItemsRequest$2 {
        /** ID of the checkout to remove line items from. */
        _id: string;
        /** IDs of the line items to remove from the checkout. */
        lineItemIds: string[];
    }
    interface RemoveLineItemsResponse$2 {
        /** Updated checkout after removal of line items. */
        checkout?: Checkout$1;
    }
    interface CreateOrderRequest {
        /** Checkout ID. */
        _id: string;
    }
    interface CreateOrderResponse extends CreateOrderResponseIdOneOf {
        /** ID of the newly created order. */
        orderId?: string;
        /** ID of newly created subscription. Learn more about your site's [Subscriptions](https://support.wix.com/en/article/wix-stores-managing-product-subscriptions). */
        subscriptionId?: string;
        /**
         * Payment gateway order ID.
         *
         * For online orders, pass this value as the `paymentId` parameter to the Wix Pay [`startPayment()`](https://www.wix.com/velo/reference/wix-pay-frontend/startpayment) function so your customer can pay for the order.
         *
         * This field will be returned if money needs to be charged. In some cases, money cannot be charged:
         * + When the total price (the `priceSummary.total.amount` field in the checkout/order objects) is 0. For example, in the case of a free item or an item with a 100% discount.
         * + If the total price is not 0, but the payment is covered by alternative payment methods, such as a gift card.
         */
        paymentGatewayOrderId?: string | null;
    }
    /** @oneof */
    interface CreateOrderResponseIdOneOf {
        /** ID of newly created order. */
        orderId?: string;
        /** ID of newly created subscription. Learn more about your site's [Subscriptions](https://support.wix.com/en/article/wix-stores-managing-product-subscriptions). */
        subscriptionId?: string;
    }
    interface PaymentErrorResponseData {
        paymentResponseToken?: string | null;
        transactionStatus?: string;
        failureDetails?: string | null;
    }
    interface DoublePaymentErrorData extends DoublePaymentErrorDataIdOneOf {
        orderId?: string;
        subscriptionId?: string;
    }
    /** @oneof */
    interface DoublePaymentErrorDataIdOneOf {
        orderId?: string;
        subscriptionId?: string;
    }
    interface RedeemErrorData {
        reason?: string;
    }
    interface ViolationsList {
        /** Violations risen by ValidationsSPI implementers. */
        violations?: Violation$3[];
    }
    interface CreateOrderAndChargeRequest {
        /** Checkout ID. */
        _id: string;
        /** Payment token. */
        paymentToken?: string | null;
    }
    interface CreateOrderAndChargeResponse extends CreateOrderAndChargeResponseIdOneOf {
        /** ID of newly created order. */
        orderId?: string;
        /** ID of newly created subscription. */
        subscriptionId?: string;
        /** Payment response token. */
        paymentResponseToken?: string | null;
        /**
         * For online orders, send this value as a parameter to the Wix Pay [`startPayment()`](https://www.wix.com/velo/reference/wix-pay/startpayment) function to enable your buyer to pay for the order.
         * `paymentGatewayOrderId` will be returned if money needs to be charged.
         *
         * In some cases, money should not be charged:
         * + If the total price is 0. For example, in the case of a free item or an item with 100% discount.
         * + If the total price is not 0, but the payment is covered by alternative payment methods, such as a gift card.
         */
        paymentGatewayOrderId?: string | null;
    }
    /** @oneof */
    interface CreateOrderAndChargeResponseIdOneOf {
        /** ID of newly created order. */
        orderId?: string;
        /** ID of newly created subscription. */
        subscriptionId?: string;
    }
    interface MarkCheckoutAsCompletedRequest {
        /** Checkout ID. */
        _id: string;
    }
    interface MarkCheckoutAsCompletedResponse {
    }
    /** Triggered when buyer successfully completed checkout flow */
    interface CheckoutMarkedAsCompleted {
        checkout?: Checkout$1;
    }
    interface UpdateLineItemsQuantityRequest$2 {
        /** Checkout ID. */
        _id: string;
        /** Line item info to update. */
        lineItems: LineItemQuantityUpdate$2[];
    }
    interface LineItemQuantityUpdate$2 {
        /** ID of the line item to update. */
        _id?: string;
        /**
         * New total amount of the line item,
         * not the amount to add to the current `quantity`.
         *
         * Min: `1`
         *
         * Max: `100000`
         */
        quantity?: number;
    }
    interface UpdateLineItemsQuantityResponse$2 {
        /** Updated checkout. */
        checkout?: Checkout$1;
    }
    interface SubscriptionCreated {
        subscription?: Subscription;
    }
    interface Subscription {
        /**
         * Subscription id (auto-generated upon subscription creation)
         * @readonly
         */
        _id?: string;
        /** id of subscription in external system */
        externalId?: string | null;
        /**
         * Subscription creation date
         * @readonly
         */
        dateCreated?: Date;
        /** The id of the cart this order was created from */
        cartId?: string | null;
        /** The id of the checkout this subscriptions was created from */
        checkoutId?: string | null;
        /** member or contact */
        buyerInfo?: V1BuyerInfo;
        /** Line items ordered */
        lineItems?: V1LineItem$1[];
        /** Totals for subscription's line items */
        totals?: Totals$1;
        /** site settings at the moment when subscription created */
        storeSettings?: StoreSettings;
        /** Full billing address */
        billingAddress?: Address$4;
        /** Delivery information */
        shippingInfo?: V1ShippingInfo;
        /** Coupon that was applied to subscription */
        appliedCoupon?: AppliedCoupon$1;
        /** Message from the customer (e.g., customization request) */
        buyerNote?: string | null;
        /** Custom field */
        customField?: V1CustomField;
        /** Information about subscription option from which subscription was created */
        subscriptionOptionInfo?: V1SubscriptionOptionInfo;
        /** Sales channel that submitted this subscription */
        channelInfo?: ChannelInfo$1;
        /** defines when subscriber will be charged: for frequency=MONTH, billingCycles=6, interval=2 payment will be done every 2 month during one year */
        subscriptionSettings?: V1SubscriptionSettings;
        /**
         * information about first subscription payment
         * @readonly
         */
        billingInfo?: BillingInfo$1;
    }
    /** Buyer Info */
    interface V1BuyerInfo {
        /** Wix customer ID */
        _id?: string;
        /** Customer type */
        identityType?: IdentityType$2;
    }
    enum IdentityType$2 {
        UNSPECIFIED_IDENTITY_TYPE = "UNSPECIFIED_IDENTITY_TYPE",
        /** Site member */
        MEMBER = "MEMBER",
        /** Contact */
        CONTACT = "CONTACT"
    }
    interface V1LineItem$1 {
        /** Line item ID (auto-generated) */
        index?: number;
        /** Line item quantity */
        quantity?: number;
        /** Line item variantId (from Stores Catalog) */
        variantId?: string | null;
        /** Line item options ordered */
        options?: OptionSelection$1[];
        /** Line item custom text field selections */
        customTextFields?: CustomTextFieldSelection$1[];
        /** Charges details */
        chargeDetails?: ChargeDetails;
        /** Product details */
        productDetails?: ProductDetails;
    }
    interface OptionSelection$1 {
        /** Option name */
        option?: string;
        /** Selected choice for this option */
        selection?: string;
    }
    interface CustomTextFieldSelection$1 {
        /** Custom text field name */
        title?: string;
        /** Custom text field value */
        value?: string;
    }
    interface ChargeDetails {
        /** price of line item (depends on subscription option) */
        price?: number;
        /** Total price charged to the customer (for this line items) after computation of quantity and discount */
        totalPrice?: number | null;
        /** Discount applied for this line item */
        discount?: number | null;
        /** Tax applied for this line item */
        tax?: number | null;
        /** Is tax applied for this line item */
        taxIncludedInPrice?: boolean;
        /** Tax rate %, as a decimal point >= 0 */
        taxRate?: string | null;
    }
    interface ProductDetails {
        /** Line item product ID (optional for POS orders) */
        productId?: string | null;
        /** Line item name */
        name?: string;
        /** Line item name translated to buyer's language */
        translatedName?: string | null;
        /** Line item type (may be extended) */
        lineItemType?: LineItemType$1;
        /** Line item primary media for preview */
        mediaItem?: MediaItem$1;
        /** Line item SKU */
        sku?: string | null;
        /** Line item weight */
        weight?: number | null;
        /** Line item notes */
        notes?: string | null;
        /** Line item fulfillerId from stores fulfillers. No value means self fulfilled */
        fulfillerId?: string | null;
        /** Tax group id */
        taxGroupId?: string | null;
        /** App id from the catalog reference */
        appId?: string | null;
    }
    enum LineItemType$1 {
        /** Line item type can't be classified, due to an error */
        UNSPECIFIED_LINE_ITEM_TYPE = "UNSPECIFIED_LINE_ITEM_TYPE",
        /** Physical item type */
        PHYSICAL = "PHYSICAL",
        /** Digital item type */
        DIGITAL = "DIGITAL",
        /** Custom item price */
        CUSTOM_AMOUNT_ITEM = "CUSTOM_AMOUNT_ITEM"
    }
    interface MediaItem$1 {
        /**
         * Media type
         * @readonly
         */
        mediaType?: MediaItemType$1;
        /**
         * Media URL
         * @readonly
         */
        url?: string;
        /**
         * Media item width
         * @readonly
         */
        width?: number;
        /**
         * Media item height
         * @readonly
         */
        height?: number;
        /** Media ID (for media items previously saved in Wix Media) */
        _id?: string | null;
        /** Media external URL */
        externalImageUrl?: string | null;
        /** Alternative text for presentation when media cannot be displayed */
        altText?: string | null;
    }
    enum MediaItemType$1 {
        /** Media item type can't be classified, due to an error */
        UNSPECIFIED_MEDIA_TYPE_ITEM = "UNSPECIFIED_MEDIA_TYPE_ITEM",
        /** Image item type */
        IMAGE = "IMAGE"
    }
    interface Totals$1 {
        /** Subtotal of all line items, before tax */
        subtotal?: number;
        /** Total shipping price, including tax */
        shipping?: number;
        /** Total tax */
        tax?: number;
        /** Total calculated discount value */
        discount?: number;
        /** Total price */
        total?: number;
        /** Total weight */
        weight?: number | null;
        /**
         * Total line items quantity
         * @readonly
         */
        quantity?: number;
    }
    interface StoreSettings {
        /** Currency used for pricing in this store */
        currency?: string | null;
        /** Weight unit used in this store */
        weightUnit?: WeightUnit$4;
        /**
         * The language to be used when communicating with the buyer
         * For a site that support multiple languages, this would be the language the buyer selected
         * Otherwise this would be the site language
         */
        buyerLanguage?: string | null;
    }
    interface Address$4 extends AddressAddressLine1OptionsOneOf$1 {
        /** Address line 1 (free text) */
        addressLine1?: string;
        /** Address line 1 (street) */
        street?: Street$1;
        /** Addressee name */
        fullName?: FullName$1;
        /** Country code (2 letters) */
        country?: string | null;
        /** State or district */
        subdivision?: string | null;
        /** City name */
        city?: string | null;
        /** ZIP/postal code */
        zipCode?: string | null;
        /** Phone number */
        phone?: string | null;
        /** Company name */
        company?: string | null;
        /** Email address */
        email?: string | null;
        /** address line */
        addressLine2?: string | null;
        /** Tax information (for Brazil only) */
        vatId?: VatId$4;
    }
    /** @oneof */
    interface AddressAddressLine1OptionsOneOf$1 {
        /** Address line 1 (free text) */
        addressLine1?: string;
        /** Address line 1 (street) */
        street?: Street$1;
    }
    interface FullName$1 {
        /** Customer's first name */
        firstName?: string;
        /** Customer's last name */
        lastName?: string;
    }
    interface Street$1 {
        /** Street number */
        number?: string;
        /** Street name */
        name?: string;
    }
    interface VatId$4 {
        /** Customer's tax ID. */
        number?: string;
        /**
         * Tax type.
         * + `CPF`: For individual tax payers.
         * + `CNPJ`: For corporations.
         */
        type?: VatType$4;
    }
    /** Brazilian tax info types */
    enum VatType$4 {
        /** When the tax info type can't be classified, due to an error */
        UNSPECIFIED_TAX_TYPE = "UNSPECIFIED_TAX_TYPE",
        /** CPF - for individual tax payers */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface V1ShippingInfo extends V1ShippingInfoDetailsOneOf {
        /** Shipment details (when this object describes shipment) */
        shipmentDetails?: ShipmentDetails$1;
        /** Pickup details (when this object describes pickup) */
        pickupDetails?: V1PickupDetails;
        /** Delivery option name */
        deliveryOption?: string;
        /** Delivery option delivery time */
        estimatedDeliveryTime?: string | null;
    }
    /** @oneof */
    interface V1ShippingInfoDetailsOneOf {
        /** Shipment details (when this object describes shipment) */
        shipmentDetails?: ShipmentDetails$1;
        /** Pickup details (when this object describes pickup) */
        pickupDetails?: V1PickupDetails;
    }
    interface ShipmentDetails$1 {
        /** Shipping destination address */
        address?: Address$4;
        /** Discount applied for shipping */
        discount?: number | null;
        /** Tax applied for shipping */
        tax?: number | null;
        /** Whether tax is included in the price */
        taxIncludedInPrice?: boolean;
        /** Tax rate % for shipping, as a decimal point >= 0 */
        taxRate?: string | null;
    }
    interface V1PickupDetails {
        /** Pickup address */
        address?: PickupAddress$1;
        /** Store owner's pickup instructions */
        pickupInstructions?: string | null;
    }
    interface PickupAddress$1 {
        /** Country code (2 letters) */
        country?: string;
        /** State/District */
        subdivision?: string | null;
        /** Address */
        addressLine?: string;
        /** City */
        city?: string;
        /** ZIP/postal code */
        zipCode?: string;
    }
    interface AppliedCoupon$1 {
        /** Coupon ID */
        couponId?: string;
        /** Coupon name */
        name?: string;
        /** Coupon code */
        code?: string;
    }
    /** Custom field */
    interface V1CustomField {
        /** Free text that the customer entered in the custom field during the checkout process */
        value?: string;
        /** Title for the custom field */
        title?: string;
        /** The title translated according to the buyer language */
        translatedTitle?: string;
    }
    interface V1SubscriptionOptionInfo {
        _id?: string | null;
        title?: string;
        description?: string | null;
        discount?: Discount$2;
    }
    interface Discount$2 {
        /** Discount type. */
        type?: DiscountDiscountType;
        /** Discount value. */
        value?: number;
    }
    enum DiscountDiscountType {
        UNDEFINED = "UNDEFINED",
        /** No discount */
        AMOUNT = "AMOUNT",
        PERCENT = "PERCENT"
    }
    interface ChannelInfo$1 {
        /** Sales channel that submitted the subscription */
        type?: ChannelInfoChannelType;
    }
    enum ChannelInfoChannelType {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE"
    }
    interface V1SubscriptionSettings {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency$4;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal: true`. */
        billingCycles?: number | null;
    }
    interface BillingInfo$1 {
        /** Payment method used for this order */
        paymentMethod?: string | null;
        /** Transaction ID from payment gateway (e.g., Wix Payments) */
        paymentGatewayTransactionId?: string | null;
        /** Order ID from payment gateway (e.g., Wix Payments) */
        paymentGatewayOrderId?: string | null;
    }
    interface Empty$5 {
    }
    interface DomainEvent$9 extends DomainEventBodyOneOf$9 {
        createdEvent?: EntityCreatedEvent$9;
        updatedEvent?: EntityUpdatedEvent$9;
        deletedEvent?: EntityDeletedEvent$9;
        actionEvent?: ActionEvent$9;
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
    interface DomainEventBodyOneOf$9 {
        createdEvent?: EntityCreatedEvent$9;
        updatedEvent?: EntityUpdatedEvent$9;
        deletedEvent?: EntityDeletedEvent$9;
        actionEvent?: ActionEvent$9;
    }
    interface EntityCreatedEvent$9 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$9 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$9 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$9 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$9 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$9;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$9 extends IdentificationDataIdOneOf$9 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$9;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$9 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$9 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates a checkout.
     *
     *
     * The `createCheckout()` function returns a Promise that resolves to the new checkout when it's created.
     *
     * > **Notes:**
     * > + Checkout must include at least 1 item in the `options.lineItems` array.
     * > + `options.channelType` is required.
     * > + If `_id` for `options.lineItems` is added, make sure that each `_id` is unique.
     * > + If `options.checkoutInfo.customFields` are added, then `options.checkoutInfo.customFields.value` is required.
     * @public
     * @requiredField options.channelType
     * @requiredField options.checkoutInfo.customFields.value
     * @requiredField options.checkoutInfo.membershipOptions.selectedMemberships.memberships._id
     * @requiredField options.checkoutInfo.membershipOptions.selectedMemberships.memberships.appId
     * @requiredField options.checkoutInfo.membershipOptions.selectedMemberships.memberships.lineItemIds
     * @requiredField options.lineItems.catalogReference
     * @requiredField options.lineItems.catalogReference.appId
     * @requiredField options.lineItems.catalogReference.catalogItemId
     * @requiredField options.lineItems.quantity
     * @param options - Checkout creation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     * @returns Fulfilled - the newly created checkout.
     */
    function createCheckout$1(options?: CreateCheckoutOptions$1): Promise<Checkout$1>;
    interface CreateCheckoutOptions$1 {
        /** Checkout information. */
        checkoutInfo?: Checkout$1;
        /** The code of an existing coupon to apply to checkout. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Line items to be added to checkout. */
        lineItems?: LineItem$5[];
        /**
         * **Required**
         *  Sales channel type.
         */
        channelType: ChannelType$4;
        /**
         * Gift card code.
         *
         * The checkout can only hold 1 `giftCardCode` at a time. If an additional `giftCardCode` is added, it will override the existing `giftCardCode`.
         *
         * >**Note:** Gift cards are supported through the Wix UI, though the service plugin is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
         */
        giftCardCode?: string | null;
        /**
         * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
         *
         * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
         */
        overrideCheckoutUrl?: string | null;
    }
    /**
     * Retrieves a checkout.
     *
     *
     * The `getCheckout()` function returns a Promise that resolves when the specified checkout is retrieved.
     * @param _id - Checkout ID.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     * @returns Fulfilled - the requested checkout.
     */
    function getCheckout(_id: string, options?: GetCheckoutOptions): Promise<GetCheckoutResponse>;
    interface GetCheckoutOptions {
    }
    interface GetWixCheckoutUrlOptions {
    }
    /**
     * Retrieves the checkout page URL of a specified checkout.
     *
     * By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page.
     * However, if `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
     * @param _id - Checkout ID.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function getCheckoutUrl(_id: string, options?: GetCheckoutUrlOptions): Promise<GetCheckoutURLResponse>;
    interface GetCheckoutUrlOptions {
    }
    /**
     * Updates a checkout.
     *
     *
     * The `updateCheckout()` function returns a Promise that resolves to the updated checkout when the specified properties are updated.
     *
     * >**Notes:**
     * > + If nothing is passed in the request, the call will fail.
     * > + The `checkout.buyerInfo.email` may not be removed once it is set.
     * @param _id - Checkout ID.
     * @public
     * @requiredField _id
     * @requiredField checkout
     * @requiredField checkout.customFields.value
     * @requiredField checkout.membershipOptions.selectedMemberships.memberships._id
     * @requiredField checkout.membershipOptions.selectedMemberships.memberships.appId
     * @requiredField checkout.membershipOptions.selectedMemberships.memberships.lineItemIds
     * @param options - Checkout update options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     * @returns Updated checkout.
     */
    function updateCheckout(_id: string | null, checkout: UpdateCheckout, options?: UpdateCheckoutOptions): Promise<Checkout$1>;
    interface UpdateCheckout {
        /**
         * Checkout ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Line items.
         *
         * Max: 300 items
         * @readonly
         */
        lineItems?: LineItem$5[];
        /** Billing information. */
        billingInfo?: AddressWithContact$3;
        /** Shipping information. */
        shippingInfo?: ShippingInfo$2;
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /** Buyer information. */
        buyerInfo?: BuyerInfo$5;
        /**
         * All converted prices are displayed in this currency in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         * @readonly
         */
        conversionCurrency?: string;
        /**
         * Calculated price summary for the checkout.
         * @readonly
         */
        priceSummary?: PriceSummary$3;
        /**
         * Errors when calculating totals.
         * @readonly
         */
        calculationErrors?: CalculationErrors$3;
        /**
         * Applied gift card details.
         *
         * >**Note:** Gift cards are supported through the Wix UI, though the service plugin is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
         * @readonly
         */
        giftCard?: GiftCard$4;
        /**
         * Applied discounts.
         * @readonly
         */
        appliedDiscounts?: AppliedDiscount$4[];
        /** Custom fields. */
        customFields?: CustomField$2[];
        /**
         * Weight measurement unit - defaults to site's weight unit.
         * @readonly
         */
        weightUnit?: WeightUnit$4;
        /**
         * Tax summary.
         * @readonly
         */
        taxSummary?: TaxSummary$3;
        /**
         * The currency used when submitting the order.
         * @readonly
         */
        currency?: string;
        /**
         * Sales channel that submitted the order.
         * + `"UNSPECIFIED"`: Unspecified sales channel. This value is not supported.
         * + `"WEB"`: A web client.
         * + `"POS"`: [Point of sale solutions](https://support.wix.com/en/wix-mobile-pos-2196395)
         * + `"EBAY"`: [eBay](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-ebay-shop)
         * + `"AMAZON"`: [Amazon](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-amazon-shop)
         * + `"WISH"`: [Wish](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-a-wish-shop)
         * + `"WIX_INVOICES"`: Wix Invoices app in [your dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Finvoices/settings/general-settings)
         * + `"WIX_APP_STORE"`: [Wix Owner app](https://support.wix.com/article/wix-owner-app-an-overview)
         * + `"BACKOFFICE_MERCHANT"`: Wix merchant backoffice
         * + `"OTHER_PLATFORM"`: Other sales platform.
         * @readonly
         */
        channelType?: ChannelType$4;
        /**
         * Site language in which original values are shown.
         * @readonly
         */
        siteLanguage?: string;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         * @readonly
         */
        buyerLanguage?: string;
        /**
         * Whether an order was successfully created from this checkout.
         * For an order to be successful, it must be successfully paid for (unless the total is 0).
         * @readonly
         */
        completed?: boolean;
        /**
         * Whether tax is included in line item prices.
         * @readonly
         */
        taxIncludedInPrice?: boolean;
        /**
         * ID of the checkout's initiator.
         * @readonly
         */
        createdBy?: CreatedBy$1;
        /**
         * Date and time the checkout was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the checkout was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Minimal amount to pay in order to place the order.
         * @readonly
         */
        payNow?: PriceSummary$3;
        /**
         * Remaining amount for the order to be fully paid.
         * @readonly
         */
        payLater?: PriceSummary$3;
        /** Memberships to apply when creating the order. */
        membershipOptions?: MembershipOptions$3;
        /** Additional Fees. */
        additionalFees?: AdditionalFee$3[];
        /** Cart ID that this checkout was created from. Empty if this checkout wasn't created from a cart. */
        cartId?: string | null;
        /**
         * List of validation violations raised by the [Validations Custom Extension SPI](https://www.wix.com/velo/reference/spis/wix-ecom/ecom-validations/introduction).
         * @readonly
         */
        violations?: Violation$3[];
        /**
         * Custom field data for the checkout object.
         *
         * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
         */
        extendedFields?: ExtendedFields$4;
        /**
         * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
         * @readonly
         */
        purchaseFlowId?: string | null;
        /**
         * Additional settings for customization of the checkout process.
         *
         * Custom settings can only be defined when [creating a checkout](https://www.wix.com/velo/reference/wix-ecom-backend/checkout/createcheckout).
         */
        customSettings?: CustomSettings$1;
    }
    interface UpdateCheckoutOptions {
        /** The code of an existing coupon to apply to checkout. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Gift card code. */
        giftCardCode?: string | null;
        /**
         * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
         *
         * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
         */
        overrideCheckoutUrl?: string | null;
    }
    /**
     * Removes the coupon from a specified checkout.
     *
     *
     * The `removeCoupon()` function returns a Promise that resolves to the updated checkout when the coupon is removed from the specified checkout.
     *
     * >**Note:** A checkout can only hold 1 coupon.
     * @param _id - ID of the checkout to remove the coupon from.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function removeCoupon$1(_id: string): Promise<RemoveCouponResponse$2>;
    /**
     * Removes the gift card from a specified checkout.
     *
     *
     * The `removeGiftCard()` function returns a Promise that resolves to the updated checkout when the gift card is removed from the specified checkout.
     *
     * >**Note:** A checkout can only hold 1 gift card.
     * @param _id - ID of the checkout to remove the gift card from.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function removeGiftCard(_id: string): Promise<RemoveGiftCardResponse>;
    /**
     * Removes the `overrideCheckoutUrl` from a specified checkout.
     *
     * When `overrideCheckoutUrl` is removed, the `checkoutUrl` will be set to the default, standard
     * Wix checkout page URL.
     * @param _id - ID of the checkout to remove the override checkout url from.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function removeOverrideCheckoutUrl(_id: string): Promise<RemoveOverrideCheckoutUrlResponse>;
    /**
     * Adds catalog line items and/or custom line items to a checkout.
     *
     *
     * The `addToCheckout()` function returns a Promise that resolves to the updated checkout when the specified items have been added.
     * > **Note:** When adding catalog items, `options.lineItems.catalogReference` is required.
     * @param _id - Checkout ID.
     * @public
     * @requiredField _id
     * @requiredField options.lineItems.catalogReference
     * @requiredField options.lineItems.catalogReference.appId
     * @requiredField options.lineItems.catalogReference.catalogItemId
     * @requiredField options.lineItems.quantity
     * @param options - Items to be added to checkout.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function addToCheckout(_id: string, options?: AddToCheckoutOptions): Promise<AddToCheckoutResponse>;
    interface AddToCheckoutOptions {
        /** Catalog line items. */
        lineItems?: LineItem$5[];
    }
    /**
     * Removes line items from the specified checkout.
     *
     *
     * The `removeLineItems()` function returns a Promise that resolves to the updated checkout when the line items are removed from the specified checkout.
     * @param _id - ID of the checkout to remove line items from.
     * @public
     * @requiredField _id
     * @requiredField lineItemIds
     * @param lineItemIds - IDs of the line items to be removed.
     * To find the IDs of the checkout line items you'd like to remove, pass the `checkout._id` to [getCheckout()](https://www.wix.com/velo/reference/wix-ecom-backend/checkout/getcheckout) and look for the IDs under `lineItems` and/or `customLineItems`.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function removeLineItems$1(_id: string, lineItemIds: string[]): Promise<RemoveLineItemsResponse$2>;
    /**
     * Creates an order from a specified checkout.
     *
     * The `createOrder()` function returns a Promise that resolves to the new order's ID and `paymentGatewayOrderID` when the order is created.
     * Pass the `paymentGatewayOrderId` as the `paymentId` param to the [`startPayment()`](https://www.wix.com/velo/reference/wix-pay-frontend/startpayment) function to allow a customer to pay for their order.
     *
     * > **Note:** The following requirements must be met for an order to be created from a checkout.
     * > + A checkout cannot have calculation errors. Pass the `checkout._id` to [Get Checkout](https://www.wix.com/velo/reference/wix-ecom-backend/checkout/getcheckout) and take a look at the `calculationErrors` field.
     * > + A checkout must have at least 1 line item.
     * > + All of the line Items have an `availability.status` of `"AVAILABLE"` or `"PARTIALLY_AVAILABLE"`.
     * > + If there is a payment to be made, meaning that `priceSummary.total` is greater than 0, the `billingInfo.address` field must be provided.
     * > + When a checkout has line items to be shipped, the `shippingInfo.shippingDestination.address` and `shippingInfo.selectedCarrierServiceOption` fields must be provided.
     * > + When a checkout has line items for pickup, the `shippingInfo.selectedCarrierServiceOption.logistics.pickupDetails` field must be provided.
     * @param _id - Checkout ID.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @param options - Further order creation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function createOrder(_id: string, options?: CreateOrderOptions): Promise<CreateOrderResponse>;
    interface CreateOrderOptions {
    }
    interface CreateOrderAndChargeOptions {
        /** Payment token. */
        paymentToken?: string | null;
    }
    /**
     * Marks a checkout as completed - `checkout.complete` boolean is set to `true`.
     *
     *
     * The `markCheckoutAsCompleted()` function returns a Promise that resolves when the specified checkout is marked as completed.
     * @param _id - Checkout ID.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function markCheckoutAsCompleted(_id: string): Promise<void>;
    /**
     * Updates the quantity of one or more line items in a checkout.
     *
     * This endpoint is only for updating the quantity of line items. To entirely remove a line item from
     * the checkout, use [`removeLineItems()`](#removelineitems).
     * To add a new line item to the checkout, use [`addToCheckout()`](#addtocheckout).
     *
     * This endpoint checks the amount of stock remaining for this line item. If the specified `quantity`
     * is greater than the remaining stock, then the `quantity` returned in the response is the total amount
     * of remaining stock.
     * @param _id - Checkout ID.
     * @param lineItems - Line item info to update.
     * @public
     * @requiredField _id
     * @requiredField lineItems
     * @requiredField lineItems._id
     * @requiredField lineItems.quantity
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function updateLineItemsQuantity$1(_id: string, lineItems: LineItemQuantityUpdate$2[]): Promise<UpdateLineItemsQuantityResponse$2>;
    type ecomV1CheckoutCheckout_universal_d_ApiAddress = ApiAddress;
    type ecomV1CheckoutCheckout_universal_d_CommonVatId = CommonVatId;
    type ecomV1CheckoutCheckout_universal_d_CommonVatType = CommonVatType;
    const ecomV1CheckoutCheckout_universal_d_CommonVatType: typeof CommonVatType;
    type ecomV1CheckoutCheckout_universal_d_UpdatedCheckoutMessage = UpdatedCheckoutMessage;
    type ecomV1CheckoutCheckout_universal_d_ShippingCalculationErrorData = ShippingCalculationErrorData;
    type ecomV1CheckoutCheckout_universal_d_ShippingCalculationErrorDataShippingCalculationErrorOneOf = ShippingCalculationErrorDataShippingCalculationErrorOneOf;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutRequest = GetCheckoutRequest;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutResponse = GetCheckoutResponse;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutWithAllExtendedFieldsRequest = GetCheckoutWithAllExtendedFieldsRequest;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutWithAllExtendedFieldsResponse = GetCheckoutWithAllExtendedFieldsResponse;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutByCartIdRequest = GetCheckoutByCartIdRequest;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutByCartIdResponse = GetCheckoutByCartIdResponse;
    type ecomV1CheckoutCheckout_universal_d_GetWixCheckoutURLRequest = GetWixCheckoutURLRequest;
    type ecomV1CheckoutCheckout_universal_d_GetWixCheckoutURLResponse = GetWixCheckoutURLResponse;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutURLRequest = GetCheckoutURLRequest;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutURLResponse = GetCheckoutURLResponse;
    type ecomV1CheckoutCheckout_universal_d_UpdateCheckoutRequest = UpdateCheckoutRequest;
    type ecomV1CheckoutCheckout_universal_d_UpdateCheckoutResponse = UpdateCheckoutResponse;
    type ecomV1CheckoutCheckout_universal_d_RemoveGiftCardRequest = RemoveGiftCardRequest;
    type ecomV1CheckoutCheckout_universal_d_RemoveGiftCardResponse = RemoveGiftCardResponse;
    type ecomV1CheckoutCheckout_universal_d_RemoveOverrideCheckoutUrlRequest = RemoveOverrideCheckoutUrlRequest;
    type ecomV1CheckoutCheckout_universal_d_RemoveOverrideCheckoutUrlResponse = RemoveOverrideCheckoutUrlResponse;
    type ecomV1CheckoutCheckout_universal_d_AddToCheckoutRequest = AddToCheckoutRequest;
    type ecomV1CheckoutCheckout_universal_d_AddToCheckoutResponse = AddToCheckoutResponse;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderRequest = CreateOrderRequest;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderResponse = CreateOrderResponse;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderResponseIdOneOf = CreateOrderResponseIdOneOf;
    type ecomV1CheckoutCheckout_universal_d_PaymentErrorResponseData = PaymentErrorResponseData;
    type ecomV1CheckoutCheckout_universal_d_DoublePaymentErrorData = DoublePaymentErrorData;
    type ecomV1CheckoutCheckout_universal_d_DoublePaymentErrorDataIdOneOf = DoublePaymentErrorDataIdOneOf;
    type ecomV1CheckoutCheckout_universal_d_RedeemErrorData = RedeemErrorData;
    type ecomV1CheckoutCheckout_universal_d_ViolationsList = ViolationsList;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeRequest = CreateOrderAndChargeRequest;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeResponse = CreateOrderAndChargeResponse;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeResponseIdOneOf = CreateOrderAndChargeResponseIdOneOf;
    type ecomV1CheckoutCheckout_universal_d_MarkCheckoutAsCompletedRequest = MarkCheckoutAsCompletedRequest;
    type ecomV1CheckoutCheckout_universal_d_MarkCheckoutAsCompletedResponse = MarkCheckoutAsCompletedResponse;
    type ecomV1CheckoutCheckout_universal_d_CheckoutMarkedAsCompleted = CheckoutMarkedAsCompleted;
    type ecomV1CheckoutCheckout_universal_d_SubscriptionCreated = SubscriptionCreated;
    type ecomV1CheckoutCheckout_universal_d_Subscription = Subscription;
    type ecomV1CheckoutCheckout_universal_d_V1BuyerInfo = V1BuyerInfo;
    type ecomV1CheckoutCheckout_universal_d_ChargeDetails = ChargeDetails;
    type ecomV1CheckoutCheckout_universal_d_ProductDetails = ProductDetails;
    type ecomV1CheckoutCheckout_universal_d_StoreSettings = StoreSettings;
    type ecomV1CheckoutCheckout_universal_d_V1ShippingInfo = V1ShippingInfo;
    type ecomV1CheckoutCheckout_universal_d_V1ShippingInfoDetailsOneOf = V1ShippingInfoDetailsOneOf;
    type ecomV1CheckoutCheckout_universal_d_V1PickupDetails = V1PickupDetails;
    type ecomV1CheckoutCheckout_universal_d_V1CustomField = V1CustomField;
    type ecomV1CheckoutCheckout_universal_d_V1SubscriptionOptionInfo = V1SubscriptionOptionInfo;
    type ecomV1CheckoutCheckout_universal_d_DiscountDiscountType = DiscountDiscountType;
    const ecomV1CheckoutCheckout_universal_d_DiscountDiscountType: typeof DiscountDiscountType;
    type ecomV1CheckoutCheckout_universal_d_ChannelInfoChannelType = ChannelInfoChannelType;
    const ecomV1CheckoutCheckout_universal_d_ChannelInfoChannelType: typeof ChannelInfoChannelType;
    type ecomV1CheckoutCheckout_universal_d_V1SubscriptionSettings = V1SubscriptionSettings;
    const ecomV1CheckoutCheckout_universal_d_getCheckout: typeof getCheckout;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutOptions = GetCheckoutOptions;
    type ecomV1CheckoutCheckout_universal_d_GetWixCheckoutUrlOptions = GetWixCheckoutUrlOptions;
    const ecomV1CheckoutCheckout_universal_d_getCheckoutUrl: typeof getCheckoutUrl;
    type ecomV1CheckoutCheckout_universal_d_GetCheckoutUrlOptions = GetCheckoutUrlOptions;
    const ecomV1CheckoutCheckout_universal_d_updateCheckout: typeof updateCheckout;
    type ecomV1CheckoutCheckout_universal_d_UpdateCheckout = UpdateCheckout;
    type ecomV1CheckoutCheckout_universal_d_UpdateCheckoutOptions = UpdateCheckoutOptions;
    const ecomV1CheckoutCheckout_universal_d_removeGiftCard: typeof removeGiftCard;
    const ecomV1CheckoutCheckout_universal_d_removeOverrideCheckoutUrl: typeof removeOverrideCheckoutUrl;
    const ecomV1CheckoutCheckout_universal_d_addToCheckout: typeof addToCheckout;
    type ecomV1CheckoutCheckout_universal_d_AddToCheckoutOptions = AddToCheckoutOptions;
    const ecomV1CheckoutCheckout_universal_d_createOrder: typeof createOrder;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderOptions = CreateOrderOptions;
    type ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeOptions = CreateOrderAndChargeOptions;
    const ecomV1CheckoutCheckout_universal_d_markCheckoutAsCompleted: typeof markCheckoutAsCompleted;
    namespace ecomV1CheckoutCheckout_universal_d {
        export { Checkout$1 as Checkout, LineItem$5 as LineItem, CatalogReference$5 as CatalogReference, ProductName$3 as ProductName, MultiCurrencyPrice$4 as MultiCurrencyPrice, ItemTaxFullDetails$3 as ItemTaxFullDetails, TaxRateBreakdown$3 as TaxRateBreakdown, TaxBreakdown$3 as TaxBreakdown, JurisdictionType$3 as JurisdictionType, DescriptionLine$3 as DescriptionLine, DescriptionLineValueOneOf$3 as DescriptionLineValueOneOf, DescriptionLineDescriptionLineValueOneOf$3 as DescriptionLineDescriptionLineValueOneOf, DescriptionLineName$3 as DescriptionLineName, PlainTextValue$3 as PlainTextValue, Color$3 as Color, DescriptionLineType$3 as DescriptionLineType, ItemAvailabilityInfo$3 as ItemAvailabilityInfo, ItemAvailabilityStatus$3 as ItemAvailabilityStatus, PhysicalProperties$3 as PhysicalProperties, Scope$4 as Scope, Group$3 as Group, ItemType$3 as ItemType, ItemTypeItemTypeDataOneOf$3 as ItemTypeItemTypeDataOneOf, ItemTypeItemType$3 as ItemTypeItemType, SubscriptionOptionInfo$4 as SubscriptionOptionInfo, SubscriptionSettings$4 as SubscriptionSettings, SubscriptionFrequency$4 as SubscriptionFrequency, Title$3 as Title, Description$3 as Description, SecuredMedia$3 as SecuredMedia, FileType$3 as FileType, PaymentOptionType$3 as PaymentOptionType, ServiceProperties$3 as ServiceProperties, PriceDescription$3 as PriceDescription, CatalogOverrideFields$3 as CatalogOverrideFields, AddressWithContact$3 as AddressWithContact, ecomV1CheckoutCheckout_universal_d_ApiAddress as ApiAddress, StreetAddress$3 as StreetAddress, AddressLocation$3 as AddressLocation, FullAddressContactDetails$3 as FullAddressContactDetails, ecomV1CheckoutCheckout_universal_d_CommonVatId as CommonVatId, ecomV1CheckoutCheckout_universal_d_CommonVatType as CommonVatType, ShippingInfo$2 as ShippingInfo, SelectedCarrierServiceOption$3 as SelectedCarrierServiceOption, DeliveryLogistics$3 as DeliveryLogistics, PickupDetails$4 as PickupDetails, PickupMethod$3 as PickupMethod, DeliveryTimeSlot$3 as DeliveryTimeSlot, SelectedCarrierServiceOptionPrices$3 as SelectedCarrierServiceOptionPrices, SelectedCarrierServiceOptionOtherCharge$3 as SelectedCarrierServiceOptionOtherCharge, ChargeType$3 as ChargeType, ShippingRegion$3 as ShippingRegion, CarrierServiceOption$3 as CarrierServiceOption, ShippingOption$3 as ShippingOption, ShippingPrice$3 as ShippingPrice, OtherCharge$3 as OtherCharge, BuyerInfo$5 as BuyerInfo, BuyerInfoIdOneOf$3 as BuyerInfoIdOneOf, PriceSummary$3 as PriceSummary, CalculationErrors$3 as CalculationErrors, CalculationErrorsShippingCalculationErrorOneOf$3 as CalculationErrorsShippingCalculationErrorOneOf, Details$3 as Details, DetailsKindOneOf$3 as DetailsKindOneOf, ApplicationError$6 as ApplicationError, ValidationError$3 as ValidationError, RuleType$3 as RuleType, FieldViolation$3 as FieldViolation, SystemError$3 as SystemError, CarrierErrors$3 as CarrierErrors, CarrierError$3 as CarrierError, GiftCard$4 as GiftCard, AppliedDiscount$4 as AppliedDiscount, AppliedDiscountDiscountSourceOneOf$3 as AppliedDiscountDiscountSourceOneOf, DiscountType$4 as DiscountType, Coupon$3 as Coupon, MerchantDiscount$3 as MerchantDiscount, DiscountRule$4 as DiscountRule, DiscountRuleName$4 as DiscountRuleName, LineItemDiscount$3 as LineItemDiscount, CustomField$2 as CustomField, WeightUnit$4 as WeightUnit, TaxSummary$3 as TaxSummary, TaxCalculationDetails$3 as TaxCalculationDetails, TaxCalculationDetailsCalculationDetailsOneOf$3 as TaxCalculationDetailsCalculationDetailsOneOf, RateType$3 as RateType, ManualCalculationReason$3 as ManualCalculationReason, AutoTaxFallbackCalculationDetails$3 as AutoTaxFallbackCalculationDetails, FallbackReason$3 as FallbackReason, AggregatedTaxBreakdown$3 as AggregatedTaxBreakdown, ChannelType$4 as ChannelType, CreatedBy$1 as CreatedBy, CreatedByIdOneOf$1 as CreatedByIdOneOf, MembershipOptions$3 as MembershipOptions, Membership$3 as Membership, MembershipName$4 as MembershipName, MembershipPaymentCredits$3 as MembershipPaymentCredits, InvalidMembership$3 as InvalidMembership, SelectedMemberships$3 as SelectedMemberships, SelectedMembership$3 as SelectedMembership, AdditionalFee$3 as AdditionalFee, ConversionInfo$1 as ConversionInfo, Violation$3 as Violation, Severity$3 as Severity, Target$3 as Target, TargetTargetTypeOneOf$3 as TargetTargetTypeOneOf, NameInOther$3 as NameInOther, NameInLineItem$3 as NameInLineItem, Other$3 as Other, TargetLineItem$3 as TargetLineItem, ExtendedFields$4 as ExtendedFields, CustomSettings$1 as CustomSettings, ecomV1CheckoutCheckout_universal_d_UpdatedCheckoutMessage as UpdatedCheckoutMessage, CreateCheckoutRequest$2 as CreateCheckoutRequest, CustomLineItem$3 as CustomLineItem, MerchantDiscountInput$2 as MerchantDiscountInput, CreateCheckoutResponse$2 as CreateCheckoutResponse, ecomV1CheckoutCheckout_universal_d_ShippingCalculationErrorData as ShippingCalculationErrorData, ecomV1CheckoutCheckout_universal_d_ShippingCalculationErrorDataShippingCalculationErrorOneOf as ShippingCalculationErrorDataShippingCalculationErrorOneOf, ecomV1CheckoutCheckout_universal_d_GetCheckoutRequest as GetCheckoutRequest, ecomV1CheckoutCheckout_universal_d_GetCheckoutResponse as GetCheckoutResponse, ecomV1CheckoutCheckout_universal_d_GetCheckoutWithAllExtendedFieldsRequest as GetCheckoutWithAllExtendedFieldsRequest, ecomV1CheckoutCheckout_universal_d_GetCheckoutWithAllExtendedFieldsResponse as GetCheckoutWithAllExtendedFieldsResponse, ecomV1CheckoutCheckout_universal_d_GetCheckoutByCartIdRequest as GetCheckoutByCartIdRequest, ecomV1CheckoutCheckout_universal_d_GetCheckoutByCartIdResponse as GetCheckoutByCartIdResponse, ecomV1CheckoutCheckout_universal_d_GetWixCheckoutURLRequest as GetWixCheckoutURLRequest, ecomV1CheckoutCheckout_universal_d_GetWixCheckoutURLResponse as GetWixCheckoutURLResponse, ecomV1CheckoutCheckout_universal_d_GetCheckoutURLRequest as GetCheckoutURLRequest, ecomV1CheckoutCheckout_universal_d_GetCheckoutURLResponse as GetCheckoutURLResponse, ecomV1CheckoutCheckout_universal_d_UpdateCheckoutRequest as UpdateCheckoutRequest, ecomV1CheckoutCheckout_universal_d_UpdateCheckoutResponse as UpdateCheckoutResponse, RemoveCouponRequest$2 as RemoveCouponRequest, RemoveCouponResponse$2 as RemoveCouponResponse, ecomV1CheckoutCheckout_universal_d_RemoveGiftCardRequest as RemoveGiftCardRequest, ecomV1CheckoutCheckout_universal_d_RemoveGiftCardResponse as RemoveGiftCardResponse, ecomV1CheckoutCheckout_universal_d_RemoveOverrideCheckoutUrlRequest as RemoveOverrideCheckoutUrlRequest, ecomV1CheckoutCheckout_universal_d_RemoveOverrideCheckoutUrlResponse as RemoveOverrideCheckoutUrlResponse, ecomV1CheckoutCheckout_universal_d_AddToCheckoutRequest as AddToCheckoutRequest, ecomV1CheckoutCheckout_universal_d_AddToCheckoutResponse as AddToCheckoutResponse, RemoveLineItemsRequest$2 as RemoveLineItemsRequest, RemoveLineItemsResponse$2 as RemoveLineItemsResponse, ecomV1CheckoutCheckout_universal_d_CreateOrderRequest as CreateOrderRequest, ecomV1CheckoutCheckout_universal_d_CreateOrderResponse as CreateOrderResponse, ecomV1CheckoutCheckout_universal_d_CreateOrderResponseIdOneOf as CreateOrderResponseIdOneOf, ecomV1CheckoutCheckout_universal_d_PaymentErrorResponseData as PaymentErrorResponseData, ecomV1CheckoutCheckout_universal_d_DoublePaymentErrorData as DoublePaymentErrorData, ecomV1CheckoutCheckout_universal_d_DoublePaymentErrorDataIdOneOf as DoublePaymentErrorDataIdOneOf, ecomV1CheckoutCheckout_universal_d_RedeemErrorData as RedeemErrorData, ecomV1CheckoutCheckout_universal_d_ViolationsList as ViolationsList, ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeRequest as CreateOrderAndChargeRequest, ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeResponse as CreateOrderAndChargeResponse, ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeResponseIdOneOf as CreateOrderAndChargeResponseIdOneOf, ecomV1CheckoutCheckout_universal_d_MarkCheckoutAsCompletedRequest as MarkCheckoutAsCompletedRequest, ecomV1CheckoutCheckout_universal_d_MarkCheckoutAsCompletedResponse as MarkCheckoutAsCompletedResponse, ecomV1CheckoutCheckout_universal_d_CheckoutMarkedAsCompleted as CheckoutMarkedAsCompleted, UpdateLineItemsQuantityRequest$2 as UpdateLineItemsQuantityRequest, LineItemQuantityUpdate$2 as LineItemQuantityUpdate, UpdateLineItemsQuantityResponse$2 as UpdateLineItemsQuantityResponse, ecomV1CheckoutCheckout_universal_d_SubscriptionCreated as SubscriptionCreated, ecomV1CheckoutCheckout_universal_d_Subscription as Subscription, ecomV1CheckoutCheckout_universal_d_V1BuyerInfo as V1BuyerInfo, IdentityType$2 as IdentityType, V1LineItem$1 as V1LineItem, OptionSelection$1 as OptionSelection, CustomTextFieldSelection$1 as CustomTextFieldSelection, ecomV1CheckoutCheckout_universal_d_ChargeDetails as ChargeDetails, ecomV1CheckoutCheckout_universal_d_ProductDetails as ProductDetails, LineItemType$1 as LineItemType, MediaItem$1 as MediaItem, MediaItemType$1 as MediaItemType, Totals$1 as Totals, ecomV1CheckoutCheckout_universal_d_StoreSettings as StoreSettings, Address$4 as Address, AddressAddressLine1OptionsOneOf$1 as AddressAddressLine1OptionsOneOf, FullName$1 as FullName, Street$1 as Street, VatId$4 as VatId, VatType$4 as VatType, ecomV1CheckoutCheckout_universal_d_V1ShippingInfo as V1ShippingInfo, ecomV1CheckoutCheckout_universal_d_V1ShippingInfoDetailsOneOf as V1ShippingInfoDetailsOneOf, ShipmentDetails$1 as ShipmentDetails, ecomV1CheckoutCheckout_universal_d_V1PickupDetails as V1PickupDetails, PickupAddress$1 as PickupAddress, AppliedCoupon$1 as AppliedCoupon, ecomV1CheckoutCheckout_universal_d_V1CustomField as V1CustomField, ecomV1CheckoutCheckout_universal_d_V1SubscriptionOptionInfo as V1SubscriptionOptionInfo, Discount$2 as Discount, ecomV1CheckoutCheckout_universal_d_DiscountDiscountType as DiscountDiscountType, ChannelInfo$1 as ChannelInfo, ecomV1CheckoutCheckout_universal_d_ChannelInfoChannelType as ChannelInfoChannelType, ecomV1CheckoutCheckout_universal_d_V1SubscriptionSettings as V1SubscriptionSettings, BillingInfo$1 as BillingInfo, Empty$5 as Empty, DomainEvent$9 as DomainEvent, DomainEventBodyOneOf$9 as DomainEventBodyOneOf, EntityCreatedEvent$9 as EntityCreatedEvent, EntityUpdatedEvent$9 as EntityUpdatedEvent, EntityDeletedEvent$9 as EntityDeletedEvent, ActionEvent$9 as ActionEvent, MessageEnvelope$9 as MessageEnvelope, IdentificationData$9 as IdentificationData, IdentificationDataIdOneOf$9 as IdentificationDataIdOneOf, WebhookIdentityType$9 as WebhookIdentityType, createCheckout$1 as createCheckout, CreateCheckoutOptions$1 as CreateCheckoutOptions, ecomV1CheckoutCheckout_universal_d_getCheckout as getCheckout, ecomV1CheckoutCheckout_universal_d_GetCheckoutOptions as GetCheckoutOptions, ecomV1CheckoutCheckout_universal_d_GetWixCheckoutUrlOptions as GetWixCheckoutUrlOptions, ecomV1CheckoutCheckout_universal_d_getCheckoutUrl as getCheckoutUrl, ecomV1CheckoutCheckout_universal_d_GetCheckoutUrlOptions as GetCheckoutUrlOptions, ecomV1CheckoutCheckout_universal_d_updateCheckout as updateCheckout, ecomV1CheckoutCheckout_universal_d_UpdateCheckout as UpdateCheckout, ecomV1CheckoutCheckout_universal_d_UpdateCheckoutOptions as UpdateCheckoutOptions, removeCoupon$1 as removeCoupon, ecomV1CheckoutCheckout_universal_d_removeGiftCard as removeGiftCard, ecomV1CheckoutCheckout_universal_d_removeOverrideCheckoutUrl as removeOverrideCheckoutUrl, ecomV1CheckoutCheckout_universal_d_addToCheckout as addToCheckout, ecomV1CheckoutCheckout_universal_d_AddToCheckoutOptions as AddToCheckoutOptions, removeLineItems$1 as removeLineItems, ecomV1CheckoutCheckout_universal_d_createOrder as createOrder, ecomV1CheckoutCheckout_universal_d_CreateOrderOptions as CreateOrderOptions, ecomV1CheckoutCheckout_universal_d_CreateOrderAndChargeOptions as CreateOrderAndChargeOptions, ecomV1CheckoutCheckout_universal_d_markCheckoutAsCompleted as markCheckoutAsCompleted, updateLineItemsQuantity$1 as updateLineItemsQuantity, };
    }
    interface CheckoutSettings {
        /** Checkout policies. */
        checkoutPolicies?: CheckoutPolicies;
        /** Settings that apply to checkout fields and the checkout process. */
        checkoutFields?: CheckoutFields;
    }
    interface CheckoutPolicies {
        /** Terms and conditions. */
        termsAndConditions?: TermsAndConditionsPolicy;
        /** Privacy policy. */
        privacyPolicy?: PrivacyPolicy;
        /** Return policy. */
        returnPolicy?: ReturnPolicy;
        /** Digital item policy. */
        digitalItemPolicy?: DigitalItemPolicy;
        /** "Contact us" information. */
        contactUs?: ContactUsPolicy;
        /** Custom policy. */
        customPolicy?: CustomCheckoutPolicy;
    }
    interface TermsAndConditionsPolicy {
        /**
         * Whether the terms & conditions policy is visible to the customer in the checkout page. <br><br>
         *
         * Default: `false`
         */
        visible?: boolean | null;
        /** Terms and conditions policy content. */
        content?: string | null;
    }
    interface PrivacyPolicy {
        /**
         * Whether the privacy policy is visible to the customer in the checkout page. <br><br>
         *
         * Default: `false`
         */
        visible?: boolean | null;
        /** Privacy policy content. */
        content?: string | null;
    }
    interface ReturnPolicy {
        /**
         * Whether the return policy is visible to the customer in the checkout page. <br><br>
         *
         * Default: `false`
         */
        visible?: boolean | null;
        /** Return policy content. */
        content?: string | null;
    }
    interface DigitalItemPolicy {
        /**
         * Whether the digital item policy is visible to the customer in the checkout page. <br><br>
         *
         * Default: `false`
         */
        visible?: boolean | null;
        /** Digital item policy content. */
        content?: string | null;
    }
    interface ContactUsPolicy {
        /**
         * Whether the contact us policy is visible to the customer in the checkout page. <br><br>
         *
         * Default: `false`
         */
        visible?: boolean | null;
        /** Contact us policy content. */
        content?: string | null;
    }
    interface CustomCheckoutPolicy {
        /**
         * Whether the policy is visible to the customer on the checkout page.
         * Default: `false`.
         */
        visible?: boolean | null;
        /** Policy content. */
        content?: string | null;
        /** Policy title. */
        title?: string | null;
    }
    interface CheckoutFields {
        /**
         * Subscription checkbox.
         * Default:
         * - `visible`: `false`,
         * - `checkedByDefault`: `false`
         */
        subscriptionCheckbox?: CheckboxField;
        /**
         * Policy agreement checkbox.
         * Default:
         * - `visible`: `true`,
         * - `checkedByDefault`: `true`
         */
        policyAgreementCheckbox?: CheckboxField;
        /**
         * Whether the ability to redeem a gift card is enabled.
         * Default: `false`.
         */
        giftCardRedeemEnabled?: boolean | null;
        /**
         * Whether to allow for MIT transactions.
         * Default: `false`.
         */
        mitEnabled?: boolean | null;
        /**
         * Whether to allow for Auth & Capture transactions. <br><br>
         *
         * Default: `false`
         */
        delayCaptureEnabled?: boolean | null;
    }
    interface CheckboxField {
        /** Whether the checkbox is visible to the customer. */
        visible?: boolean | null;
        /** Whether the checkbox is checked by default. */
        checkedByDefault?: boolean | null;
    }
    interface GetCheckoutSettingsRequest {
    }
    interface GetCheckoutSettingsResponse {
        /** Checkout settings. */
        checkoutSettings?: CheckoutSettings;
    }
    interface UpdateCheckoutSettingsRequest {
        /** Checkout settings to update. */
        checkoutSettings: CheckoutSettings;
    }
    interface UpdateCheckoutSettingsResponse {
        /** The updated checkout settings. */
        checkoutSettings?: CheckoutSettings;
    }
    interface GiftCardProviderWasProvisioned {
        /** The gift card provider which was installed */
        providerAppDefId?: string;
        providerInstanceId?: string;
    }
    interface Empty$4 {
    }
    interface DeleteCheckoutSettingsRequest {
    }
    interface DeleteCheckoutSettingsResponse {
    }
    interface DomainEvent$8 extends DomainEventBodyOneOf$8 {
        createdEvent?: EntityCreatedEvent$8;
        updatedEvent?: EntityUpdatedEvent$8;
        deletedEvent?: EntityDeletedEvent$8;
        actionEvent?: ActionEvent$8;
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
    interface DomainEventBodyOneOf$8 {
        createdEvent?: EntityCreatedEvent$8;
        updatedEvent?: EntityUpdatedEvent$8;
        deletedEvent?: EntityDeletedEvent$8;
        actionEvent?: ActionEvent$8;
    }
    interface EntityCreatedEvent$8 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$8 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$8 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$8 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$8 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$8;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$8 extends IdentificationDataIdOneOf$8 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$8;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$8 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$8 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Retrieves the sites' checkout settings.
     *
     *
     * The `getCheckoutSettings()` function returns a Promise that resolves to checkout settings.
     * @public
     * @documentationMaturity preview
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     * @returns The requested checkout settings.
     */
    function getCheckoutSettings(): Promise<GetCheckoutSettingsResponse>;
    /**
     * Updates the sites' checkout settings.
     *
     *
     * The `updateCheckoutSettings()` function returns a Promise that resolves to the newly updated checkout settings.
     * @param checkoutSettings - Checkout settings to update.
     * @public
     * @documentationMaturity preview
     * @requiredField checkoutSettings
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @returns The updated checkout settings.
     */
    function updateCheckoutSettings(checkoutSettings: CheckoutSettings, options?: UpdateCheckoutSettingsOptions): Promise<UpdateCheckoutSettingsResponse>;
    interface UpdateCheckoutSettingsOptions {
    }
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckoutSettings = CheckoutSettings;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckoutPolicies = CheckoutPolicies;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_TermsAndConditionsPolicy = TermsAndConditionsPolicy;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_PrivacyPolicy = PrivacyPolicy;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_ReturnPolicy = ReturnPolicy;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_DigitalItemPolicy = DigitalItemPolicy;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_ContactUsPolicy = ContactUsPolicy;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_CustomCheckoutPolicy = CustomCheckoutPolicy;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckoutFields = CheckoutFields;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckboxField = CheckboxField;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_GetCheckoutSettingsRequest = GetCheckoutSettingsRequest;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_GetCheckoutSettingsResponse = GetCheckoutSettingsResponse;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_UpdateCheckoutSettingsRequest = UpdateCheckoutSettingsRequest;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_UpdateCheckoutSettingsResponse = UpdateCheckoutSettingsResponse;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_GiftCardProviderWasProvisioned = GiftCardProviderWasProvisioned;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_DeleteCheckoutSettingsRequest = DeleteCheckoutSettingsRequest;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_DeleteCheckoutSettingsResponse = DeleteCheckoutSettingsResponse;
    const ecomV1CheckoutSettingsCheckoutSettings_universal_d_getCheckoutSettings: typeof getCheckoutSettings;
    const ecomV1CheckoutSettingsCheckoutSettings_universal_d_updateCheckoutSettings: typeof updateCheckoutSettings;
    type ecomV1CheckoutSettingsCheckoutSettings_universal_d_UpdateCheckoutSettingsOptions = UpdateCheckoutSettingsOptions;
    namespace ecomV1CheckoutSettingsCheckoutSettings_universal_d {
        export { ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckoutSettings as CheckoutSettings, ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckoutPolicies as CheckoutPolicies, ecomV1CheckoutSettingsCheckoutSettings_universal_d_TermsAndConditionsPolicy as TermsAndConditionsPolicy, ecomV1CheckoutSettingsCheckoutSettings_universal_d_PrivacyPolicy as PrivacyPolicy, ecomV1CheckoutSettingsCheckoutSettings_universal_d_ReturnPolicy as ReturnPolicy, ecomV1CheckoutSettingsCheckoutSettings_universal_d_DigitalItemPolicy as DigitalItemPolicy, ecomV1CheckoutSettingsCheckoutSettings_universal_d_ContactUsPolicy as ContactUsPolicy, ecomV1CheckoutSettingsCheckoutSettings_universal_d_CustomCheckoutPolicy as CustomCheckoutPolicy, ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckoutFields as CheckoutFields, ecomV1CheckoutSettingsCheckoutSettings_universal_d_CheckboxField as CheckboxField, ecomV1CheckoutSettingsCheckoutSettings_universal_d_GetCheckoutSettingsRequest as GetCheckoutSettingsRequest, ecomV1CheckoutSettingsCheckoutSettings_universal_d_GetCheckoutSettingsResponse as GetCheckoutSettingsResponse, ecomV1CheckoutSettingsCheckoutSettings_universal_d_UpdateCheckoutSettingsRequest as UpdateCheckoutSettingsRequest, ecomV1CheckoutSettingsCheckoutSettings_universal_d_UpdateCheckoutSettingsResponse as UpdateCheckoutSettingsResponse, ecomV1CheckoutSettingsCheckoutSettings_universal_d_GiftCardProviderWasProvisioned as GiftCardProviderWasProvisioned, Empty$4 as Empty, ecomV1CheckoutSettingsCheckoutSettings_universal_d_DeleteCheckoutSettingsRequest as DeleteCheckoutSettingsRequest, ecomV1CheckoutSettingsCheckoutSettings_universal_d_DeleteCheckoutSettingsResponse as DeleteCheckoutSettingsResponse, DomainEvent$8 as DomainEvent, DomainEventBodyOneOf$8 as DomainEventBodyOneOf, EntityCreatedEvent$8 as EntityCreatedEvent, EntityUpdatedEvent$8 as EntityUpdatedEvent, EntityDeletedEvent$8 as EntityDeletedEvent, ActionEvent$8 as ActionEvent, MessageEnvelope$8 as MessageEnvelope, IdentificationData$8 as IdentificationData, IdentificationDataIdOneOf$8 as IdentificationDataIdOneOf, WebhookIdentityType$8 as WebhookIdentityType, ecomV1CheckoutSettingsCheckoutSettings_universal_d_getCheckoutSettings as getCheckoutSettings, ecomV1CheckoutSettingsCheckoutSettings_universal_d_updateCheckoutSettings as updateCheckoutSettings, ecomV1CheckoutSettingsCheckoutSettings_universal_d_UpdateCheckoutSettingsOptions as UpdateCheckoutSettingsOptions, };
    }
    interface Cart$1 {
        /** Cart ID. */
        _id?: string | null;
        /**
         * Line items.
         * @readonly
         */
        lineItems?: LineItem$4[];
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /** Buyer information. */
        buyerInfo?: BuyerInfo$4;
        /**
         * Currency used for pricing.
         * @readonly
         */
        currency?: string;
        /**
         * Currency code used for all the converted prices that are returned.
         * For a site that supports multiple currencies, this is the currency the buyer selected.
         * @readonly
         */
        conversionCurrency?: string;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         * @readonly
         */
        buyerLanguage?: string | null;
        /**
         * Site language in which original values are displayed.
         * @readonly
         */
        siteLanguage?: string | null;
        /**
         * Whether tax is included in line item prices.
         * @readonly
         */
        taxIncludedInPrices?: boolean | null;
        /**
         * Weight measurement unit - defaults to site's weight unit.
         * @readonly
         */
        weightUnit?: WeightUnit$3;
        /**
         * ID of the checkout that originated from this cart.
         * @readonly
         */
        checkoutId?: string | null;
        /**
         * Cart discounts.
         * @readonly
         */
        appliedDiscounts?: CartDiscount$1[];
        /**
         * Date and time the cart was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the cart was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /** Contact info. */
        contactInfo?: AddressWithContact$2;
        /**
         * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
         *
         * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
         */
        overrideCheckoutUrl?: string | null;
        /**
         * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
         * @readonly
         */
        purchaseFlowId?: string | null;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
    }
    interface LineItem$4 {
        /**
         * Line item ID.
         * @readonly
         */
        _id?: string | null;
        /** Item quantity. */
        quantity?: number;
        /** Catalog and item reference. Holds IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$4;
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         * @readonly
         */
        productName?: ProductName$2;
        /**
         * URL to the item's page on the site.
         * @readonly
         */
        url?: string;
        /**
         * Item price **after** catalog-defined discount and line item discounts.
         * @readonly
         */
        price?: MultiCurrencyPrice$3;
        /**
         * Item price **before** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        fullPrice?: MultiCurrencyPrice$3;
        /**
         * Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        priceBeforeDiscounts?: MultiCurrencyPrice$3;
        /**
         * Line item description lines. Used for displaying the cart, checkout and order.
         * @readonly
         */
        descriptionLines?: DescriptionLine$2[];
        /**
         * Line item image details.
         * @readonly
         */
        image?: string;
        /**
         * Item availability details.
         * @readonly
         */
        availability?: ItemAvailabilityInfo$2;
        /**
         * Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability.
         * @readonly
         */
        physicalProperties?: PhysicalProperties$2;
        /**
         * Item type. Either a preset type or custom.
         * @readonly
         */
        itemType?: ItemType$2;
        /**
         * Type of selected payment option for current item. Defaults to `"FULL_PAYMENT_ONLINE"`.
         * + `"FULL_PAYMENT_ONLINE"` - The entire payment for this item happens as part of the checkout.
         * + `"FULL_PAYMENT_OFFLINE"` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `"MEMBERSHIP"` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` will be 0.
         * @readonly
         */
        paymentOption?: PaymentOptionType$2;
        /**
         * Service properties. When relevant, this contains information such as date and number of participants.
         * @readonly
         */
        serviceProperties?: ServiceProperties$2;
        /**
         * In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + in most cases, this field is the same as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         * @readonly
         */
        rootCatalogItemId?: string | null;
        /**
         * Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67".
         * @readonly
         */
        priceDescription?: PriceDescription$2;
        /**
         * Partial payment to be paid upfront during the checkout. Eligible for catalog items with `lineItem.paymentOption` type `DEPOSIT_ONLINE` only.
         * @readonly
         */
        depositAmount?: MultiCurrencyPrice$3;
        /** Selected membership to be used as payment for this item. Must be used with `lineItem.paymentOption` set to `MEMBERSHIP` or `MEMBERSHIP_OFFLINE`. This field can be empty when `lineItem.paymentOption` is set to `MEMBERSHIP_OFFLINE`. */
        selectedMembership?: SelectedMembership$2;
        /**
         * Tax group ID for this line item.
         * @readonly
         */
        taxGroupId?: string | null;
        /**
         * Item payment policy that requires customer consent to complete purchase. The payment policy will be displayed on the checkout page.
         * @readonly
         */
        consentRequiredPaymentPolicy?: string | null;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$4 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs.
         *
         * Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from your Wix Stores catalog, learn more about [eCommerce integration](https://www.wix.com/velo/reference/wix-stores-backend/ecommerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface ProductName$2 {
        /** **Required** - Original product name (in site's default language). */
        original?: string;
        /** Description product name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface MultiCurrencyPrice$3 {
        /** Amount. */
        amount?: string;
        /**
         * Converted amount.
         * @readonly
         */
        convertedAmount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
        /**
         * Converted amount formatted with currency symbol.
         * @readonly
         */
        formattedConvertedAmount?: string;
    }
    interface DescriptionLine$2 extends DescriptionLineValueOneOf$2, DescriptionLineDescriptionLineValueOneOf$2 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$2;
        /** Description line color value. */
        colorInfo?: Color$2;
        /** Description line name. */
        name?: DescriptionLineName$2;
    }
    /** @oneof */
    interface DescriptionLineValueOneOf$2 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$2;
        /** Description line color value. */
        colorInfo?: Color$2;
    }
    /** @oneof */
    interface DescriptionLineDescriptionLineValueOneOf$2 {
    }
    interface DescriptionLineName$2 {
        /** Description line name in site's default language. */
        original?: string;
        /** Description line name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface PlainTextValue$2 {
        /** Description line plain text value in site's default language. */
        original?: string;
        /** Description line plain text value translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface Color$2 {
        /** Description line color name in site's default language. */
        original?: string;
        /** Description line color name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
        /**
         * HEX or RGB color code for display.
         *
         */
        code?: string | null;
    }
    enum DescriptionLineType$2 {
        UNRECOGNISED = "UNRECOGNISED",
        PLAIN_TEXT = "PLAIN_TEXT",
        COLOR = "COLOR"
    }
    interface ItemAvailabilityInfo$2 {
        /**
         * Item availability status.
         *
         * NOT_FOUND - Item does not exist.
         * NOT_AVAILABLE - Not in stock.
         * PARTIALLY_AVAILABLE - Available quantity is less than requested.
         */
        status?: ItemAvailabilityStatus$2;
        /** Quantity available. */
        quantityAvailable?: number | null;
    }
    enum ItemAvailabilityStatus$2 {
        AVAILABLE = "AVAILABLE",
        NOT_FOUND = "NOT_FOUND",
        /** Not in stock */
        NOT_AVAILABLE = "NOT_AVAILABLE",
        /** Available quantity is less than requested */
        PARTIALLY_AVAILABLE = "PARTIALLY_AVAILABLE"
    }
    interface PhysicalProperties$2 {
        /** Line item weight. Measurement unit matches the weight unit specified in `weightUnit` in the request. */
        weight?: number | null;
        /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
        sku?: string | null;
        /** Whether this line item is shippable. */
        shippable?: boolean;
    }
    interface Scope$3 {
        /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
        namespace?: string;
        /** Coupon scope's applied group (e.g., event or ticket in Wix Events) */
        group?: Group$2;
    }
    interface Group$2 {
        /** Coupon scope's group (e.g., product or collection in Wix Stores). See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
        name?: string;
        /** Item ID (when the coupon scope is limited to just one item). */
        entityId?: string | null;
    }
    interface ItemType$2 extends ItemTypeItemTypeDataOneOf$2 {
        /** Preset item type. */
        preset?: ItemTypeItemType$2;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    /** @oneof */
    interface ItemTypeItemTypeDataOneOf$2 {
        /** Preset item type. */
        preset?: ItemTypeItemType$2;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    enum ItemTypeItemType$2 {
        UNRECOGNISED = "UNRECOGNISED",
        PHYSICAL = "PHYSICAL",
        DIGITAL = "DIGITAL",
        GIFT_CARD = "GIFT_CARD",
        SERVICE = "SERVICE"
    }
    interface SubscriptionOptionInfo$3 {
        /** Subscription option settings. */
        subscriptionSettings?: SubscriptionSettings$3;
        /** Subscription option title. */
        title?: Title$2;
        /** Subscription option description. */
        description?: Description$2;
    }
    interface SubscriptionSettings$3 {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency$3;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal` is `true`. */
        billingCycles?: number | null;
    }
    /** Frequency unit of recurring payment */
    enum SubscriptionFrequency$3 {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface Title$2 {
        /** Subscription option name in the site's default language. */
        original?: string;
        /**
         * Subscription option name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Description$2 {
        /** Subscription option description. */
        original?: string;
        /** Translated subscription option description. */
        translated?: string | null;
    }
    interface SecuredMedia$2 {
        /** Media ID in Wix Media Manager. */
        _id?: string;
        /** Original filename. */
        fileName?: string;
        /** File type. */
        fileType?: FileType$2;
    }
    enum FileType$2 {
        UNSPECIFIED = "UNSPECIFIED",
        SECURE_PICTURE = "SECURE_PICTURE",
        SECURE_VIDEO = "SECURE_VIDEO",
        SECURE_DOCUMENT = "SECURE_DOCUMENT",
        SECURE_MUSIC = "SECURE_MUSIC",
        SECURE_ARCHIVE = "SECURE_ARCHIVE"
    }
    /** Type of selected payment option for catalog item */
    enum PaymentOptionType$2 {
        /** The entire payment for this item happens as part of the checkout. */
        FULL_PAYMENT_ONLINE = "FULL_PAYMENT_ONLINE",
        /** The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods. */
        FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
        /** Payment for this item is done by charging a membership. When selected, `price` is `0`. */
        MEMBERSHIP = "MEMBERSHIP",
        /** Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`. */
        DEPOSIT_ONLINE = "DEPOSIT_ONLINE",
        /** Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`. */
        MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
    }
    interface ServiceProperties$2 {
        /** The date and time for which the service is supposed to be provided. For example, the time of the class. */
        scheduledDate?: Date;
        /** The number of people participating in this service. For example, the number of people attending the class or the number of people per hotel room. */
        numberOfParticipants?: number | null;
    }
    interface PriceDescription$2 {
        /**
         * **Required** - Original price description (in site's default language).
         *
         */
        original?: string;
        /** Product name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    /** Selected Membership */
    interface SelectedMembership$2 {
        /** Membership ID. */
        _id?: string;
        /** ID of the app providing this payment option. */
        appId?: string;
    }
    interface CatalogOverrideFields$2 {
        /** Item product name */
        productName?: ProductName$2;
        /** Item price **after** discounts. */
        price?: string | null;
        /** Item price **before** discount. */
        fullPrice?: string | null;
        /** Line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine$2[];
        /** Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability. */
        physicalProperties?: PhysicalProperties$2;
        /** Line item image details. */
        image?: string;
    }
    /** Buyer Info */
    interface BuyerInfo$4 extends BuyerInfoIdOneOf$2 {
        /**
         * Visitor ID - if the buyer is **not** a site member.
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID - if the buyer is a site member.
         * @readonly
         */
        memberId?: string;
        /**
         * User ID - if the cart owner is a Wix user.
         * @readonly
         */
        userId?: string;
        /** Contact ID. For more information, see the Contacts API. */
        contactId?: string | null;
        /** Buyer email address. */
        email?: string | null;
    }
    /** @oneof */
    interface BuyerInfoIdOneOf$2 {
        /**
         * Visitor ID - if the buyer is **not** a site member.
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID - if the buyer is a site member.
         * @readonly
         */
        memberId?: string;
        /**
         * User ID - if the cart owner is a Wix user.
         * @readonly
         */
        userId?: string;
    }
    enum WeightUnit$3 {
        /** Weight unit can't be classified, due to an error */
        UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
        /** Kilograms */
        KG = "KG",
        /** Pounds */
        LB = "LB"
    }
    interface CartDiscount$1 extends CartDiscountDiscountSourceOneOf$1 {
        /** Coupon details. */
        coupon?: Coupon$2;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$2;
    }
    /** @oneof */
    interface CartDiscountDiscountSourceOneOf$1 {
        /** Coupon details. */
        coupon?: Coupon$2;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$2;
    }
    interface Coupon$2 {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
    }
    interface MerchantDiscount$2 {
        /** Discount value. */
        amount?: MultiCurrencyPrice$3;
    }
    /** Billing Info and shipping details */
    interface AddressWithContact$2 {
        /** Address. */
        address?: Address$3;
        /** Contact details. */
        contactDetails?: FullAddressContactDetails$2;
    }
    /** Physical address */
    interface Address$3 {
        /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
        country?: string | null;
        /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Postal or zip code. */
        postalCode?: string | null;
        /** Street address. */
        streetAddress?: StreetAddress$2;
        /** Main address line (usually street name and number). */
        addressLine1?: string | null;
        /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
        addressLine2?: string | null;
    }
    interface StreetAddress$2 {
        /** Street number. */
        number?: string;
        /** Street name. */
        name?: string;
    }
    interface AddressLocation$2 {
        /** Address latitude. */
        latitude?: number | null;
        /** Address longitude. */
        longitude?: number | null;
    }
    /** Full contact details for an address */
    interface FullAddressContactDetails$2 {
        /** First name. */
        firstName?: string | null;
        /** Last name. */
        lastName?: string | null;
        /** Phone number. */
        phone?: string | null;
        /** Company name. */
        company?: string | null;
        /** Tax information (for Brazil only). If ID is provided, `vatId.type` must also be set, `UNSPECIFIED` is not allowed. */
        vatId?: VatId$3;
    }
    interface VatId$3 {
        /** Customer's tax ID. */
        _id?: string;
        /**
         * Tax type.
         *
         * Supported values:
         * + `CPF`: for individual tax payers
         * + `CNPJ`: for corporations
         */
        type?: VatType$3;
    }
    /** tax info types */
    enum VatType$3 {
        UNSPECIFIED = "UNSPECIFIED",
        /** CPF - for individual tax payers. */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface SelectedShippingOption$1 {
        /** Carrier ID. */
        carrierId?: string | null;
        /** Selected shipping option code. For example, "usps_std_overnight". */
        code?: string;
    }
    interface ExtendedFields$3 {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    interface GetCurrentCartRequest$1 {
    }
    interface GetCurrentCartResponse$1 {
        /** Current session's active cart. */
        cart?: Cart$1;
    }
    interface UpdateCartRequest$1 {
        /** Cart info. */
        cartInfo?: Cart$1;
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will be applied to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput$1[];
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    interface MerchantDiscountInput$1 {
        /** Discount amount. */
        amount?: string;
        /** IDs of the line items the discount applies to. */
        lineItemIds?: string[];
    }
    interface CustomLineItem$2 {
        /**
         * Custom line item quantity.
         *
         * Min: `1`
         * Max: `100000`
         */
        quantity?: number;
        /**
         * Custom line item price.
         *
         * Must be a number or a decimal without symbols.
         */
        price?: string;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription$2;
        /** Custom line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine$2[];
        /**
         * Custom line item media. Supported formats:
         * + Link to an image/video from the [Wix Media Manager](https://support.wix.com/en/article/wix-media-about-the-media-manager) - `"wix:image://v1/3c76e2_c53...4ea4~mv2.jpg#originWidth=1000&originHeight=1000"`.
         * + An image from the web - `"http(s)://<image url>"`.
         */
        media?: string;
        /**
         * Custom line item ID. If passed, `id` must be unique.
         * Default: auto-generated ID.
         */
        _id?: string | null;
        /** Tax group ID for this custom line item. */
        taxGroupId?: string | null;
        /**
         * *Required** - Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName$2;
        /**
         * Optional - URL to the item's page on the site. When not provided, the link back from the cart page to the relevant product page will not work.
         * The URL is optional and if not provided, the site URL will be used.
         */
        url?: string;
        /** *Required** - Item type. Either a preset type or custom. */
        itemType?: ItemType$2;
        /** Optional - Item price **before** catalog-defined discount. Defaults to `price` when not provided. */
        fullPrice?: string | null;
        /**
         * Optional - Item quantity available for purchase. Only return this if inventory is managed.
         * Not returning this field means that the buyer can "infinitely" tick up the number of items in the cart.
         */
        quantityAvailable?: number | null;
        /** Optional - Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties$2;
        /**
         * Optional - Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE` - Entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE` - Entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `DEPOSIT_ONLINE` -  Partial payment for the given item to be paid upfront during the checkout. Amount to be paid is defined by deposit_amount field.
         */
        paymentOption?: PaymentOptionType$2;
        /**
         * Optional - Service properties. When relevant, this contains information such as date and number of participants.
         * Used, among other things, when checking for valid memberships.
         */
        serviceProperties?: ServiceProperties$2;
        /**
         * Optional - In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + in most cases, this field is the name as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         */
        rootCatalogItemId?: string | null;
        /**
         * Optional - partial payment for the given item to be paid upfront during the checkout.
         * Eligible for catalog items with type `DEPOSIT_ONLINE`.
         * If omitted - item's price will not be split and is expected to be paid in single installment
         */
        depositAmount?: string | null;
        /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$4;
    }
    interface UpdateCartResponse$1 {
        /** Updated Cart. */
        cart?: Cart$1;
    }
    interface AddToCurrentCartRequest$1 {
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    interface AddToCartResponse$1 {
        /** Updated cart. */
        cart?: Cart$1;
    }
    interface AddToCurrentCartAndEstimateTotalsRequest$1 {
        /** Catalog line items. */
        lineItems?: LineItem$4[];
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships$2;
    }
    interface SelectedMemberships$2 {
        /** Selected memberships. */
        memberships?: HostSelectedMembership$1[];
    }
    interface HostSelectedMembership$1 {
        /** Membership ID. */
        _id?: string;
        /** ID of the app providing this payment option. */
        appId?: string;
        /** IDs of the line items this membership applies to. */
        lineItemIds?: string[];
    }
    interface EstimateTotalsResponse$1 {
        /** Cart. */
        cart?: Cart$1;
        /** Calculated line items. */
        calculatedLineItems?: CalculatedLineItem$1[];
        /** Price summary. */
        priceSummary?: PriceSummary$2;
        /** Applied gift card. */
        giftCard?: GiftCard$3;
        /** Tax summary. */
        taxSummary?: TaxSummary$2;
        /** Shipping information. */
        shippingInfo?: ShippingInformation$1;
        /** Applied discounts. */
        appliedDiscounts?: AppliedDiscount$3[];
        /** Calculation errors. */
        calculationErrors?: CalculationErrors$2;
        /** Weight measurement unit - defaults to site's weight unit. */
        weightUnit?: WeightUnit$3;
        /** Currency used for pricing in this store. */
        currency?: string;
        /**
         * Minimal amount to pay in order to place the order.
         * @readonly
         */
        payNow?: PriceSummary$2;
        /**
         * Remaining amount for the order to be fully paid.
         * @readonly
         */
        payLater?: PriceSummary$2;
        /** Information about valid and invalid memberships, and which ones are selected for usage. */
        membershipOptions?: MembershipOptions$2;
        /** Additional fees */
        additionalFees?: AdditionalFee$2[];
        /**
         * List of validation violations raised by the [Validations Custom Extension SPI](https://www.wix.com/velo/reference/spis/wix-ecom/ecom-validations/introduction).
         * @readonly
         */
        violations?: Violation$2[];
    }
    interface CalculatedLineItem$1 {
        /** Line item ID. */
        lineItemId?: string;
        /** Price breakdown for this line item. */
        pricesBreakdown?: LineItemPricesData$1;
        /**
         * Type of selected payment option for current item. Defaults to `"FULL_PAYMENT_ONLINE"`.
         * + `"FULL_PAYMENT_ONLINE"` - The entire payment for this item happens as part of the checkout.
         * + `"FULL_PAYMENT_OFFLINE"` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `"MEMBERSHIP"` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` will be 0.
         */
        paymentOption?: PaymentOptionType$2;
    }
    interface LineItemPricesData$1 {
        /** Total price after discounts and after tax. */
        totalPriceAfterTax?: MultiCurrencyPrice$3;
        /** Total price after discounts, and before tax. */
        totalPriceBeforeTax?: MultiCurrencyPrice$3;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$2;
        /** Total discount for all line items. */
        totalDiscount?: MultiCurrencyPrice$3;
        /** Catalog price after catalog discount and automatic discounts. */
        price?: MultiCurrencyPrice$3;
        /** Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided. */
        priceBeforeDiscounts?: MultiCurrencyPrice$3;
        /** Total price **after** catalog-defined discount and line item discounts. */
        lineItemPrice?: MultiCurrencyPrice$3;
        /** Item price **before** line item discounts and **before** catalog-defined discount. Defaults to `price` when not provided. */
        fullPrice?: MultiCurrencyPrice$3;
    }
    interface ItemTaxFullDetails$2 {
        /** Amount for which tax is calculated. */
        taxableAmount?: MultiCurrencyPrice$3;
        /** Tax rate %, as a decimal point between 0 and 1. */
        taxRate?: string;
        /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
        totalTax?: MultiCurrencyPrice$3;
        /**
         * If breakdown exists, the sum of rates in the breakdown must equal `tax_rate`. Deprecated - use 'tax_breakdown' instead.
         * @readonly
         */
        rateBreakdown?: TaxRateBreakdown$2[];
    }
    interface TaxRateBreakdown$2 {
        /** Name of tax against which the calculation was performed. */
        name?: string;
        /** Rate at which this tax detail was calculated. */
        rate?: string;
        /** Amount of tax for this tax detail. */
        tax?: MultiCurrencyPrice$3;
    }
    /**
     * TaxBreakdown represents tax information for a line item.
     * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
     */
    interface TaxBreakdown$2 {
        /** The name of the jurisdiction to which this tax detail applies. For example, "New York" or "Quebec". */
        jurisdiction?: string | null;
        /** The amount of this line item price that was considered nontaxable. (Decimal value) */
        nonTaxableAmount?: MultiCurrencyPrice$3;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.0000 signifies 200% tax. (Decimal value) */
        rate?: string | null;
        /** The amount of tax estimated for this line item. (Decimal value) */
        taxAmount?: MultiCurrencyPrice$3;
        /** The taxable amount of this line item. */
        taxableAmount?: MultiCurrencyPrice$3;
        /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
        taxType?: string | null;
        /**
         * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
         * This name should be explicit enough to allow the merchant to understand what tax was calculated.
         */
        taxName?: string | null;
        /** The type of the jurisdiction in which this tax detail applies. */
        jurisdictionType?: JurisdictionType$2;
    }
    /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
    enum JurisdictionType$2 {
        UNDEFINED = "UNDEFINED",
        COUNTRY = "COUNTRY",
        STATE = "STATE",
        COUNTY = "COUNTY",
        CITY = "CITY",
        SPECIAL = "SPECIAL"
    }
    interface PriceSummary$2 {
        /** Subtotal of all line items, before discounts and before tax. */
        subtotal?: MultiCurrencyPrice$3;
        /** Total shipping price, before discounts and before tax. */
        shipping?: MultiCurrencyPrice$3;
        /** Total tax. */
        tax?: MultiCurrencyPrice$3;
        /** Total calculated discount value. */
        discount?: MultiCurrencyPrice$3;
        /** Total price after discounts, gift cards, and tax. */
        total?: MultiCurrencyPrice$3;
        /** Total additional fees price before tax. */
        additionalFees?: MultiCurrencyPrice$3;
    }
    interface GiftCard$3 {
        /** Gift Card ID. */
        _id?: string;
        /** Gift card obfuscated code. */
        obfuscatedCode?: string;
        /** Gift card value. */
        amount?: MultiCurrencyPrice$3;
        /** App ID of the gift card provider. */
        appId?: string;
    }
    interface TaxSummary$2 {
        /**
         * Amount for which tax is calculated, added from line items.
         * @readonly
         */
        taxableAmount?: MultiCurrencyPrice$3;
        /**
         * Calculated tax, added from line items.
         * @readonly
         */
        totalTax?: MultiCurrencyPrice$3;
        /** Tax calculator that was active when the order was created. */
        calculationDetails?: TaxCalculationDetails$2;
    }
    interface TaxCalculationDetails$2 extends TaxCalculationDetailsCalculationDetailsOneOf$2 {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason$2;
        /** Error details and reason for tax rate fallback. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails$2;
        /**
         * Rate calculation type. Supported values:
         * + `"AUTO_RATE"`
         * + `"FALLBACK_RATE"`
         * + `"MANUAL_RATE"`
         * + `"NO_TAX_COLLECTED"`
         */
        rateType?: RateType$2;
    }
    /** @oneof */
    interface TaxCalculationDetailsCalculationDetailsOneOf$2 {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason$2;
        /** Details of the fallback rate calculation. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails$2;
    }
    enum RateType$2 {
        /** no tax being collected for this request due to location of purchase */
        NO_TAX_COLLECTED = "NO_TAX_COLLECTED",
        /** manual rate used for calculation */
        MANUAL_RATE = "MANUAL_RATE",
        /** autotax rate used for calculation */
        AUTO_RATE = "AUTO_RATE",
        /** fallback rate used for calculation */
        FALLBACK_RATE = "FALLBACK_RATE"
    }
    enum ManualCalculationReason$2 {
        /** user set calculator in Business Manager to be Manual */
        GLOBAL_SETTING_TO_MANUAL = "GLOBAL_SETTING_TO_MANUAL",
        /** specific region is on manual even though Global setting is Auto-tax */
        REGION_SETTING_TO_MANUAL = "REGION_SETTING_TO_MANUAL"
    }
    interface AutoTaxFallbackCalculationDetails$2 {
        /**
         * Reason for fallback. Supported values:
         * + `"AUTO_TAX_FAILED"`
         * + `"AUTO_TAX_DEACTIVATED"`
         */
        fallbackReason?: FallbackReason$2;
        /** invalid request (i.e. address), timeout, internal error, license error, and others will be encoded here */
        error?: ApplicationError$5;
    }
    enum FallbackReason$2 {
        /** auto-tax failed to be calculated */
        AUTO_TAX_FAILED = "AUTO_TAX_FAILED",
        /** auto-tax was temporarily deactivated on a system-level */
        AUTO_TAX_DEACTIVATED = "AUTO_TAX_DEACTIVATED"
    }
    interface ApplicationError$5 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    /**
     * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
     * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
     */
    interface AggregatedTaxBreakdown$2 {
        /** The name of the tax against which this tax amount was calculated. */
        taxName?: string;
        /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
        taxType?: string;
        /** The name of the jurisdiction in which this tax detail applies. */
        jurisdiction?: string;
        /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
        jurisdictionTypeEnum?: JurisdictionType$2;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.000 signifies 200% tax. (Decimal value) */
        rate?: string;
        /** The sum of all the tax from line items that calculated by the tax identifiers. */
        aggregatedTaxAmount?: MultiCurrencyPrice$3;
    }
    interface ShippingInformation$1 {
        /** Shipping region. */
        region?: ShippingRegion$2;
        /** Selected shipping option. */
        selectedCarrierServiceOption?: SelectedCarrierServiceOption$2;
        /** All shipping options. */
        carrierServiceOptions?: CarrierServiceOption$2[];
    }
    interface ShippingRegion$2 {
        /**
         * Shipping region ID.
         * @readonly
         */
        _id?: string;
        /** Shipping region name. */
        name?: string;
    }
    interface SelectedCarrierServiceOption$2 {
        /** Unique identifier of selected option. For example, "usps_std_overnight". */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         * @readonly
         */
        title?: string;
        /**
         * Delivery logistics.
         * @readonly
         */
        logistics?: DeliveryLogistics$2;
        /**
         * Shipping costs.
         * @readonly
         */
        cost?: SelectedCarrierServiceOptionPrices$2;
        /**
         * Were we able to find the requested shipping option, or otherwise we fallback to the default one (the first)
         * @readonly
         */
        requestedShippingOption?: boolean;
        /** Other charges */
        otherCharges?: SelectedCarrierServiceOptionOtherCharge$2[];
        /** This carrier's unique ID */
        carrierId?: string | null;
    }
    interface DeliveryLogistics$2 {
        /** Expected delivery time, in free text. For example, "3-5 business days". */
        deliveryTime?: string | null;
        /** Instructions for caller, e.g for pickup: "Please deliver during opening hours, and please don't park in disabled parking spot". */
        instructions?: string | null;
        /** Pickup details. */
        pickupDetails?: PickupDetails$3;
    }
    interface PickupDetails$3 {
        /** Pickup address. */
        address?: Address$3;
        /** Whether the pickup address is that of a business - this may effect tax calculation. */
        businessLocation?: boolean;
        /** Pickup method */
        pickupMethod?: PickupMethod$2;
    }
    enum PickupMethod$2 {
        UNKNOWN_METHOD = "UNKNOWN_METHOD",
        STORE_PICKUP = "STORE_PICKUP",
        PICKUP_POINT = "PICKUP_POINT"
    }
    interface DeliveryTimeSlot$2 {
        /** starting time of the delivery time slot */
        from?: Date;
        /** ending time of the delivery time slot */
        to?: Date;
    }
    interface SelectedCarrierServiceOptionPrices$2 {
        /** Total shipping price, after discount and after tax. */
        totalPriceAfterTax?: MultiCurrencyPrice$3;
        /** Total price of shipping after discounts (when relevant), and before tax. */
        totalPriceBeforeTax?: MultiCurrencyPrice$3;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$2;
        /** Shipping discount before tax. */
        totalDiscount?: MultiCurrencyPrice$3;
        /** Shipping price before discount and before tax. */
        price?: MultiCurrencyPrice$3;
    }
    interface SelectedCarrierServiceOptionOtherCharge$2 {
        /** Type of additional cost. */
        type?: ChargeType$2;
        /** Details of the charge, such as 'Full Coverage Insurance of up to 80% of value of shipment'. */
        details?: string | null;
        /** Price of added charge. */
        cost?: SelectedCarrierServiceOptionPrices$2;
    }
    enum ChargeType$2 {
        HANDLING_FEE = "HANDLING_FEE",
        INSURANCE = "INSURANCE"
    }
    interface CarrierServiceOption$2 {
        /** Carrier ID. */
        carrierId?: string;
        /** Shipping options offered by this carrier for this request. */
        shippingOptions?: ShippingOption$2[];
    }
    interface ShippingOption$2 {
        /**
         * Unique code of provided shipping option like "usps_std_overnight".
         * For legacy calculators this would be the UUID of the option.
         */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         */
        title?: string;
        /** Delivery logistics. */
        logistics?: DeliveryLogistics$2;
        /** Sipping price information. */
        cost?: ShippingPrice$2;
    }
    interface ShippingPrice$2 {
        /** Shipping price. */
        price?: MultiCurrencyPrice$3;
        /** Other costs such as insurance, handling & packaging for fragile items, etc. */
        otherCharges?: OtherCharge$2[];
    }
    interface OtherCharge$2 {
        /** Type of additional cost. */
        type?: ChargeType$2;
        /** Price of added cost. */
        price?: MultiCurrencyPrice$3;
    }
    interface AppliedDiscount$3 extends AppliedDiscountDiscountSourceOneOf$2 {
        /** Coupon details. */
        coupon?: V1Coupon$1;
        /** Merchant discount. */
        merchantDiscount?: V1MerchantDiscount$1;
        /** Discount rule */
        discountRule?: DiscountRule$3;
        /** Discount type. */
        discountType?: DiscountType$3;
        /** IDs of the line items the discount applies to. */
        lineItemIds?: string[];
    }
    /** @oneof */
    interface AppliedDiscountDiscountSourceOneOf$2 {
        /** Coupon details. */
        coupon?: V1Coupon$1;
        /** Merchant discount. */
        merchantDiscount?: V1MerchantDiscount$1;
        /** Discount rule */
        discountRule?: DiscountRule$3;
    }
    enum DiscountType$3 {
        GLOBAL = "GLOBAL",
        SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
        SHIPPING = "SHIPPING"
    }
    /** Coupon */
    interface V1Coupon$1 {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
        /** Coupon value. */
        amount?: MultiCurrencyPrice$3;
        /** Coupon name. */
        name?: string;
    }
    interface V1MerchantDiscount$1 {
        /** Discount value. */
        amount?: MultiCurrencyPrice$3;
        /** Discount Percentage. Will be calculated from items price before other discounts. */
        percentage?: number | null;
    }
    interface DiscountRule$3 {
        /** Discount rule ID */
        _id?: string;
        /** Discount rule name */
        name?: DiscountRuleName$3;
        /** Discount value. */
        amount?: MultiCurrencyPrice$3;
    }
    interface DiscountRuleName$3 {
        /** Original discount rule name (in site's default language). */
        original?: string;
        /** Discount rule name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface LineItemDiscount$2 {
        /** ID of line item the discount applies to. */
        _id?: string;
        /** Discount value. */
        totalDiscountAmount?: MultiCurrencyPrice$3;
    }
    interface CalculationErrors$2 extends CalculationErrorsShippingCalculationErrorOneOf$2 {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details$2;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors$2;
        /** Tax calculation error. */
        taxCalculationError?: Details$2;
        /** Coupon calculation error. */
        couponCalculationError?: Details$2;
        /** Gift card calculation error. */
        giftCardCalculationError?: Details$2;
        /** Order validation errors. */
        orderValidationErrors?: ApplicationError$5[];
        /**
         * Membership payment methods calculation errors
         * For example, will indicate that a line item that must be paid with membership payment doesn't have one or selected memberships are invalid
         */
        membershipError?: Details$2;
        /** Discount Rule calculation error. */
        discountsCalculationError?: Details$2;
    }
    /** @oneof */
    interface CalculationErrorsShippingCalculationErrorOneOf$2 {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details$2;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors$2;
    }
    interface Details$2 extends DetailsKindOneOf$2 {
        applicationError?: ApplicationError$5;
        validationError?: ValidationError$2;
        systemError?: SystemError$2;
        /** Deprecated in APIs. Used to enable migration from rendering arbitrary tracing to rest response. */
        tracing?: Record<string, string>;
    }
    /** @oneof */
    interface DetailsKindOneOf$2 {
        applicationError?: ApplicationError$5;
        validationError?: ValidationError$2;
        systemError?: SystemError$2;
    }
    /**
     * example result:
     * {
     * "fieldViolations": [
     * {
     * "field": "fieldA",
     * "description": "invalid music note. supported notes: [do,re,mi,fa,sol,la,ti]",
     * "violatedRule": "OTHER",
     * "ruleName": "INVALID_NOTE",
     * "data": {
     * "value": "FI"
     * }
     * },
     * {
     * "field": "fieldB",
     * "description": "field value out of range. supported range: [0-20]",
     * "violatedRule": "MAX",
     * "data": {
     * "threshold": 20
     * }
     * },
     * {
     * "field": "fieldC",
     * "description": "invalid phone number. provide a valid phone number of size: [7-12], supported characters: [0-9, +, -, (, )]",
     * "violatedRule": "FORMAT",
     * "data": {
     * "type": "PHONE"
     * }
     * }
     * ]
     * }
     */
    interface ValidationError$2 {
        fieldViolations?: FieldViolation$2[];
    }
    enum RuleType$2 {
        VALIDATION = "VALIDATION",
        OTHER = "OTHER",
        MAX = "MAX",
        MIN = "MIN",
        MAX_LENGTH = "MAX_LENGTH",
        MIN_LENGTH = "MIN_LENGTH",
        MAX_SIZE = "MAX_SIZE",
        MIN_SIZE = "MIN_SIZE",
        FORMAT = "FORMAT",
        DECIMAL_LTE = "DECIMAL_LTE",
        DECIMAL_GTE = "DECIMAL_GTE",
        DECIMAL_LT = "DECIMAL_LT",
        DECIMAL_GT = "DECIMAL_GT",
        DECIMAL_MAX_SCALE = "DECIMAL_MAX_SCALE",
        INVALID_ENUM_VALUE = "INVALID_ENUM_VALUE",
        REQUIRED_FIELD = "REQUIRED_FIELD",
        FIELD_NOT_ALLOWED = "FIELD_NOT_ALLOWED",
        ONE_OF_ALIGNMENT = "ONE_OF_ALIGNMENT"
    }
    interface FieldViolation$2 {
        field?: string;
        description?: string;
        violatedRule?: RuleType$2;
        /** applicable when violated_rule=OTHER */
        ruleName?: string | null;
        data?: Record<string, any> | null;
    }
    interface SystemError$2 {
        /** Error code. */
        errorCode?: string | null;
    }
    interface CarrierErrors$2 {
        /** Carrier errors. */
        errors?: CarrierError$2[];
    }
    interface CarrierError$2 {
        /** Carrier ID. */
        carrierId?: string;
        /** Error details. */
        error?: Details$2;
    }
    interface MembershipOptions$2 {
        /** List of payment options that can be used. */
        eligibleMemberships?: Membership$2[];
        /** List of payment options that are owned by the member, but cannot be used due to reason provided. */
        invalidMemberships?: InvalidMembership$2[];
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: HostSelectedMembership$1[];
    }
    interface Membership$2 {
        /** Membership ID. */
        _id?: string;
        /** ID of the application providing this payment option. */
        appId?: string;
        /** The name of this membership. */
        name?: MembershipName$3;
        /** Line item IDs which are "paid" for by this membership. */
        lineItemIds?: string[];
        /** Optional - For a membership that has limited credits, information about credit usage. */
        credits?: MembershipPaymentCredits$2;
        /** Optional - TMembership expiry date. */
        expirationDate?: Date;
        /** Additional data about this membership. */
        additionalData?: Record<string, any> | null;
    }
    interface MembershipName$3 {
        /** The name of this membership */
        original?: string;
        /** Membership name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface MembershipPaymentCredits$2 {
        /** How much credit this membership has in total */
        total?: number;
        /** How much credit remained for this membership */
        remaining?: number;
    }
    interface InvalidMembership$2 {
        /** Membership details. */
        membership?: Membership$2;
        /** Reason why this membership is invalid and cannot be used. */
        reason?: string;
    }
    interface AdditionalFee$2 {
        /** Additional fee's unique code (or ID) for future processing. */
        code?: string | null;
        /** Translated additional fee's name. */
        name?: string;
        /** Additional fee's price. */
        price?: MultiCurrencyPrice$3;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$2;
        /** Provider's app id. */
        providerAppId?: string | null;
        /** Additional fee's price before tax. */
        priceBeforeTax?: MultiCurrencyPrice$3;
        /**
         * Optional - Line items associated with this additional fee.
         * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
         */
        lineItemIds?: string[];
    }
    interface Violation$2 {
        /** Severity of the violation. The violations are shown on the cart and checkout pages. A warning is displayed as yellow, and allows a site visitor to proceed with caution. An error is displayed as red, and doesn't allow a site visitor to proceed with the eCommerce flow. */
        severity?: Severity$2;
        /** Target location on a checkout or cart page where the violation will be displayed. */
        target?: Target$2;
        /** Violation description. Can include rich text. Only HTTP or HTTPS links in the following format are allowed: `<a href="https://www.wix.com">Click me</a>`. */
        description?: string | null;
    }
    enum Severity$2 {
        /** The user is allowed to move forward in the flow. */
        WARNING = "WARNING",
        /**
         * The user is blocked from moving forward in the flow.
         * For example, if callerContext is CART - moving to checkout is blocked. if callerContext is CHECKOUT, placing an order is blocked.
         */
        ERROR = "ERROR"
    }
    interface Target$2 extends TargetTargetTypeOneOf$2 {
        /** General (other) violation. */
        other?: Other$2;
        /** Specific line item violation. */
        lineItem?: TargetLineItem$2;
    }
    /** @oneof */
    interface TargetTargetTypeOneOf$2 {
        /** General (other) violation. */
        other?: Other$2;
        /** Specific line item violation. */
        lineItem?: TargetLineItem$2;
    }
    /** Available locations on the webpage */
    enum NameInOther$2 {
        /** default location, in case no specific location is specified */
        OTHER_DEFAULT = "OTHER_DEFAULT"
    }
    /** Available locations on the line item */
    enum NameInLineItem$2 {
        /** default location, in case no specific location is specified */
        LINE_ITEM_DEFAULT = "LINE_ITEM_DEFAULT"
    }
    /** General (other) violation. */
    interface Other$2 {
        /** Location on a checkout or a cart page where a general (other) violation will be displayed. */
        name?: NameInOther$2;
    }
    /** Specific line item violation. */
    interface TargetLineItem$2 {
        /** Location on a checkout or a cart page where the specific line item violation will be displayed. */
        name?: NameInLineItem$2;
        /** ID of the line item containing the violation. */
        _id?: string | null;
    }
    interface RemoveLineItemsFromCurrentCartRequest$1 {
        /** IDs of the line items to remove from the cart. */
        lineItemIds: string[];
    }
    interface RemoveLineItemsResponse$1 {
        /** Updated cart. */
        cart?: Cart$1;
    }
    interface CreateCheckoutFromCurrentCartRequest$1 {
        /** **Required**. Sales channel type. */
        channelType?: ChannelType$3;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Mandatory when setting a billing or shipping address if the site visitor isn't logged in. */
        email?: string | null;
    }
    enum ChannelType$3 {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        POS = "POS",
        EBAY = "EBAY",
        AMAZON = "AMAZON",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE",
        WIX_INVOICES = "WIX_INVOICES",
        BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
        WISH = "WISH",
        CLASS_PASS = "CLASS_PASS",
        GLOBAL_E = "GLOBAL_E",
        FACEBOOK = "FACEBOOK",
        ETSY = "ETSY",
        TIKTOK = "TIKTOK",
        FAIRE_COM = "FAIRE_COM"
    }
    interface CreateCheckoutResponse$1 {
        /** The newly created checkout's ID. */
        checkoutId?: string;
    }
    interface RemoveCouponFromCurrentCartRequest$1 {
    }
    interface RemoveCouponResponse$1 {
        /** Updated cart. */
        cart?: Cart$1;
    }
    interface UpdateCurrentCartLineItemQuantityRequest$1 {
        /** Line item IDs and their new quantity. */
        lineItems: LineItemQuantityUpdate$1[];
    }
    interface LineItemQuantityUpdate$1 {
        /** Line item ID. Required. */
        _id?: string;
        /** New quantity. Number must be 1 or higher. Required. */
        quantity?: number;
    }
    interface UpdateLineItemsQuantityResponse$1 {
        /** Updated cart. */
        cart?: Cart$1;
    }
    interface EstimateCurrentCartTotalsRequest$1 {
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships$2;
    }
    interface DeleteCurrentCartRequest$1 {
    }
    interface DeleteCartResponse$1 {
    }
    interface DomainEvent$7 extends DomainEventBodyOneOf$7 {
        createdEvent?: EntityCreatedEvent$7;
        updatedEvent?: EntityUpdatedEvent$7;
        deletedEvent?: EntityDeletedEvent$7;
        actionEvent?: ActionEvent$7;
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
    interface DomainEventBodyOneOf$7 {
        createdEvent?: EntityCreatedEvent$7;
        updatedEvent?: EntityUpdatedEvent$7;
        deletedEvent?: EntityDeletedEvent$7;
        actionEvent?: ActionEvent$7;
    }
    interface EntityCreatedEvent$7 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$7 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$7 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$7 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$7 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$7;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$7 extends IdentificationDataIdOneOf$7 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$7;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$7 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$7 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    interface CreateCartRequest$1 {
        /** Cart info. */
        cartInfo?: Cart$1;
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will apply to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput$1[];
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    interface CreateCartResponse$1 {
        /** Cart. */
        cart?: Cart$1;
    }
    interface GetCartRequest$1 {
        /** ID of the cart to retrieve. */
        _id: string;
    }
    interface GetCartResponse$1 {
        /** The requested cart. */
        cart?: Cart$1;
    }
    interface GetCartByCheckoutIdRequest$1 {
        /** Checkout ID. */
        _id: string;
    }
    interface GetCartByCheckoutIdResponse$1 {
        /** The requested cart. */
        cart?: Cart$1;
    }
    interface AddToCartRequest$1 {
        /** Cart ID. */
        _id: string;
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    interface RemoveLineItemsRequest$1 {
        /** Cart ID. */
        _id: string;
        /** IDs of the line items to remove from the cart. */
        lineItemIds: string[];
    }
    interface CreateCheckoutRequest$1 {
        /** Cart ID. */
        _id: string;
        /** **Required**. Sales channel type. */
        channelType?: ChannelType$3;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Mandatory when setting a billing or shipping address if the site visitor isn't logged in. */
        email?: string | null;
    }
    interface RemoveCouponRequest$1 {
        /** Cart ID. */
        _id: string;
    }
    interface UpdateLineItemsQuantityRequest$1 {
        /** Cart ID. */
        _id: string;
        /** Line item IDs and their new quantity. */
        lineItems: LineItemQuantityUpdate$1[];
    }
    interface EstimateTotalsRequest$1 {
        /** Cart ID. */
        _id: string;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships$2;
    }
    interface DeleteCartRequest$1 {
        /** ID of the cart to delete. */
        _id: string;
    }
    interface Empty$3 {
    }
    /**
     * Creates a new cart.
     *
     *
     * The `createCart()` function returns a Promise that resolves to the new cart when it's created.
     *
     * > **Note:** When adding catalog items, `options.lineItems.catalogReference` is required.
     * @public
     * @requiredField options.lineItems.catalogReference
     * @requiredField options.lineItems.quantity
     * @requiredField options.lineItems.selectedMembership._id
     * @requiredField options.lineItems.selectedMembership.appId
     * @param options - Cart creation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Cart.
     */
    function createCart(options?: CreateCartOptions): Promise<Cart$1>;
    interface CreateCartOptions {
        /** Cart info. */
        cartInfo?: Cart$1;
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will apply to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput$1[];
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    /**
     * Updates a specified cart's properties.
     *
     *
     * The `updateCart()` function returns a Promise that resolves when the specified cart's properties are updated.
     *
     * > **Note:** When updating catalog items, `options.lineItems.catalogReference` is required.
     * @public
     * @requiredField _id
     * @requiredField options.lineItems.catalogReference
     * @param options - Available options to use when updating a cart.
     * @param _id - ID of the cart to be updated.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Updated cart.
     */
    function updateCart(_id: string | null, options?: UpdateCartOptions): Promise<Cart$1>;
    interface UpdateCartOptions {
        /** The information for the cart being updated. */
        cartInfo: {
            /** ID of the cart to be updated. */
            _id?: string | null;
            /**
             * Line items.
             * @readonly
             */
            lineItems?: LineItem$4[];
            /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
            buyerNote?: string | null;
            /** Buyer information. */
            buyerInfo?: BuyerInfo$4;
            /**
             * Currency used for pricing.
             * @readonly
             */
            currency?: string;
            /**
             * Currency code used for all the converted prices that are returned.
             * For a site that supports multiple currencies, this is the currency the buyer selected.
             * @readonly
             */
            conversionCurrency?: string;
            /**
             * Language for communication with the buyer. Defaults to the site language.
             * For a site that supports multiple languages, this is the language the buyer selected.
             * @readonly
             */
            buyerLanguage?: string | null;
            /**
             * Site language in which original values are displayed.
             * @readonly
             */
            siteLanguage?: string | null;
            /**
             * Whether tax is included in line item prices.
             * @readonly
             */
            taxIncludedInPrices?: boolean | null;
            /**
             * Weight measurement unit - defaults to site's weight unit.
             * @readonly
             */
            weightUnit?: WeightUnit$3;
            /**
             * ID of the checkout that originated from this cart.
             * @readonly
             */
            checkoutId?: string | null;
            /**
             * Cart discounts.
             * @readonly
             */
            appliedDiscounts?: CartDiscount$1[];
            /**
             * Date and time the cart was created.
             * @readonly
             */
            _createdDate?: Date;
            /**
             * Date and time the cart was updated.
             * @readonly
             */
            _updatedDate?: Date;
            /** Contact info. */
            contactInfo?: AddressWithContact$2;
            /**
             * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
             *
             * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
             */
            overrideCheckoutUrl?: string | null;
            /**
             * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
             * @readonly
             */
            purchaseFlowId?: string | null;
            /** Selected shipping option. */
            selectedShippingOption?: SelectedShippingOption$1;
        };
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will be applied to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput$1[];
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    /**
     * Retrieves a cart.
     *
     *
     * The `getCart()` function returns a Promise that resolves when the specified cart is retrieved.
     * @param _id - ID of the cart to retrieve.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - The specified cart.
     */
    function getCart(_id: string): Promise<Cart$1>;
    /**
     * Adds catalog line items to a cart.
     *
     *
     * The `addToCart()` function returns a Promise that resolves to the updated cart when the specified items have been added.
     *
     * > **Note:** When adding catalog items, `options.lineItems.catalogReference` is required.
     * @param _id - Cart ID.
     * @public
     * @requiredField _id
     * @requiredField options.lineItems.catalogReference
     * @requiredField options.lineItems.selectedMembership._id
     * @requiredField options.lineItems.selectedMembership.appId
     * @param options - Items to be added to cart.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Cart.
     */
    function addToCart(_id: string, options?: AddToCartOptions): Promise<AddToCartResponse$1>;
    interface AddToCartOptions {
        /** Catalog line items. */
        lineItems?: LineItem$4[];
    }
    /**
     * Removes line items from the specified cart.
     *
     *
     * The `removeLineItems()` function returns a Promise that resolves to the updated cart when the line items are removed from the specified cart.
     * @public
     * @requiredField _id
     * @requiredField lineItemIds
     * @param lineItemIds - IDs of the line items to remove from the cart.
     * @param _id - ID of the cart to remove line items from.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Updated cart.
     */
    function removeLineItems(_id: string, lineItemIds: string[]): Promise<RemoveLineItemsResponse$1>;
    /**
     * Creates a checkout from a cart.
     *
     *
     * The `createCheckout()` function returns a Promise that resolves to the new checkout's ID when it's created.
     *
     * If a checkout was already created from the specified cart, that checkout will be
     * updated with any new information from the cart.
     *
     * > **Note:** `options.channelType` is a required field.
     * @param _id - Cart ID.
     * @public
     * @requiredField _id
     * @param options - Checkout creation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - ID of the newly created checkout.
     */
    function createCheckout(_id: string, options?: CreateCheckoutOptions): Promise<CreateCheckoutResponse$1>;
    interface CreateCheckoutOptions {
        /** **Required**. Sales channel type. */
        channelType?: ChannelType$3;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Mandatory when setting a billing or shipping address if the site visitor isn't logged in. */
        email?: string | null;
    }
    /**
     * Removes the coupon from a specified cart.
     *
     *
     * The `removeCoupon()` function returns a Promise that resolves to the updated cart when the coupon is removed from the specified cart.
     * @param _id - Cart ID.
     * @public
     * @requiredField _id
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Updated cart.
     */
    function removeCoupon(_id: string): Promise<RemoveCouponResponse$1>;
    /**
     * Updates the quantity of one or more line items in a specified cart.
     *
     *
     * The `updateLineItemsQuantity()` function returns a Promise that resolves when the quantities of the specified cart's line items are updated.
     *
     * This endpoint is only for updating the quantity of line items. To entirely remove a line item from the cart, use [`removeLineItems()`](#removelineitems). To add a new line item to the cart, use [`addToCart()`](#addtocart).
     *
     * This endpoint checks the amount of stock remaining for this line item. If the specified `quantity` is greater than the remaining stock, then the `quantity` returned in the response is the total amount of remaining stock.
     * @param _id - Cart ID.
     * @param lineItems - Line item IDs and their new quantity.
     * @public
     * @requiredField _id
     * @requiredField lineItems
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Updated cart.
     */
    function updateLineItemsQuantity(_id: string, lineItems: LineItemQuantityUpdate$1[]): Promise<UpdateLineItemsQuantityResponse$1>;
    /**
     * Estimates the subtotal and total for current site visitor’s cart. Totals include tax and are based on the selected carrier service, shipping address, and billing information.
     *
     *
     * The `estimateTotals()` function returns a Promise that resolves when the estimated totals are generated.
     *
     * > **Note:** Not passing any `options` properties will only estimate the cart items price totals.
     * @param _id - Cart ID.
     * @public
     * @requiredField _id
     * @param options - Total estimation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Cart's estimated totals.
     */
    function estimateTotals(_id: string, options?: EstimateTotalsOptions): Promise<EstimateTotalsResponse$1>;
    interface EstimateTotalsOptions {
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption$1;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address$3;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address$3;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships$2;
    }
    /**
     * Deletes a cart.
     *
     *
     * The `deleteCart()` function returns a Promise that resolves when the specified cart is deleted.
     * @public
     * @requiredField _id
     * @param _id - ID of the cart to delete.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - When the cart is deleted. Rejected - Error message.
     */
    function deleteCart(_id: string): Promise<void>;
    const ecomV1CartCart_universal_d_createCart: typeof createCart;
    type ecomV1CartCart_universal_d_CreateCartOptions = CreateCartOptions;
    const ecomV1CartCart_universal_d_updateCart: typeof updateCart;
    type ecomV1CartCart_universal_d_UpdateCartOptions = UpdateCartOptions;
    const ecomV1CartCart_universal_d_getCart: typeof getCart;
    const ecomV1CartCart_universal_d_addToCart: typeof addToCart;
    type ecomV1CartCart_universal_d_AddToCartOptions = AddToCartOptions;
    const ecomV1CartCart_universal_d_removeLineItems: typeof removeLineItems;
    const ecomV1CartCart_universal_d_createCheckout: typeof createCheckout;
    type ecomV1CartCart_universal_d_CreateCheckoutOptions = CreateCheckoutOptions;
    const ecomV1CartCart_universal_d_removeCoupon: typeof removeCoupon;
    const ecomV1CartCart_universal_d_updateLineItemsQuantity: typeof updateLineItemsQuantity;
    const ecomV1CartCart_universal_d_estimateTotals: typeof estimateTotals;
    type ecomV1CartCart_universal_d_EstimateTotalsOptions = EstimateTotalsOptions;
    const ecomV1CartCart_universal_d_deleteCart: typeof deleteCart;
    namespace ecomV1CartCart_universal_d {
        export { Cart$1 as Cart, LineItem$4 as LineItem, CatalogReference$4 as CatalogReference, ProductName$2 as ProductName, MultiCurrencyPrice$3 as MultiCurrencyPrice, DescriptionLine$2 as DescriptionLine, DescriptionLineValueOneOf$2 as DescriptionLineValueOneOf, DescriptionLineDescriptionLineValueOneOf$2 as DescriptionLineDescriptionLineValueOneOf, DescriptionLineName$2 as DescriptionLineName, PlainTextValue$2 as PlainTextValue, Color$2 as Color, DescriptionLineType$2 as DescriptionLineType, ItemAvailabilityInfo$2 as ItemAvailabilityInfo, ItemAvailabilityStatus$2 as ItemAvailabilityStatus, PhysicalProperties$2 as PhysicalProperties, Scope$3 as Scope, Group$2 as Group, ItemType$2 as ItemType, ItemTypeItemTypeDataOneOf$2 as ItemTypeItemTypeDataOneOf, ItemTypeItemType$2 as ItemTypeItemType, SubscriptionOptionInfo$3 as SubscriptionOptionInfo, SubscriptionSettings$3 as SubscriptionSettings, SubscriptionFrequency$3 as SubscriptionFrequency, Title$2 as Title, Description$2 as Description, SecuredMedia$2 as SecuredMedia, FileType$2 as FileType, PaymentOptionType$2 as PaymentOptionType, ServiceProperties$2 as ServiceProperties, PriceDescription$2 as PriceDescription, SelectedMembership$2 as SelectedMembership, CatalogOverrideFields$2 as CatalogOverrideFields, BuyerInfo$4 as BuyerInfo, BuyerInfoIdOneOf$2 as BuyerInfoIdOneOf, WeightUnit$3 as WeightUnit, CartDiscount$1 as CartDiscount, CartDiscountDiscountSourceOneOf$1 as CartDiscountDiscountSourceOneOf, Coupon$2 as Coupon, MerchantDiscount$2 as MerchantDiscount, AddressWithContact$2 as AddressWithContact, Address$3 as Address, StreetAddress$2 as StreetAddress, AddressLocation$2 as AddressLocation, FullAddressContactDetails$2 as FullAddressContactDetails, VatId$3 as VatId, VatType$3 as VatType, SelectedShippingOption$1 as SelectedShippingOption, ExtendedFields$3 as ExtendedFields, GetCurrentCartRequest$1 as GetCurrentCartRequest, GetCurrentCartResponse$1 as GetCurrentCartResponse, UpdateCartRequest$1 as UpdateCartRequest, MerchantDiscountInput$1 as MerchantDiscountInput, CustomLineItem$2 as CustomLineItem, UpdateCartResponse$1 as UpdateCartResponse, AddToCurrentCartRequest$1 as AddToCurrentCartRequest, AddToCartResponse$1 as AddToCartResponse, AddToCurrentCartAndEstimateTotalsRequest$1 as AddToCurrentCartAndEstimateTotalsRequest, SelectedMemberships$2 as SelectedMemberships, HostSelectedMembership$1 as HostSelectedMembership, EstimateTotalsResponse$1 as EstimateTotalsResponse, CalculatedLineItem$1 as CalculatedLineItem, LineItemPricesData$1 as LineItemPricesData, ItemTaxFullDetails$2 as ItemTaxFullDetails, TaxRateBreakdown$2 as TaxRateBreakdown, TaxBreakdown$2 as TaxBreakdown, JurisdictionType$2 as JurisdictionType, PriceSummary$2 as PriceSummary, GiftCard$3 as GiftCard, TaxSummary$2 as TaxSummary, TaxCalculationDetails$2 as TaxCalculationDetails, TaxCalculationDetailsCalculationDetailsOneOf$2 as TaxCalculationDetailsCalculationDetailsOneOf, RateType$2 as RateType, ManualCalculationReason$2 as ManualCalculationReason, AutoTaxFallbackCalculationDetails$2 as AutoTaxFallbackCalculationDetails, FallbackReason$2 as FallbackReason, ApplicationError$5 as ApplicationError, AggregatedTaxBreakdown$2 as AggregatedTaxBreakdown, ShippingInformation$1 as ShippingInformation, ShippingRegion$2 as ShippingRegion, SelectedCarrierServiceOption$2 as SelectedCarrierServiceOption, DeliveryLogistics$2 as DeliveryLogistics, PickupDetails$3 as PickupDetails, PickupMethod$2 as PickupMethod, DeliveryTimeSlot$2 as DeliveryTimeSlot, SelectedCarrierServiceOptionPrices$2 as SelectedCarrierServiceOptionPrices, SelectedCarrierServiceOptionOtherCharge$2 as SelectedCarrierServiceOptionOtherCharge, ChargeType$2 as ChargeType, CarrierServiceOption$2 as CarrierServiceOption, ShippingOption$2 as ShippingOption, ShippingPrice$2 as ShippingPrice, OtherCharge$2 as OtherCharge, AppliedDiscount$3 as AppliedDiscount, AppliedDiscountDiscountSourceOneOf$2 as AppliedDiscountDiscountSourceOneOf, DiscountType$3 as DiscountType, V1Coupon$1 as V1Coupon, V1MerchantDiscount$1 as V1MerchantDiscount, DiscountRule$3 as DiscountRule, DiscountRuleName$3 as DiscountRuleName, LineItemDiscount$2 as LineItemDiscount, CalculationErrors$2 as CalculationErrors, CalculationErrorsShippingCalculationErrorOneOf$2 as CalculationErrorsShippingCalculationErrorOneOf, Details$2 as Details, DetailsKindOneOf$2 as DetailsKindOneOf, ValidationError$2 as ValidationError, RuleType$2 as RuleType, FieldViolation$2 as FieldViolation, SystemError$2 as SystemError, CarrierErrors$2 as CarrierErrors, CarrierError$2 as CarrierError, MembershipOptions$2 as MembershipOptions, Membership$2 as Membership, MembershipName$3 as MembershipName, MembershipPaymentCredits$2 as MembershipPaymentCredits, InvalidMembership$2 as InvalidMembership, AdditionalFee$2 as AdditionalFee, Violation$2 as Violation, Severity$2 as Severity, Target$2 as Target, TargetTargetTypeOneOf$2 as TargetTargetTypeOneOf, NameInOther$2 as NameInOther, NameInLineItem$2 as NameInLineItem, Other$2 as Other, TargetLineItem$2 as TargetLineItem, RemoveLineItemsFromCurrentCartRequest$1 as RemoveLineItemsFromCurrentCartRequest, RemoveLineItemsResponse$1 as RemoveLineItemsResponse, CreateCheckoutFromCurrentCartRequest$1 as CreateCheckoutFromCurrentCartRequest, ChannelType$3 as ChannelType, CreateCheckoutResponse$1 as CreateCheckoutResponse, RemoveCouponFromCurrentCartRequest$1 as RemoveCouponFromCurrentCartRequest, RemoveCouponResponse$1 as RemoveCouponResponse, UpdateCurrentCartLineItemQuantityRequest$1 as UpdateCurrentCartLineItemQuantityRequest, LineItemQuantityUpdate$1 as LineItemQuantityUpdate, UpdateLineItemsQuantityResponse$1 as UpdateLineItemsQuantityResponse, EstimateCurrentCartTotalsRequest$1 as EstimateCurrentCartTotalsRequest, DeleteCurrentCartRequest$1 as DeleteCurrentCartRequest, DeleteCartResponse$1 as DeleteCartResponse, DomainEvent$7 as DomainEvent, DomainEventBodyOneOf$7 as DomainEventBodyOneOf, EntityCreatedEvent$7 as EntityCreatedEvent, EntityUpdatedEvent$7 as EntityUpdatedEvent, EntityDeletedEvent$7 as EntityDeletedEvent, ActionEvent$7 as ActionEvent, MessageEnvelope$7 as MessageEnvelope, IdentificationData$7 as IdentificationData, IdentificationDataIdOneOf$7 as IdentificationDataIdOneOf, WebhookIdentityType$7 as WebhookIdentityType, CreateCartRequest$1 as CreateCartRequest, CreateCartResponse$1 as CreateCartResponse, GetCartRequest$1 as GetCartRequest, GetCartResponse$1 as GetCartResponse, GetCartByCheckoutIdRequest$1 as GetCartByCheckoutIdRequest, GetCartByCheckoutIdResponse$1 as GetCartByCheckoutIdResponse, AddToCartRequest$1 as AddToCartRequest, RemoveLineItemsRequest$1 as RemoveLineItemsRequest, CreateCheckoutRequest$1 as CreateCheckoutRequest, RemoveCouponRequest$1 as RemoveCouponRequest, UpdateLineItemsQuantityRequest$1 as UpdateLineItemsQuantityRequest, EstimateTotalsRequest$1 as EstimateTotalsRequest, DeleteCartRequest$1 as DeleteCartRequest, Empty$3 as Empty, ecomV1CartCart_universal_d_createCart as createCart, ecomV1CartCart_universal_d_CreateCartOptions as CreateCartOptions, ecomV1CartCart_universal_d_updateCart as updateCart, ecomV1CartCart_universal_d_UpdateCartOptions as UpdateCartOptions, ecomV1CartCart_universal_d_getCart as getCart, ecomV1CartCart_universal_d_addToCart as addToCart, ecomV1CartCart_universal_d_AddToCartOptions as AddToCartOptions, ecomV1CartCart_universal_d_removeLineItems as removeLineItems, ecomV1CartCart_universal_d_createCheckout as createCheckout, ecomV1CartCart_universal_d_CreateCheckoutOptions as CreateCheckoutOptions, ecomV1CartCart_universal_d_removeCoupon as removeCoupon, ecomV1CartCart_universal_d_updateLineItemsQuantity as updateLineItemsQuantity, ecomV1CartCart_universal_d_estimateTotals as estimateTotals, ecomV1CartCart_universal_d_EstimateTotalsOptions as EstimateTotalsOptions, ecomV1CartCart_universal_d_deleteCart as deleteCart, };
    }
    interface Recommendation {
        /** Recommended items. */
        items?: CatalogReference$3[];
        /** The algorithm used to provide the recommendation. */
        algorithm?: Algorithm;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$3 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs. Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from a Wix Stores catalog, learn more about [eCommerce integration](https://dev.wix.com/docs/rest/business-solutions/stores/catalog/e-commerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface Algorithm {
        /** Algorithm ID defined by the app providing the algorithm. */
        _id?: string;
        /**
         * App ID of the Wix or 3rd-party app providing the algorithm.
         *
         * Wix app IDs are <a href="https://dev.wix.com/api/rest/getting-started/wix-business-solutions#getting-started_wix-business-solutions_about-wix-business-solutions" target="_blank">listed here</a>.
         */
        appId?: string;
    }
    interface ListAvailableAlgorithmsRequest {
    }
    interface ListAvailableAlgorithmsResponse {
        /** Algorithms available for use on your Wix site or project. See the method description for more information. */
        availableAlgorithms?: AlgorithmInfo[];
    }
    interface AlgorithmInfo {
        /** How the algorithm is configured. */
        config?: AlgorithmConfig;
        /**
         * The app ID of the application providing the algorithm.
         *
         * Wix app IDs are <a href="https://dev.wix.com/api/rest/getting-started/wix-business-solutions#getting-started_wix-business-solutions_about-wix-business-solutions" target="_blank">listed here</a>.
         */
        appId?: string;
        /**
         * App IDs of catalogs to which the algorithm can be applied.
         *
         * Wix app IDs are <a href="https://dev.wix.com/api/rest/getting-started/wix-business-solutions#getting-started_wix-business-solutions_about-wix-business-solutions" target="_blank">listed here</a>.
         */
        catalogAppIds?: string[];
    }
    interface AlgorithmConfig {
        /** Algorithm ID. This must be unique for a specific app but does not have to be unique across all apps on the site or in the project. */
        _id?: string;
        /** Algorithm name. This value is not translatable. */
        name?: string;
        /** Algorithm description. This describes how the algorithm works and if it has any limitations regarding site content, number of items in the catalog, site traffic, and so on. This value is not translatable. */
        description?: string;
        /** A supplemental `description`. It can be used to help break up and organize information. You can, for example, display this information as a tooltip or as an additional section that is collapsed by default. */
        additionalInfo?: string | null;
        /**
         * Algorithms may have the following types:
         * * `RELATED_ITEMS` - This type of algorithm provides recommendations based on 1 or more other provided items. For example, when an item is added to a cart, the algorithm can suggest other items frequently bought together with that item.
         * * `GLOBAL` - This type of algorithm provides general recommendations based on site or project statistics. For example, bestsellers or new arrivals.
         */
        algorithmType?: AlgorithmType;
    }
    enum AlgorithmType {
        UNSPECIFIED = "UNSPECIFIED",
        RELATED_ITEMS = "RELATED_ITEMS",
        GLOBAL = "GLOBAL"
    }
    interface GetRecommendationRequest {
        /** The set of items for which to get recommendations. Required if the `algorithmType` is `RELATED_ITEMS`. */
        items?: CatalogReference$3[];
        /**
         * A list of algorithms checked in a specific order determined by their `appID` and their position in the `algorithms` array.
         * See the method description for more information.
         *
         * If no algorithm is able to return at least `minimumRecommendedItems` items, an empty array is returned.
         */
        algorithms: Algorithm[];
        /**
         * The minimum number of items that must be recommended by the algorithm for those items to be returned in the response.
         *
         * Max: `100`
         */
        minimumRecommendedItems?: number;
    }
    interface GetRecommendationResponse {
        /** An object containing a list of items recommended by 1 of the specified algorithms. The recommendation is empty if none of the specified algorithms recommended enough items. */
        recommendation?: Recommendation;
    }
    interface ItemAppIdNotSupportedByProvider {
        /** Items with an App ID not supported by the provider. Supported App IDs can be found in the provider config in the Dev Center. */
        items?: CatalogReference$3[];
        /** Algorithms that don't support the requested items. */
        algorithms?: Algorithm[];
    }
    interface RecommendationAlgorithmNotSupported {
        /** Algorithms not supported by the provider. */
        unsupportedAlgorithms?: Algorithm[];
    }
    /**
     * Returns a list of recommendation algorithms that can be used on your Wix site or project. These algorithms can be used with [`getRecommendation()`](#getRecommendation) to provide item recommendations to the customer.
     *
     * Algorithms are run by the apps that provide them, and can only be used on catalogs they support. Apps may provide algorithms for use with their own catalogs and/or catalogs from other apps.
     *
     * The app which provides an algorithm is referenced by that algorithm’s `appId`. The apps whose catalogs are supported by an algorithm are referenced by the IDs in that algorithm’s `catalogAppIds` array.
     *
     *
     * For an algorithm to be considered “Available” and returned in this method’s response, the algorithm must meet the following conditions:
     * 1. The algorithm’s `appId` must match the ID of an installed Wix app.
     * 2. At least 1 of the IDs in `catalogAppIds` must match the ID of an installed Wix app.
     *
     * Wix app IDs are [listed here](https://dev.wix.com/api/rest/getting-started/wix-business-solutions#getting-started_wix-business-solutions_about-wix-business-solutions).
     * @public
     * @documentationMaturity preview
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function listAvailableAlgorithms(): Promise<ListAvailableAlgorithmsResponse>;
    /**
     * Returns a recommendation object containing a list of items to recommend to the customer.
     *
     * `getRecommendation()` determines which items to recommend based on the given recommendation algorithms.
     *
     * `getRecommendation()` doesn’t run the algorithms. It calls the installed apps that provide them.
     *
     * Apps may provide algorithms for use with their own catalogs, or for use with catalogs from other apps.
     * For example, Wix Stores provides algorithms that can only be used on its own catalogs.
     * To run an algorithm, the app providing it must be installed, and an app providing a supported catalog must be installed.
     * For more information and to see which algorithms are available on your site or project, call [`listAvailableAlgorithms()`](#listavailablealgorithms).
     *
     * `getRecommendation()` operates as follows:
     * 1. `getRecommendation()` receives as input a list of algorithms as an array. These algorithms can be provided by different apps and can apply to different catalogs.
     * 2. `getRecommendation()` calls the app that corresponds to the `appId` of the first algorithm in the list of algorithms. It passes that algorithm’s ID and the IDs of any subsequent algorithms in the array for the same app.
     * 3. The app runs the algorithms.
     * 4. `getRecommendation()` returns items recommendations from the first algorithm (according to its position in the `algorithms` array) that meets the minimum number of recommendations. At that point `getRecommendation()` stops calling other apps.
     * 5. If none of the algorithms run by the first app meet the minimum recommended items, `getRecommendation()` finds the next algorithm in the array with a new `appId` (an ID of an app that has not yet been called), and repeats the process.
     * 6. If no algorithms in the `algorithms` array recommend at least the minimum recommended items, `getRecommendation()` returns an empty array.
     * @param algorithms - A list of algorithms checked in a specific order determined by their `appID` and their position in the `algorithms` array.
     * See the method description for more information.
     *
     * If no algorithm is able to return at least `minimumRecommendedItems` items, an empty array is returned.
     * @public
     * @documentationMaturity preview
     * @requiredField algorithms
     * @requiredField algorithms._id
     * @requiredField algorithms.appId
     * @requiredField options.items.appId
     * @requiredField options.items.catalogItemId
     * @param options - Get recommendation options.
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function getRecommendation(algorithms: Algorithm[], options?: GetRecommendationOptions): Promise<GetRecommendationResponse>;
    interface GetRecommendationOptions {
        /** The set of items for which to get recommendations. Required if the `algorithmType` is `RELATED_ITEMS`. */
        items?: CatalogReference$3[];
        /**
         * The minimum number of items that must be recommended by the algorithm for those items to be returned in the response.
         *
         * Max: `100`
         */
        minimumRecommendedItems?: number;
    }
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_Recommendation = Recommendation;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_Algorithm = Algorithm;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_ListAvailableAlgorithmsRequest = ListAvailableAlgorithmsRequest;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_ListAvailableAlgorithmsResponse = ListAvailableAlgorithmsResponse;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmInfo = AlgorithmInfo;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmConfig = AlgorithmConfig;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmType = AlgorithmType;
    const ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmType: typeof AlgorithmType;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_GetRecommendationRequest = GetRecommendationRequest;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_GetRecommendationResponse = GetRecommendationResponse;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_ItemAppIdNotSupportedByProvider = ItemAppIdNotSupportedByProvider;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_RecommendationAlgorithmNotSupported = RecommendationAlgorithmNotSupported;
    const ecomRecommendationsV1RecommendationRecommendations_universal_d_listAvailableAlgorithms: typeof listAvailableAlgorithms;
    const ecomRecommendationsV1RecommendationRecommendations_universal_d_getRecommendation: typeof getRecommendation;
    type ecomRecommendationsV1RecommendationRecommendations_universal_d_GetRecommendationOptions = GetRecommendationOptions;
    namespace ecomRecommendationsV1RecommendationRecommendations_universal_d {
        export { ecomRecommendationsV1RecommendationRecommendations_universal_d_Recommendation as Recommendation, CatalogReference$3 as CatalogReference, ecomRecommendationsV1RecommendationRecommendations_universal_d_Algorithm as Algorithm, ecomRecommendationsV1RecommendationRecommendations_universal_d_ListAvailableAlgorithmsRequest as ListAvailableAlgorithmsRequest, ecomRecommendationsV1RecommendationRecommendations_universal_d_ListAvailableAlgorithmsResponse as ListAvailableAlgorithmsResponse, ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmInfo as AlgorithmInfo, ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmConfig as AlgorithmConfig, ecomRecommendationsV1RecommendationRecommendations_universal_d_AlgorithmType as AlgorithmType, ecomRecommendationsV1RecommendationRecommendations_universal_d_GetRecommendationRequest as GetRecommendationRequest, ecomRecommendationsV1RecommendationRecommendations_universal_d_GetRecommendationResponse as GetRecommendationResponse, ecomRecommendationsV1RecommendationRecommendations_universal_d_ItemAppIdNotSupportedByProvider as ItemAppIdNotSupportedByProvider, ecomRecommendationsV1RecommendationRecommendations_universal_d_RecommendationAlgorithmNotSupported as RecommendationAlgorithmNotSupported, ecomRecommendationsV1RecommendationRecommendations_universal_d_listAvailableAlgorithms as listAvailableAlgorithms, ecomRecommendationsV1RecommendationRecommendations_universal_d_getRecommendation as getRecommendation, ecomRecommendationsV1RecommendationRecommendations_universal_d_GetRecommendationOptions as GetRecommendationOptions, };
    }
    interface DiscountRule$2 {
        /**
         * Discount rule ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Revision number, which increments by 1 each time the discount rule is updated.
         * To prevent conflicting changes, the current `revision` must be passed when updating the discount rule.
         * @readonly
         */
        revision?: string | null;
        /**
         * Date and time the discount rule was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the discount rule was last updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Whether the discount rule is active.
         *
         * Default: `true`
         */
        active?: boolean | null;
        /** Discount rule name. */
        name?: string | null;
        /**
         * Discount rule trigger.
         * A set of conditions that must be met for the `discounts` to be applied.
         * Not passing a trigger will cause the discount to always apply.
         */
        trigger?: DiscountTrigger;
        /** Time frame in which the discount rule is active. */
        activeTimeInfo?: ActiveTimeInfo;
        /**
         * List of discounts that are applied when one or more triggers are met.
         *
         * Currently, a discount rule can apply only 1 discount.
         */
        discounts?: Discounts;
        /**
         * Discount rule status.
         * @readonly
         */
        status?: Status$1;
        /**
         * Number of times the discount rule was used.
         * @readonly
         */
        usageCount?: number;
    }
    /** DiscountTrigger - description of a set of conditions, that if met, will trigger the associated rule actions */
    interface DiscountTrigger extends DiscountTriggerTriggerOneOf {
        /** Chain multiple triggers with the `and` operator. */
        and?: And;
        /** Chain multiple triggers with the `or` operator. */
        or?: Or;
        /** Custom trigger. */
        customTrigger?: Custom;
        /** Subtotal trigger range. */
        subtotalRange?: SubtotalRange;
        /** Item quantity trigger range. */
        itemQuantityRange?: ItemQuantityRange;
        /**
         * Trigger type.
         *
         * + `"AND"`: Operator used for chaining multiple triggers. Currently 1 `"AND"` chain operator is supported.
         * + `"SUBTOTAL_RANGE"`: Subtotal must be within the specified `subtotalRange` values.
         * + `"ITEM_QUANTITY_RANGE"`: Quantity of items in scope must be within specified `itemQuantityRange` values.
         * + `"CUSTOM"`: Custom trigger type defined in `customTrigger` object.
         */
        triggerType?: TriggerType;
    }
    /** @oneof */
    interface DiscountTriggerTriggerOneOf {
        /** Chain multiple triggers with the `and` operator. */
        and?: And;
        /** Chain multiple triggers with the `or` operator. */
        or?: Or;
        /** Custom trigger. */
        customTrigger?: Custom;
        /** Subtotal trigger range. */
        subtotalRange?: SubtotalRange;
        /** Item quantity trigger range. */
        itemQuantityRange?: ItemQuantityRange;
    }
    /**
     * This object represents a scope of catalog items. Examples:
     * 1. All catalog items of a specific app - type = CATALOG_ITEM, CatalogItemFilter with `catalog_app_id`
     * 2. Specific catalog item - type = CATALOG_ITEM, CatalogItemFilter with `catalog_app_id` + `catalog_item_ids`
     * 3. External catalog filter - type = CUSTOM_FILTER, CustomFilter with 'app_id' + 'params'
     */
    interface Scope$2 extends ScopeScopeItemsOneOf {
        /** Catalog item filter. Must be passed with `type."CATALOG_ITEM"`. */
        catalogItemFilter?: CatalogItemFilter;
        /** Custom filter. Must be passed with `type."CATALOG_ITEM"`. */
        customFilter?: CustomFilter;
        /** Scope ID. */
        _id?: string;
        /** Scope type. */
        type?: ScopeType;
    }
    /** @oneof */
    interface ScopeScopeItemsOneOf {
        /** Catalog item filter. Must be passed with `type."CATALOG_ITEM"`. */
        catalogItemFilter?: CatalogItemFilter;
        /** Custom filter. Must be passed with `type."CATALOG_ITEM"`. */
        customFilter?: CustomFilter;
    }
    enum ScopeType {
        UNDEFINED_SCOPE = "UNDEFINED_SCOPE",
        /** Specific catalog items */
        CATALOG_ITEM = "CATALOG_ITEM",
        /** Specific items by custom filters */
        CUSTOM_FILTER = "CUSTOM_FILTER"
    }
    interface CatalogItemFilter {
        /** Catalog App ID. For example, the Wix Stores, Wix Bookings, or 3rd-party `appId`. */
        catalogAppId?: string;
        /** ID of the item within its Wix or 3rd-party catalog. For example, `productId` for Wix Stores. */
        catalogItemIds?: string[];
    }
    interface CustomFilter {
        /** Custom filter app ID, when relevant. */
        appId?: string;
        /**
         * Custom filter in `{ "key": "value" }` form.
         * For example, an array of `collectionIDs`:
         * `{ ["collectionId": "12345"], ["collectionId": "67890"] }`.
         */
        params?: Record<string, any> | null;
    }
    interface And {
        /**
         * List of triggers.
         * Max: 5 triggers.
         */
        triggers?: DiscountTrigger[];
    }
    interface Or {
        triggers?: DiscountTrigger[];
    }
    interface Custom {
        /** Trigger ID. */
        _id?: string;
        /** ID of the app that created the trigger. */
        appId?: string;
    }
    interface SubtotalRange {
        /** Relevant scopes for `"SPECIFIC_ITEMS"` target type. */
        scopes?: Scope$2[];
        /** Minimum subtotal price (inclusive). */
        from?: string | null;
        /** Maximum subtotal price (inclusive). */
        to?: string | null;
    }
    interface ItemQuantityRange {
        /** Relevant scopes for `"SPECIFIC_ITEMS"` target type. */
        scopes?: Scope$2[];
        /** Minimum item quantity (inclusive). */
        from?: number | null;
        /** Maximum item quantity (inclusive). */
        to?: number | null;
    }
    enum TriggerType {
        UNDEFINED = "UNDEFINED",
        /** Chain multiple triggers with AND operator */
        AND = "AND",
        /** Subtotal range trigger */
        SUBTOTAL_RANGE = "SUBTOTAL_RANGE",
        /** Item quantity range trigger */
        ITEM_QUANTITY_RANGE = "ITEM_QUANTITY_RANGE",
        /** Custom trigger, see Custom Triggers SPI for more details */
        CUSTOM = "CUSTOM",
        /** Chain multiple triggers with OR operator */
        OR = "OR"
    }
    interface ActiveTimeInfo {
        /** Date and time the discount rule is active **from**, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. */
        start?: Date;
        /** Date and time the discount rule is active **till**, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. */
        end?: Date;
    }
    interface Discounts {
        /** Discounts. */
        values?: Discount$1[];
    }
    interface Discount$1 extends DiscountDiscountOneOf {
        /** Percentage to discount from original price. */
        percentage?: number;
        /** Amount to discount from original price. */
        fixedAmount?: string;
        /** Fixed price. Line item will be fixed to this price. */
        fixedPrice?: string;
        /**
         * Discount target.
         *
         * + `"SPECIFIC_ITEMS"`: Discount applies to a specific set of items.
         */
        targetType?: Type;
        /** Data related to `"SPECIFIC_ITEMS"` target type. */
        specificItemsInfo?: SpecificItemsInfo;
        /**
         * Discount type.
         *
         * + `"PERCENTAGE"`: Price is reduced by percentage value.
         * + `"FIXED_AMOUNT"`: Price is reduced by fixed amount.
         * + `"FIXED_PRICE"`: Price will be set to fixed amount.
         */
        discountType?: DiscountType$2;
    }
    /** @oneof */
    interface DiscountDiscountOneOf {
        /** Percentage to discount from original price. */
        percentage?: number;
        /** Amount to discount from original price. */
        fixedAmount?: string;
        /** Fixed price. Line item will be fixed to this price. */
        fixedPrice?: string;
    }
    enum Type {
        /** Target type is not defined */
        UNDEFINED = "UNDEFINED",
        /** Target type is a set of specific items */
        SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
        /** Target type is a buy x get y */
        BUY_X_GET_Y = "BUY_X_GET_Y"
    }
    interface SpecificItemsInfo {
        /** All associated scopes for `"SPECIFIC_ITEMS"` target type. */
        scopes?: Scope$2[];
    }
    enum DiscountType$2 {
        UNDEFINED = "UNDEFINED",
        /** Percentage discount */
        PERCENTAGE = "PERCENTAGE",
        /** Fixed amount discount */
        FIXED_AMOUNT = "FIXED_AMOUNT",
        /** Fixed price discount */
        FIXED_PRICE = "FIXED_PRICE"
    }
    interface BuyXGetYInfo {
        /** Information about which items must be in the cart (buy X) for the discount to apply (get Y). */
        customerBuys?: CustomerBuy;
        /** Information about which items will be discounted (get Y). */
        customerGets?: CustomerGet;
        /**
         * The maximum number of times the 'buy X get Y' discount can be applied.
         * For example, when the value of `limit` is `2`, with a "2+1" sale on all items, the following logic applies:
         * + Buy 2 get 1, buy 3 get 1.
         * + Buy 4 get 2, buy 6 get 2, buy 9 get 2, and so on.
         */
        limit?: number | null;
    }
    interface CustomerBuy extends CustomerBuyConditionOneOf {
        /** Minimum number of items the customer must add to the cart to be eligible for a discount. */
        minimumQuantity?: number;
        /** Minimum price the customer must add to the cart to be eligible for a discount. */
        minimumSpend?: string | null;
        /** Scopes of the items that must be added to the cart to enable the discount. */
        scopes?: Scope$2[];
    }
    /** @oneof */
    interface CustomerBuyConditionOneOf {
        /** Minimum number of items the customer must add to the cart to be eligible for a discount. */
        minimumQuantity?: number;
        /** Minimum price the customer must add to the cart to be eligible for a discount. */
        minimumSpend?: string | null;
    }
    interface CustomerGet {
        /**
         * Exact number of items in the cart that will be discounted.
         * If the cart contains fewer items than the value of quantity, the discount will not apply.
         */
        quantity?: number;
        /** Scopes of the items that will be discounted. */
        scopes?: Scope$2[];
    }
    enum Status$1 {
        /** Rule status is not defined. */
        UNDEFINED = "UNDEFINED",
        /** Rule status is live. */
        LIVE = "LIVE",
        /** Rule status is expired, it might have been live in the past. */
        EXPIRED = "EXPIRED",
        /** Rule status is pending, it might be live in the future. */
        PENDING = "PENDING"
    }
    /** The discount settings */
    interface DiscountSettings {
        /** Discount applies to either `ALL_ITEMS`, or to the `LOWEST_PRICED_ITEM`. */
        appliesTo?: AppliedSubjectType;
        /**
         * Whether the discount will apply to subscriptions.
         *
         * Default: `false`
         */
        includeSubscription?: boolean | null;
        /** Maximum total number of uses allowed for the discount rule. */
        usageLimit?: number | null;
        /**
         * The usage limit per user per discount.
         * When not provided, this setting will not apply.
         */
        usageLimitPerUser?: number | null;
    }
    /** TODO: check if can be removed */
    enum AppliedSubjectType {
        UNDEFINED = "UNDEFINED",
        /** Discount applies to all items at checkout. */
        ALL_ITEMS = "ALL_ITEMS",
        /** Discount applies to the lowest priced item at checkout. */
        LOWEST_PRICED_ITEM = "LOWEST_PRICED_ITEM"
    }
    interface ExtendedFields$2 {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    interface CreateDiscountRuleRequest {
        /** Discount rule info. */
        discountRule: DiscountRule$2;
    }
    interface CreateDiscountRuleResponse {
        /** Discount rule. */
        discountRule?: DiscountRule$2;
    }
    interface GetDiscountRuleRequest {
        /** ID of the discount rule to retrieve. */
        discountRuleId: string;
    }
    interface GetDiscountRuleResponse {
        /** The requested discount rule. */
        discountRule?: DiscountRule$2;
    }
    interface UpdateDiscountRuleRequest {
        /** Discount rule info. */
        discountRule: DiscountRule$2;
    }
    interface UpdateDiscountRuleResponse {
        /** Updated discount rule. */
        discountRule?: DiscountRule$2;
    }
    interface DeleteDiscountRuleRequest {
        /** ID of the discount rule to delete. */
        discountRuleId: string;
    }
    interface DeleteDiscountRuleResponse {
    }
    interface QueryDiscountRulesRequest {
        /** Query options. */
        query?: PlatformQuery;
    }
    interface PlatformQuery extends PlatformQueryPagingMethodOneOf {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging$1;
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Sorting options. For example, `[{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}]`. */
        sort?: Sorting$1[];
    }
    /** @oneof */
    interface PlatformQueryPagingMethodOneOf {
        /** Pointer to page of results using offset. Cannot be used together with `cursorPaging`. */
        paging?: PlatformPaging;
        /** Cursor pointing to page of results. Cannot be used together with `paging`. `cursorPaging.cursor` can not be used together with `filter` or `sort`. */
        cursorPaging?: CursorPaging$1;
    }
    interface Sorting$1 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$1;
    }
    enum SortOrder$1 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface PlatformPaging {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface CursorPaging$1 {
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
    interface QueryDiscountRulesResponse {
        /** List of discount rules. */
        discountRules?: DiscountRule$2[];
        /** Details on the paged set of results returned. */
        pagingMetadata?: PlatformPagingMetadata;
    }
    interface PlatformPagingMetadata {
        /** The number of items returned in this response. */
        count?: number | null;
        /** The offset which was requested. Returned if offset paging was used. */
        offset?: number | null;
        /** The total number of items that match the query. Returned if offset paging was used. */
        total?: number | null;
        /** Cursors to navigate through result pages. Returned if cursor paging was used. */
        cursors?: Cursors$1;
    }
    interface Cursors$1 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface GetAppliedDiscountsRequest {
        /** Line items for which to check for discount rules. */
        lineItems?: LineItem$3[];
        purchaseFlowId?: string | null;
    }
    interface LineItem$3 {
        /** Line item ID. */
        _id?: string;
        /** Line item quantity. */
        quantity?: number | null;
        /** Catalog and item reference info. Learn more about [integrating Wix Stores products with Wix eCommerce](https://dev.wix.com/api/rest/wix-stores/catalog/ecommerce-integration). */
        catalogReference?: CatalogReference$2;
        /** Line item price. */
        price?: string;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$2 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs. Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from a Wix Stores catalog, learn more about [eCommerce integration](https://dev.wix.com/docs/rest/business-solutions/stores/catalog/e-commerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface GetAppliedDiscountsResponse {
        /** All eligible discounts. */
        appliedDiscounts?: AppliedDiscount$2[];
    }
    interface AppliedDiscount$2 {
        /** Discount type. */
        discountType?: Type;
        /** IDs of line items the discount applies to, in GUID format. */
        lineItemIds?: string[];
        /** Applied discount rule. */
        appliedDiscountRule?: AppliedDiscountRule;
    }
    interface AppliedDiscountRule {
        /** Applied discount rule ID. */
        _id?: string;
        /** Discount rule name. */
        name?: DiscountRuleName$2;
        /** Total amount reduced from all discounted line items. */
        amount?: MultiCurrencyPrice$2;
        /** Discount rule type. */
        discountRuleType?: DiscountType$2;
    }
    interface DiscountRuleName$2 {
        /** Original discount rule name (in site's default language). */
        original?: string;
        /**
         * Translated discount rule name according to buyer language.
         *
         * Default: `original`
         */
        translated?: string | null;
    }
    interface MultiCurrencyPrice$2 {
        /** Amount. */
        amount?: string;
        /**
         * Converted amount.
         * @readonly
         */
        convertedAmount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
        /**
         * Converted amount formatted with currency symbol.
         * @readonly
         */
        formattedConvertedAmount?: string;
    }
    interface DomainEvent$6 extends DomainEventBodyOneOf$6 {
        createdEvent?: EntityCreatedEvent$6;
        updatedEvent?: EntityUpdatedEvent$6;
        deletedEvent?: EntityDeletedEvent$6;
        actionEvent?: ActionEvent$6;
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
    interface DomainEventBodyOneOf$6 {
        createdEvent?: EntityCreatedEvent$6;
        updatedEvent?: EntityUpdatedEvent$6;
        deletedEvent?: EntityDeletedEvent$6;
        actionEvent?: ActionEvent$6;
    }
    interface EntityCreatedEvent$6 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$6 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$6 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$6 {
        bodyAsJson?: string;
    }
    interface Empty$2 {
    }
    interface DiscountRuleUsageLimitReached {
        /** Discount Rule */
        rule?: DiscountRule$2;
    }
    interface MessageEnvelope$6 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$6;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$6 extends IdentificationDataIdOneOf$6 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$6;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$6 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$6 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates a new discount rule.
     *
     *
     * The `createDiscountRule()` function returns a Promise that resolves to the new discount rule when it's created.
     * @param discountRule - Discount rule info.
     * @public
     * @requiredField discountRule
     * @requiredField discountRule.discounts
     * @requiredField discountRule.name
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     * @returns Discount rule.
     */
    function createDiscountRule(discountRule: DiscountRule$2): Promise<DiscountRule$2>;
    /**
     * Retrieves a discount rule.
     *
     *
     * The `getDiscountRule()` function returns a Promise that resolves when the specified discount rule is retrieved.
     * @param discountRuleId - ID of the discount rule to retrieve.
     * @public
     * @requiredField discountRuleId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     * @returns The requested discount rule.
     */
    function getDiscountRule(discountRuleId: string): Promise<DiscountRule$2>;
    /**
     * Updates a discount rule's properties.
     *
     *
     * The `updateDiscountRule()` function returns a Promise that resolves when the specified discount rule's properties are updated.
     *
     * Each time the discount rule is updated, `revision` increments by 1. The existing `revision` must be included when updating the discount rule. This ensures you're working with the latest discount rule information, and it prevents unintended overwrites.
     * @param _id - Discount rule ID.
     * @public
     * @requiredField _id
     * @requiredField discountRule
     * @requiredField discountRule.revision
     * @param discountRule - Discount rule info.
     * @param options - Discount rule info.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     * @returns Updated discount rule.
     */
    function updateDiscountRule(_id: string | null, discountRule: UpdateDiscountRule, options?: UpdateDiscountRuleOptions): Promise<DiscountRule$2>;
    interface UpdateDiscountRule {
        /**
         * Discount rule ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Revision number, which increments by 1 each time the discount rule is updated.
         * To prevent conflicting changes, the current `revision` must be passed when updating the discount rule.
         * @readonly
         */
        revision?: string | null;
        /**
         * Date and time the discount rule was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the discount rule was last updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Whether the discount rule is active.
         *
         * Default: `true`
         */
        active?: boolean | null;
        /** Discount rule name. */
        name?: string | null;
        /**
         * Discount rule trigger.
         * A set of conditions that must be met for the `discounts` to be applied.
         * Not passing a trigger will cause the discount to always apply.
         */
        trigger?: DiscountTrigger;
        /** Time frame in which the discount rule is active. */
        activeTimeInfo?: ActiveTimeInfo;
        /**
         * List of discounts that are applied when one or more triggers are met.
         *
         * Currently, a discount rule can apply only 1 discount.
         */
        discounts?: Discounts;
        /**
         * Discount rule status.
         * @readonly
         */
        status?: Status$1;
        /**
         * Number of times the discount rule was used.
         * @readonly
         */
        usageCount?: number;
    }
    interface UpdateDiscountRuleOptions {
    }
    /**
     * Deletes a discount rule.
     *
     *
     * The `deleteDiscountRule()` function returns a Promise that resolves when the specified discount rule is deleted.
     * @param discountRuleId - ID of the discount rule to delete.
     * @public
     * @requiredField discountRuleId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteDiscountRule(discountRuleId: string): Promise<void>;
    /**
     * Creates a query to retrieve a list of discount rules.
     *
     *
     * The `queryDiscountRules()` function builds a query to retrieve a list of up to 100 discount rules, and returns a [`DiscountRulesQueryBuilder`](#discountrulesquerybuilder) object.
     *
     * The returned object contains the query definition which is typically used to run the query using the [`find()`](/discount-rules/discount-rules-query-builder/find) function.
     *
     * You can refine the query by chaining `DiscountRulesQueryBuilder` functions onto the query. `DiscountRulesQueryBuilder` functions enable you to sort, filter, and control the results queryDiscountRules() returns.
     *
     * By default, `queryDiscountRules()` sorts results by [`ascending("_id")`](/discount-rules/discount-rules-query-builder/ascending) by default. This can be overridden.
     *
     * To learn how to query posts, refer to the table below.
     *
     * The following `DiscountRulesQueryBuilder` functions are supported for the `queryDiscountRules()` function. For a full description of the discount rule object, see the object returned for the [`items`](/discount-rules/discount-rules-query-result/items) property in the `DiscountRulesQueryResult`.
     * @public
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     */
    function queryDiscountRules(): DiscountRulesQueryBuilder;
    interface QueryCursorResult$1 {
        cursors: Cursors$1;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface DiscountRulesQueryResult extends QueryCursorResult$1 {
        items: DiscountRule$2[];
        query: DiscountRulesQueryBuilder;
        next: () => Promise<DiscountRulesQueryResult>;
        prev: () => Promise<DiscountRulesQueryResult>;
    }
    interface DiscountRulesQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ge: (propertyName: "revision" | "_createdDate" | "_updatedDate" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        gt: (propertyName: "revision" | "_createdDate" | "_updatedDate" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        le: (propertyName: "revision" | "_createdDate" | "_updatedDate" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        lt: (propertyName: "revision" | "_createdDate" | "_updatedDate" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         */
        startsWith: (propertyName: "_id" | "name", value: string) => DiscountRulesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: "_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any[]) => DiscountRulesQueryBuilder;
        in: (propertyName: "_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end", value: any) => DiscountRulesQueryBuilder;
        exists: (propertyName: "_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end", value: boolean) => DiscountRulesQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end">) => DiscountRulesQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"_id" | "revision" | "_createdDate" | "_updatedDate" | "active" | "name" | "activeTimeInfo.start" | "activeTimeInfo.end">) => DiscountRulesQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => DiscountRulesQueryBuilder;
        /** @param cursor - A pointer to specific record */
        skipTo: (cursor: string) => DiscountRulesQueryBuilder;
        find: () => Promise<DiscountRulesQueryResult>;
    }
    interface GetAppliedDiscountsOptions {
        /** Line items for which to check for discount rules. */
        lineItems?: LineItem$3[];
        purchaseFlowId?: string | null;
    }
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountTrigger = DiscountTrigger;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountTriggerTriggerOneOf = DiscountTriggerTriggerOneOf;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ScopeScopeItemsOneOf = ScopeScopeItemsOneOf;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ScopeType = ScopeType;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ScopeType: typeof ScopeType;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CatalogItemFilter = CatalogItemFilter;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomFilter = CustomFilter;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_And = And;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Or = Or;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Custom = Custom;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_SubtotalRange = SubtotalRange;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ItemQuantityRange = ItemQuantityRange;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_TriggerType = TriggerType;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_TriggerType: typeof TriggerType;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ActiveTimeInfo = ActiveTimeInfo;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Discounts = Discounts;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountDiscountOneOf = DiscountDiscountOneOf;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Type = Type;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Type: typeof Type;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_SpecificItemsInfo = SpecificItemsInfo;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_BuyXGetYInfo = BuyXGetYInfo;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomerBuy = CustomerBuy;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomerBuyConditionOneOf = CustomerBuyConditionOneOf;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomerGet = CustomerGet;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountSettings = DiscountSettings;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_AppliedSubjectType = AppliedSubjectType;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_AppliedSubjectType: typeof AppliedSubjectType;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CreateDiscountRuleRequest = CreateDiscountRuleRequest;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CreateDiscountRuleResponse = CreateDiscountRuleResponse;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetDiscountRuleRequest = GetDiscountRuleRequest;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetDiscountRuleResponse = GetDiscountRuleResponse;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRuleRequest = UpdateDiscountRuleRequest;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRuleResponse = UpdateDiscountRuleResponse;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DeleteDiscountRuleRequest = DeleteDiscountRuleRequest;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DeleteDiscountRuleResponse = DeleteDiscountRuleResponse;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_QueryDiscountRulesRequest = QueryDiscountRulesRequest;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformQuery = PlatformQuery;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformQueryPagingMethodOneOf = PlatformQueryPagingMethodOneOf;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformPaging = PlatformPaging;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_QueryDiscountRulesResponse = QueryDiscountRulesResponse;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformPagingMetadata = PlatformPagingMetadata;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetAppliedDiscountsRequest = GetAppliedDiscountsRequest;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetAppliedDiscountsResponse = GetAppliedDiscountsResponse;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_AppliedDiscountRule = AppliedDiscountRule;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountRuleUsageLimitReached = DiscountRuleUsageLimitReached;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_createDiscountRule: typeof createDiscountRule;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_getDiscountRule: typeof getDiscountRule;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_updateDiscountRule: typeof updateDiscountRule;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRule = UpdateDiscountRule;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRuleOptions = UpdateDiscountRuleOptions;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_deleteDiscountRule: typeof deleteDiscountRule;
    const ecomDiscountsV1DiscountRuleDiscountRules_universal_d_queryDiscountRules: typeof queryDiscountRules;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountRulesQueryResult = DiscountRulesQueryResult;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountRulesQueryBuilder = DiscountRulesQueryBuilder;
    type ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetAppliedDiscountsOptions = GetAppliedDiscountsOptions;
    namespace ecomDiscountsV1DiscountRuleDiscountRules_universal_d {
        export { DiscountRule$2 as DiscountRule, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountTrigger as DiscountTrigger, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountTriggerTriggerOneOf as DiscountTriggerTriggerOneOf, Scope$2 as Scope, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ScopeScopeItemsOneOf as ScopeScopeItemsOneOf, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ScopeType as ScopeType, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CatalogItemFilter as CatalogItemFilter, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomFilter as CustomFilter, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_And as And, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Or as Or, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Custom as Custom, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_SubtotalRange as SubtotalRange, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ItemQuantityRange as ItemQuantityRange, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_TriggerType as TriggerType, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_ActiveTimeInfo as ActiveTimeInfo, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Discounts as Discounts, Discount$1 as Discount, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountDiscountOneOf as DiscountDiscountOneOf, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_Type as Type, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_SpecificItemsInfo as SpecificItemsInfo, DiscountType$2 as DiscountType, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_BuyXGetYInfo as BuyXGetYInfo, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomerBuy as CustomerBuy, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomerBuyConditionOneOf as CustomerBuyConditionOneOf, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CustomerGet as CustomerGet, Status$1 as Status, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountSettings as DiscountSettings, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_AppliedSubjectType as AppliedSubjectType, ExtendedFields$2 as ExtendedFields, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CreateDiscountRuleRequest as CreateDiscountRuleRequest, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_CreateDiscountRuleResponse as CreateDiscountRuleResponse, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetDiscountRuleRequest as GetDiscountRuleRequest, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetDiscountRuleResponse as GetDiscountRuleResponse, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRuleRequest as UpdateDiscountRuleRequest, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRuleResponse as UpdateDiscountRuleResponse, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DeleteDiscountRuleRequest as DeleteDiscountRuleRequest, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DeleteDiscountRuleResponse as DeleteDiscountRuleResponse, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_QueryDiscountRulesRequest as QueryDiscountRulesRequest, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformQuery as PlatformQuery, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformQueryPagingMethodOneOf as PlatformQueryPagingMethodOneOf, Sorting$1 as Sorting, SortOrder$1 as SortOrder, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformPaging as PlatformPaging, CursorPaging$1 as CursorPaging, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_QueryDiscountRulesResponse as QueryDiscountRulesResponse, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_PlatformPagingMetadata as PlatformPagingMetadata, Cursors$1 as Cursors, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetAppliedDiscountsRequest as GetAppliedDiscountsRequest, LineItem$3 as LineItem, CatalogReference$2 as CatalogReference, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetAppliedDiscountsResponse as GetAppliedDiscountsResponse, AppliedDiscount$2 as AppliedDiscount, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_AppliedDiscountRule as AppliedDiscountRule, DiscountRuleName$2 as DiscountRuleName, MultiCurrencyPrice$2 as MultiCurrencyPrice, DomainEvent$6 as DomainEvent, DomainEventBodyOneOf$6 as DomainEventBodyOneOf, EntityCreatedEvent$6 as EntityCreatedEvent, EntityUpdatedEvent$6 as EntityUpdatedEvent, EntityDeletedEvent$6 as EntityDeletedEvent, ActionEvent$6 as ActionEvent, Empty$2 as Empty, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountRuleUsageLimitReached as DiscountRuleUsageLimitReached, MessageEnvelope$6 as MessageEnvelope, IdentificationData$6 as IdentificationData, IdentificationDataIdOneOf$6 as IdentificationDataIdOneOf, WebhookIdentityType$6 as WebhookIdentityType, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_createDiscountRule as createDiscountRule, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_getDiscountRule as getDiscountRule, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_updateDiscountRule as updateDiscountRule, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRule as UpdateDiscountRule, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_UpdateDiscountRuleOptions as UpdateDiscountRuleOptions, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_deleteDiscountRule as deleteDiscountRule, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_queryDiscountRules as queryDiscountRules, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountRulesQueryResult as DiscountRulesQueryResult, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_DiscountRulesQueryBuilder as DiscountRulesQueryBuilder, ecomDiscountsV1DiscountRuleDiscountRules_universal_d_GetAppliedDiscountsOptions as GetAppliedDiscountsOptions, };
    }
    interface OrdersSettings {
        /**
         * Defines when to update the store inventory.
         *
         * - `ON_ORDER_PAID`: Stock quantities will update only after the payment is approved.
         *  - `ON_ORDER_PLACED`: Stock quantities will update while the payment is being processed. If the payment did not go through, items will restock.
         *
         * Default: `ON_ORDER_PLACED`
         */
        inventoryUpdateTrigger?: InventoryUpdateTrigger;
        /**
         * Whether to automatically create invoices for every new order paid online.
         * Default: `false`
         */
        createInvoice?: boolean | null;
        /**
         * Date and time the orders settings were created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the orders settings were updated.
         * @readonly
         */
        _updatedDate?: Date;
    }
    enum InventoryUpdateTrigger {
        UNKNOWN_INVENTORY_UPDATE_TRIGGER = "UNKNOWN_INVENTORY_UPDATE_TRIGGER",
        ON_ORDER_PAID = "ON_ORDER_PAID",
        ON_ORDER_PLACED = "ON_ORDER_PLACED"
    }
    interface GetOrdersSettingsRequest {
    }
    interface GetOrdersSettingsResponse {
        /** Orders settings. */
        ordersSettings?: OrdersSettings;
    }
    interface UpdateOrdersSettingsRequest {
        /** Orders settings to update. */
        ordersSettings: OrdersSettings;
    }
    interface UpdateOrdersSettingsResponse {
        /** The updated orders settings. */
        ordersSettings?: OrdersSettings;
    }
    interface DeleteOrdersSettingsRequest {
    }
    interface DeleteOrdersSettingsResponse {
    }
    interface DomainEvent$5 extends DomainEventBodyOneOf$5 {
        createdEvent?: EntityCreatedEvent$5;
        updatedEvent?: EntityUpdatedEvent$5;
        deletedEvent?: EntityDeletedEvent$5;
        actionEvent?: ActionEvent$5;
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
    interface DomainEventBodyOneOf$5 {
        createdEvent?: EntityCreatedEvent$5;
        updatedEvent?: EntityUpdatedEvent$5;
        deletedEvent?: EntityDeletedEvent$5;
        actionEvent?: ActionEvent$5;
    }
    interface EntityCreatedEvent$5 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$5 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$5 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$5 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$5 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$5;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$5 extends IdentificationDataIdOneOf$5 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$5;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$5 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$5 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Retrieves the sites' order settings.
     *
     *
     * The `getOrdersSettings()` function returns a Promise that resolves to orders settings.
     * @public
     * @documentationMaturity preview
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     * @returns The requested orders settings.
     */
    function getOrdersSettings(): Promise<GetOrdersSettingsResponse>;
    /**
     * Updates the sites' orders settings.
     *
     *
     * The `updateOrdersSettings()` function returns a Promise that resolves to the newly updated orders settings.
     * @public
     * @documentationMaturity preview
     * @requiredField ordersSettings
     * @param ordersSettings - Orders settings to update.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @returns The updated orders settings.
     */
    function updateOrdersSettings(ordersSettings: OrdersSettings, options?: UpdateOrdersSettingsOptions): Promise<UpdateOrdersSettingsResponse>;
    interface UpdateOrdersSettingsOptions {
    }
    type ecomV1OrdersSettingsOrdersSettings_universal_d_OrdersSettings = OrdersSettings;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_InventoryUpdateTrigger = InventoryUpdateTrigger;
    const ecomV1OrdersSettingsOrdersSettings_universal_d_InventoryUpdateTrigger: typeof InventoryUpdateTrigger;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_GetOrdersSettingsRequest = GetOrdersSettingsRequest;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_GetOrdersSettingsResponse = GetOrdersSettingsResponse;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_UpdateOrdersSettingsRequest = UpdateOrdersSettingsRequest;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_UpdateOrdersSettingsResponse = UpdateOrdersSettingsResponse;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_DeleteOrdersSettingsRequest = DeleteOrdersSettingsRequest;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_DeleteOrdersSettingsResponse = DeleteOrdersSettingsResponse;
    const ecomV1OrdersSettingsOrdersSettings_universal_d_getOrdersSettings: typeof getOrdersSettings;
    const ecomV1OrdersSettingsOrdersSettings_universal_d_updateOrdersSettings: typeof updateOrdersSettings;
    type ecomV1OrdersSettingsOrdersSettings_universal_d_UpdateOrdersSettingsOptions = UpdateOrdersSettingsOptions;
    namespace ecomV1OrdersSettingsOrdersSettings_universal_d {
        export { ecomV1OrdersSettingsOrdersSettings_universal_d_OrdersSettings as OrdersSettings, ecomV1OrdersSettingsOrdersSettings_universal_d_InventoryUpdateTrigger as InventoryUpdateTrigger, ecomV1OrdersSettingsOrdersSettings_universal_d_GetOrdersSettingsRequest as GetOrdersSettingsRequest, ecomV1OrdersSettingsOrdersSettings_universal_d_GetOrdersSettingsResponse as GetOrdersSettingsResponse, ecomV1OrdersSettingsOrdersSettings_universal_d_UpdateOrdersSettingsRequest as UpdateOrdersSettingsRequest, ecomV1OrdersSettingsOrdersSettings_universal_d_UpdateOrdersSettingsResponse as UpdateOrdersSettingsResponse, ecomV1OrdersSettingsOrdersSettings_universal_d_DeleteOrdersSettingsRequest as DeleteOrdersSettingsRequest, ecomV1OrdersSettingsOrdersSettings_universal_d_DeleteOrdersSettingsResponse as DeleteOrdersSettingsResponse, DomainEvent$5 as DomainEvent, DomainEventBodyOneOf$5 as DomainEventBodyOneOf, EntityCreatedEvent$5 as EntityCreatedEvent, EntityUpdatedEvent$5 as EntityUpdatedEvent, EntityDeletedEvent$5 as EntityDeletedEvent, ActionEvent$5 as ActionEvent, MessageEnvelope$5 as MessageEnvelope, IdentificationData$5 as IdentificationData, IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf, WebhookIdentityType$5 as WebhookIdentityType, ecomV1OrdersSettingsOrdersSettings_universal_d_getOrdersSettings as getOrdersSettings, ecomV1OrdersSettingsOrdersSettings_universal_d_updateOrdersSettings as updateOrdersSettings, ecomV1OrdersSettingsOrdersSettings_universal_d_UpdateOrdersSettingsOptions as UpdateOrdersSettingsOptions, };
    }
    interface Invoice {
        /** Invoice ID. */
        _id?: string;
        /** ID of the app that set the invoice. */
        appId?: string;
    }
    interface ListInvoicesForSingleOrderRequest$1 {
        /** Order ID. */
        orderId: string;
    }
    interface ListInvoicesForSingleOrderResponse$1 {
        /** List of invoices. */
        invoices?: Invoice[];
    }
    interface ListInvoicesForMultipleOrdersRequest$1 {
        /** Order IDs for which to retrieve invoices. */
        orderIds: string[];
    }
    interface ListInvoicesForMultipleOrdersResponse$1 {
        /** List of order IDs and their associated invoices. */
        invoicesForOrder?: InvoicesForOrder$1[];
    }
    interface InvoicesForOrder$1 {
        /** Order ID. */
        orderId?: string;
        /** Invoices info. */
        invoicesInfo?: Invoice[];
    }
    interface GenerateInvoiceRequest$1 {
        /** Order ID. */
        orderId: string;
    }
    interface GenerateInvoiceResponse$1 {
        /** Invoice ID. */
        invoiceId?: string;
    }
    interface BulkGenerateInvoicesRequest$1 {
        /** Order IDs. */
        orderIds: string[];
    }
    interface BulkGenerateInvoicesResponse$1 {
        results?: BulkInvoiceResult$1[];
        bulkActionMetadata?: BulkActionMetadata$2;
    }
    interface BulkInvoiceResult$1 {
        itemMetadata?: ItemMetadata$2;
        item?: InvoiceForOrder$1;
    }
    interface ItemMetadata$2 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$4;
    }
    interface ApplicationError$4 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface InvoiceForOrder$1 {
        /** Order ID. */
        orderId?: string;
        /** Invoice ID. */
        invoiceId?: string;
    }
    interface BulkActionMetadata$2 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface AddInvoiceToOrderRequest$1 {
        /** Order ID. */
        orderId: string;
        /** Invoice info. */
        invoiceInfo: Invoice;
    }
    interface AddInvoiceToOrderResponse$1 {
        /** List of order invoices. */
        orderInvoices?: Invoice[];
    }
    interface DomainEvent$4 extends DomainEventBodyOneOf$4 {
        createdEvent?: EntityCreatedEvent$4;
        updatedEvent?: EntityUpdatedEvent$4;
        deletedEvent?: EntityDeletedEvent$4;
        actionEvent?: ActionEvent$4;
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
    interface DomainEventBodyOneOf$4 {
        createdEvent?: EntityCreatedEvent$4;
        updatedEvent?: EntityUpdatedEvent$4;
        deletedEvent?: EntityDeletedEvent$4;
        actionEvent?: ActionEvent$4;
    }
    interface EntityCreatedEvent$4 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$4 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$4 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$4 {
        bodyAsJson?: string;
    }
    interface Empty$1 {
    }
    interface MessageEnvelope$4 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$4;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$4 extends IdentificationDataIdOneOf$4 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$4;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$4 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$4 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Retrieves the IDs of invoices associated with all specified orders.
     *
     *
     * The `listInvoicesForSingleOrder()` function returns a Promise that resolves when the specified order's transaction records are retrieved.
     * @param orderIds - Order IDs for which to retrieve invoices.
     * @public
     * @documentationMaturity preview
     * @requiredField orderIds
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     */
    function listInvoicesForMultipleOrders(orderIds: string[]): Promise<ListInvoicesForMultipleOrdersResponse$1>;
    type ecomOrdersV1InvoiceOrderInvoices_universal_d_Invoice = Invoice;
    const ecomOrdersV1InvoiceOrderInvoices_universal_d_listInvoicesForMultipleOrders: typeof listInvoicesForMultipleOrders;
    namespace ecomOrdersV1InvoiceOrderInvoices_universal_d {
        export { ecomOrdersV1InvoiceOrderInvoices_universal_d_Invoice as Invoice, ListInvoicesForSingleOrderRequest$1 as ListInvoicesForSingleOrderRequest, ListInvoicesForSingleOrderResponse$1 as ListInvoicesForSingleOrderResponse, ListInvoicesForMultipleOrdersRequest$1 as ListInvoicesForMultipleOrdersRequest, ListInvoicesForMultipleOrdersResponse$1 as ListInvoicesForMultipleOrdersResponse, InvoicesForOrder$1 as InvoicesForOrder, GenerateInvoiceRequest$1 as GenerateInvoiceRequest, GenerateInvoiceResponse$1 as GenerateInvoiceResponse, BulkGenerateInvoicesRequest$1 as BulkGenerateInvoicesRequest, BulkGenerateInvoicesResponse$1 as BulkGenerateInvoicesResponse, BulkInvoiceResult$1 as BulkInvoiceResult, ItemMetadata$2 as ItemMetadata, ApplicationError$4 as ApplicationError, InvoiceForOrder$1 as InvoiceForOrder, BulkActionMetadata$2 as BulkActionMetadata, AddInvoiceToOrderRequest$1 as AddInvoiceToOrderRequest, AddInvoiceToOrderResponse$1 as AddInvoiceToOrderResponse, DomainEvent$4 as DomainEvent, DomainEventBodyOneOf$4 as DomainEventBodyOneOf, EntityCreatedEvent$4 as EntityCreatedEvent, EntityUpdatedEvent$4 as EntityUpdatedEvent, EntityDeletedEvent$4 as EntityDeletedEvent, ActionEvent$4 as ActionEvent, Empty$1 as Empty, MessageEnvelope$4 as MessageEnvelope, IdentificationData$4 as IdentificationData, IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf, WebhookIdentityType$4 as WebhookIdentityType, ecomOrdersV1InvoiceOrderInvoices_universal_d_listInvoicesForMultipleOrders as listInvoicesForMultipleOrders, };
    }
    interface CheckoutTemplate {
        /**
         * Checkout template ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Status of the checkout template.
         *
         * When `status` is `INACTIVE` checkouts will not be created with this template `_id`. Instead, the function will redirect to the domain site.
         *
         * Default: `ACTIVE`
         */
        status?: Status;
        /** Custom settings to apply to the checkout page created from this template. */
        customization?: CheckoutCustomization;
        /**
         * Line items.
         *
         * Max: 300 items
         */
        lineItems?: V1LineItem[];
        /**
         * Coupon code.
         *
         * Note that a checkout can only hold one `couponCode` at a time. If an additional `couponCode` is added, it will override the existing `couponCode`.
         * For additional information, see the Coupons API.
         */
        couponCode?: string | null;
    }
    enum Status {
        UNKNOWN_STATUS = "UNKNOWN_STATUS",
        ACTIVE = "ACTIVE",
        INACTIVE = "INACTIVE"
    }
    interface CheckoutCustomization {
        /** Web client customizations. These customizations only apply to the standard Wix checkout page. */
        webClient?: WebClientCustomization;
        /**
         * Whether to lock the ability to add or remove a gift card.
         *
         * Default: `false`
         */
        lockedGiftCard?: boolean;
        /**
         * Whether to lock the ability to apply or remove a coupon code.
         *
         * Default: `false`
         */
        lockedCoupon?: boolean;
    }
    interface WebClientCustomization {
        /**
         * Whether to disable the "Continue shopping" button.
         *
         * Default: `false`
         */
        disabledContinueShoppingButton?: boolean;
    }
    interface V1LineItem {
        /**
         * Item quantity.
         *
         * Min: `1` <br />
         * Max: `100000`
         */
        quantity?: number;
        /**
         * Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info.
         *
         * > **Note:** For more information on what to pass to `lineItems.catalogReference`, see [eCommerce Integration in the Wix Stores Catalog API](https://dev.wix.com/api/rest/wix-stores/catalog/ecommerce-integration).
         */
        catalogReference?: CatalogReference$1;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference$1 {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs. Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from a Wix Stores catalog, learn more about [eCommerce integration](https://dev.wix.com/docs/rest/business-solutions/stores/catalog/e-commerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface CatalogOverrideFields$1 {
        /** Item product name */
        productName?: ProductName$1;
        /** Item price **after** discounts. */
        price?: string | null;
        /** Item price **before** discount. */
        fullPrice?: string | null;
        /** Line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine$1[];
        /** Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability. */
        physicalProperties?: PhysicalProperties$1;
        /** Line item image details. */
        image?: string;
    }
    interface ProductName$1 {
        /**
         * __Required.__ Item name in the site's default language.
         *
         * Min: 1 character.
         * Max: 200 characters.
         */
        original?: string;
        /**
         * Item name translated into the buyer's language.
         *
         * Min: 1 character.
         * Max: 400 characters.
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface DescriptionLine$1 extends DescriptionLineValueOneOf$1, DescriptionLineDescriptionLineValueOneOf$1 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$1;
        /** Description line color value. */
        colorInfo?: Color$1;
        /** Description line name. */
        name?: DescriptionLineName$1;
    }
    /** @oneof */
    interface DescriptionLineValueOneOf$1 {
        /** Description line plain text value. */
        plainText?: PlainTextValue$1;
        /** Description line color value. */
        colorInfo?: Color$1;
    }
    /** @oneof */
    interface DescriptionLineDescriptionLineValueOneOf$1 {
    }
    interface DescriptionLineName$1 {
        /** Description line name in the site's default language. */
        original?: string;
        /**
         * Description line name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface PlainTextValue$1 {
        /** Description line plain text value in the site's default language. */
        original?: string;
        /**
         * Description line plain text value translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Color$1 {
        /** Description line color name in the site's default language. */
        original?: string;
        /**
         * Description line color name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
        /** HEX or RGB color code for display. */
        code?: string | null;
    }
    enum DescriptionLineType$1 {
        UNRECOGNISED = "UNRECOGNISED",
        PLAIN_TEXT = "PLAIN_TEXT",
        COLOR = "COLOR"
    }
    interface PhysicalProperties$1 {
        /** Line item weight. Measurement unit matches the weight unit specified in `weightUnit` in the request. */
        weight?: number | null;
        /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
        sku?: string | null;
        /** Whether this line item is shippable. */
        shippable?: boolean;
    }
    interface CustomLineItem$1 {
        /**
         * Custom line item quantity.
         *
         * Min: `1`
         * Max: `100000`
         */
        quantity?: number;
        /**
         * Custom line item price.
         *
         * Must be a number or a decimal without symbols.
         */
        price?: string;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription$1;
        /** Custom line item description lines. Used for display purposes for the cart, checkout and order. */
        descriptionLines?: DescriptionLine$1[];
        /** Custom line item's media. */
        media?: string;
        /**
         * Custom line item ID. If passed, `id` must be unique.
         * Default: auto-generated ID.
         */
        _id?: string | null;
        /** Tax group ID for this custom line item. */
        taxGroupId?: string | null;
        /**
         * *Required** - Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName$1;
        /**
         * Optional - URL to the item's page on the site. When not provided, the link back from the cart page to the relevant product page will not work.
         * The URL is optional and if not provided, the site URL will be used.
         */
        url?: string;
        /** *Required** - Item type. Either a preset type or custom. */
        itemType?: ItemType$1;
        /** Optional - Item price **before** catalog-defined discount. Defaults to `price` when not provided. */
        fullPrice?: string | null;
        /**
         * Optional - Item quantity available for purchase. Only return this if inventory is managed.
         * Not returning this field means that the buyer can "infinitely" tick up the number of items in the cart.
         */
        quantityAvailable?: number | null;
        /** Optional - Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties$1;
        /**
         * Optional - Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE` - Entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE` - Entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `DEPOSIT_ONLINE` -  Partial payment for the given item to be paid upfront during the checkout. Amount to be paid is defined by deposit_amount field.
         */
        paymentOption?: PaymentOptionType$1;
        /**
         * Optional - Service properties. When relevant, this contains information such as date and number of participants.
         * Used, among other things, when checking for valid memberships.
         */
        serviceProperties?: ServiceProperties$1;
        /**
         * Optional - In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + in most cases, this field is the name as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         */
        rootCatalogItemId?: string | null;
        /**
         * Optional - partial payment for the given item to be paid upfront during the checkout.
         * Eligible for catalog items with type `DEPOSIT_ONLINE`.
         * If omitted - item's price will not be split and is expected to be paid in single installment
         */
        depositAmount?: string | null;
        /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$1;
    }
    interface PriceDescription$1 {
        /** __Required.__ Price description in the site's default language. */
        original?: string;
        /**
         * Price description translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface ItemType$1 extends ItemTypeItemTypeDataOneOf$1 {
        /** Preset item type. */
        preset?: ItemTypeItemType$1;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    /** @oneof */
    interface ItemTypeItemTypeDataOneOf$1 {
        /** Preset item type. */
        preset?: ItemTypeItemType$1;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    enum ItemTypeItemType$1 {
        UNRECOGNISED = "UNRECOGNISED",
        PHYSICAL = "PHYSICAL",
        DIGITAL = "DIGITAL",
        GIFT_CARD = "GIFT_CARD",
        SERVICE = "SERVICE"
    }
    interface Scope$1 {
        /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
        namespace?: string;
        /** Coupon scope's applied group (e.g., event or ticket in Wix Events) */
        group?: Group$1;
    }
    interface Group$1 {
        /** Coupon scope's group (e.g., product or collection in Wix Stores). See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
        name?: string;
        /** Item ID (when the coupon scope is limited to just one item). */
        entityId?: string | null;
    }
    interface SubscriptionOptionInfo$2 {
        /** Subscription option settings. */
        subscriptionSettings?: SubscriptionSettings$2;
        /** Subscription option title. */
        title?: Title$1;
        /** Subscription option description. */
        description?: Description$1;
    }
    interface SubscriptionSettings$2 {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency$2;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal` is `true`. */
        billingCycles?: number | null;
    }
    /** Frequency unit of recurring payment */
    enum SubscriptionFrequency$2 {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface Title$1 {
        /** Subscription option name in the site's default language. */
        original?: string;
        /**
         * Subscription option name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Description$1 {
        /** Subscription option description. */
        original?: string;
        /** Translated subscription option description. */
        translated?: string | null;
    }
    interface SecuredMedia$1 {
        /** Media ID in Wix Media Manager. */
        _id?: string;
        /** Original filename. */
        fileName?: string;
        /** File type. */
        fileType?: FileType$1;
    }
    enum FileType$1 {
        UNSPECIFIED = "UNSPECIFIED",
        SECURE_PICTURE = "SECURE_PICTURE",
        SECURE_VIDEO = "SECURE_VIDEO",
        SECURE_DOCUMENT = "SECURE_DOCUMENT",
        SECURE_MUSIC = "SECURE_MUSIC",
        SECURE_ARCHIVE = "SECURE_ARCHIVE"
    }
    /** Type of selected payment option for catalog item */
    enum PaymentOptionType$1 {
        /** The entire payment for this item happens as part of the checkout. */
        FULL_PAYMENT_ONLINE = "FULL_PAYMENT_ONLINE",
        /** The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods. */
        FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
        /** Payment for this item is done by charging a membership. When selected, `price` is `0`. */
        MEMBERSHIP = "MEMBERSHIP",
        /** Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`. */
        DEPOSIT_ONLINE = "DEPOSIT_ONLINE",
        /** Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`. */
        MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
    }
    interface ServiceProperties$1 {
        /**
         * Date and time the service is to be provided, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * For example, the start time of a class.
         */
        scheduledDate?: Date;
        /** The number of people participating in the service. For example, the number of people attending a class or the number of people per hotel room. */
        numberOfParticipants?: number | null;
    }
    interface ExtendedFields$1 {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    interface CreateCheckoutTemplateRequest {
        /** Checkout template to create. */
        checkoutTemplate: CheckoutTemplate;
    }
    interface CreateCheckoutTemplateResponse {
        /** Created checkout template. */
        checkoutTemplate?: CheckoutTemplate;
    }
    interface GetCheckoutTemplateRequest {
        /** ID of the checkout template to retrieve. */
        checkoutTemplateId: string;
    }
    interface GetCheckoutTemplateResponse {
        /** Retrieved checkout template. */
        checkoutTemplate?: CheckoutTemplate;
    }
    interface UpdateCheckoutTemplateRequest {
        /** Checkout template info to update. */
        checkoutTemplate: CheckoutTemplate;
    }
    interface UpdateCheckoutTemplateResponse {
        /** Updated checkout template. */
        checkoutTemplate?: CheckoutTemplate;
    }
    interface DeleteCheckoutTemplateRequest {
        /** ID of the checkout template to delete. */
        checkoutTemplateId: string;
    }
    interface DeleteCheckoutTemplateResponse {
    }
    interface QueryCheckoutTemplatesRequest {
        /** Query options. */
        query?: CursorQuery;
    }
    interface CursorQuery extends CursorQueryPagingMethodOneOf {
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging;
        /**
         * Filter object in the following format:
         * `"filter" : {
         * "fieldName1": "value1",
         * "fieldName2":{"$operator":"value2"}
         * }`
         *
         * Example of operators: `$eq`, `$ne`, `$in`, `$startsWith`, `$exists`, `$hasSome`
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
        cursorPaging?: CursorPaging;
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
    interface CursorPaging {
        /** Number of items to load. */
        limit?: number | null;
        /**
         * Pointer to the next or previous page in the list of results. </ br>
         *
         * You can get the relevant cursor token
         * from the `pagingMetadata` object in the previous call's response.
         * Not relevant for the first request.
         */
        cursor?: string | null;
    }
    interface QueryCheckoutTemplatesResponse {
        /** Retrieved checkout templates. */
        checkoutTemplates?: CheckoutTemplate[];
        /** Paging metadata. */
        pagingMetadata?: CursorPagingMetadata;
    }
    interface CursorPagingMetadata {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        cursors?: Cursors;
        /**
         * Indicates if there are more results after the current page.
         * If `true`, another page of results can be retrieved.
         * If `false`, this is the last page.
         */
        hasNext?: boolean | null;
    }
    interface Cursors {
        /** Cursor pointing to next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to previous page in the list of results. */
        prev?: string | null;
    }
    interface CreateCheckoutFromTemplateRequest {
        /** ID of the checkout template to use to create a checkout from. */
        checkoutTemplateId: string;
        /** ID of the site associated with the checkout template. */
        siteId: string;
    }
    interface CreateCheckoutFromTemplateResponse {
        /** ID of the created checkout. */
        checkoutId?: string;
        /** URL of the created checkout page. */
        checkoutUrl?: string;
        /** Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order. */
        purchaseFlowId?: string | null;
    }
    /** Triggered when newly checkout created successfully from checkout template */
    interface CheckoutTemplateUsed {
        /** checkout template */
        checkoutTemplate?: CheckoutTemplate;
        /** newly created checkout */
        checkout?: Checkout;
    }
    interface Checkout {
        /**
         * Checkout ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Line items.
         *
         * Max: 300 items
         * @readonly
         */
        lineItems?: LineItem$2[];
        /** Billing information. */
        billingInfo?: AddressWithContact$1;
        /** Shipping information. */
        shippingInfo?: ShippingInfo$1;
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /** Buyer information. */
        buyerInfo?: BuyerInfo$3;
        /**
         * All converted prices are displayed in this currency in three-letter [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format.
         * @readonly
         */
        conversionCurrency?: string;
        /**
         * Calculated price summary for the checkout.
         * @readonly
         */
        priceSummary?: PriceSummary$1;
        /**
         * Errors when calculating totals.
         * @readonly
         */
        calculationErrors?: CalculationErrors$1;
        /**
         * Applied gift card details.
         *
         * >**Note:** Gift cards are supported through the Wix UI, though the SPI is not currently available. Learn more about [Wix Gift Cards](https://support.wix.com/en/article/wix-stores-setting-up-wix-gift-cards).
         * @readonly
         */
        giftCard?: GiftCard$2;
        /**
         * Applied discounts.
         * @readonly
         */
        appliedDiscounts?: AppliedDiscount$1[];
        /** Custom fields. */
        customFields?: CustomField$1[];
        /**
         * Weight measurement unit - defaults to site's weight unit.
         * @readonly
         */
        weightUnit?: WeightUnit$2;
        /**
         * Tax summary.
         * @readonly
         */
        taxSummary?: TaxSummary$1;
        /**
         * The currency used when submitting the order.
         * @readonly
         */
        currency?: string;
        /**
         * Sales channel that submitted the order.
         * + `"UNSPECIFIED"`: Unspecified sales channel. This value is not supported.
         * + `"WEB"`: A web client.
         * + `"POS"`: [Point of sale solutions](https://support.wix.com/en/wix-mobile-pos-2196395)
         * + `"EBAY"`: [eBay](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-ebay-shop)
         * + `"AMAZON"`: [Amazon](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-an-amazon-shop)
         * + `"WISH"`: [Wish](https://support.wix.com/en/article/wix-stores-connecting-and-setting-up-a-wish-shop)
         * + `"WIX_INVOICES"`: Wix Invoices app in [your dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Finvoices/settings/general-settings)
         * + `"WIX_APP_STORE"`: [Wix Owner app](https://support.wix.com/article/wix-owner-app-an-overview)
         * + `"BACKOFFICE_MERCHANT"`: Wix merchant backoffice
         * + `"OTHER_PLATFORM"`: Other sales platform.
         * @readonly
         */
        channelType?: ChannelType$2;
        /**
         * Site language in which original values are shown.
         * @readonly
         */
        siteLanguage?: string;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         * @readonly
         */
        buyerLanguage?: string;
        /**
         * Whether an order was successfully created from this checkout.
         * For an order to be successful, it must be successfully paid for (unless the total is 0).
         * @readonly
         */
        completed?: boolean;
        /**
         * Whether tax is included in line item prices.
         * @readonly
         */
        taxIncludedInPrice?: boolean;
        /**
         * ID of the checkout's initiator.
         * @readonly
         */
        createdBy?: CreatedBy;
        /**
         * Date and time the checkout was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the checkout was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /**
         * Minimal amount to pay in order to place the order.
         * @readonly
         */
        payNow?: PriceSummary$1;
        /**
         * Remaining amount for the order to be fully paid.
         * @readonly
         */
        payLater?: PriceSummary$1;
        /** Memberships to apply when creating the order. */
        membershipOptions?: MembershipOptions$1;
        /** Additional Fees. */
        additionalFees?: AdditionalFee$1[];
        /** Cart ID that this checkout was created from. Empty if this checkout wasn't created from a cart. */
        cartId?: string | null;
        /**
         * List of validation violations raised by the [Validations SPI](https://dev.wix.com/api/rest/wix-ecommerce/validations-integration-spi/introduction).
         * @readonly
         */
        violations?: Violation$1[];
        /**
         * Custom field data for the checkout object.
         *
         * [Extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields) must be configured in the Wix Dev Center before they can be accessed with API calls.
         */
        extendedFields?: ExtendedFields$1;
        /**
         * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
         * @readonly
         */
        purchaseFlowId?: string | null;
        /**
         * Additional settings for customization of the checkout process.
         *
         * Custom settings can only be set when [creating a checkout](https://dev.wix.com/docs/rest/api-reference/wix-e-commerce/checkout/create-checkout).
         */
        customSettings?: CustomSettings;
    }
    interface LineItem$2 {
        /**
         * Line item ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Item quantity.
         *
         * Min: `"1"`
         * Max: `"100000"`
         */
        quantity?: number;
        /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference$1;
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         * @readonly
         */
        productName?: ProductName$1;
        /**
         * URL to the item's page on the site.
         * @readonly
         */
        url?: string;
        /**
         * Item price **after** catalog-defined discount and line item discounts.
         * @readonly
         */
        price?: MultiCurrencyPrice$1;
        /**
         * Total line item price **after** catalog-defined discount and line item discounts.
         * @readonly
         */
        lineItemPrice?: MultiCurrencyPrice$1;
        /**
         * Item price **before** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        fullPrice?: MultiCurrencyPrice$1;
        /**
         * Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        priceBeforeDiscounts?: MultiCurrencyPrice$1;
        /**
         * Total price after all discounts and tax.
         * @readonly
         */
        totalPriceAfterTax?: MultiCurrencyPrice$1;
        /**
         * Total price after discounts, and before tax.
         * @readonly
         */
        totalPriceBeforeTax?: MultiCurrencyPrice$1;
        /**
         * Tax details for this line item.
         * @readonly
         */
        taxDetails?: ItemTaxFullDetails$1;
        /**
         * Discount for this line item's entire quantity.
         * @readonly
         */
        discount?: MultiCurrencyPrice$1;
        /**
         * Line item description lines. Used for display purposes for the cart, checkout and order.
         * @readonly
         */
        descriptionLines?: DescriptionLine$1[];
        /**
         * Line item image details.
         * @readonly
         */
        media?: string;
        /**
         * Item availability details.
         * @readonly
         */
        availability?: ItemAvailabilityInfo$1;
        /**
         * Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability.
         * @readonly
         */
        physicalProperties?: PhysicalProperties$1;
        /**
         * Item type. Either a preset type or custom.
         * @readonly
         */
        itemType?: ItemType$1;
        /**
         * Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE`: The entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE`: The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP`: Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is `0`.
         * + `DEPOSIT_ONLINE`: Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is defined by `lineItem.deposit`.
         * + `MEMBERSHIP_OFFLINE`: Payment for this item can only be performed by using a membership and must be manually redeemed in the dashboard by the site owner. When this option is used, `lineItem.price.amount` is `0`.
         * @readonly
         */
        paymentOption?: PaymentOptionType$1;
        /**
         * Service properties. When relevant, this contains information such as date and number of participants.
         * @readonly
         */
        serviceProperties?: ServiceProperties$1;
        /**
         * In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + In most cases, this field has the same value as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         * @readonly
         */
        rootCatalogItemId?: string | null;
        /**
         * Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67".
         * @readonly
         */
        priceDescription?: PriceDescription$1;
        /**
         * Partial payment to be paid upfront during the checkout. Eligible for catalog items with `lineItem.paymentOption` type `DEPOSIT_ONLINE` only.
         * @readonly
         */
        depositAmount?: MultiCurrencyPrice$1;
        /**
         * Item payment policy that requires customer consent to complete purchase. The payment policy will be displayed on the checkout page.
         * @readonly
         */
        consentRequiredPaymentPolicy?: string | null;
    }
    interface MultiCurrencyPrice$1 {
        /** Amount. */
        amount?: string;
        /**
         * Converted amount.
         * @readonly
         */
        convertedAmount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
        /**
         * Converted amount formatted with currency symbol.
         * @readonly
         */
        formattedConvertedAmount?: string;
    }
    interface ItemTaxFullDetails$1 {
        /** Amount for which tax is calculated. */
        taxableAmount?: MultiCurrencyPrice$1;
        /** Tax rate %, as a decimal point between 0 and 1. */
        taxRate?: string;
        /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
        totalTax?: MultiCurrencyPrice$1;
        /**
         * If breakdown exists, the sum of rates in the breakdown must equal `tax_rate`. Deprecated - use 'tax_breakdown' instead.
         * @readonly
         */
        rateBreakdown?: TaxRateBreakdown$1[];
    }
    interface TaxRateBreakdown$1 {
        /** Name of tax against which the calculation was performed. */
        name?: string;
        /** Rate at which this tax detail was calculated. */
        rate?: string;
        /** Amount of tax for this tax detail. */
        tax?: MultiCurrencyPrice$1;
    }
    /**
     * TaxBreakdown represents tax information for a line item.
     * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
     */
    interface TaxBreakdown$1 {
        /** The name of the jurisdiction to which this tax detail applies. For example, "New York" or "Quebec". */
        jurisdiction?: string | null;
        /** The amount of this line item price that was considered nontaxable. (Decimal value) */
        nonTaxableAmount?: MultiCurrencyPrice$1;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.0000 signifies 200% tax. (Decimal value) */
        rate?: string | null;
        /** The amount of tax estimated for this line item. (Decimal value) */
        taxAmount?: MultiCurrencyPrice$1;
        /** The taxable amount of this line item. */
        taxableAmount?: MultiCurrencyPrice$1;
        /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
        taxType?: string | null;
        /**
         * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
         * This name should be explicit enough to allow the merchant to understand what tax was calculated.
         */
        taxName?: string | null;
        /** The type of the jurisdiction in which this tax detail applies. */
        jurisdictionType?: JurisdictionType$1;
    }
    /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
    enum JurisdictionType$1 {
        UNDEFINED = "UNDEFINED",
        COUNTRY = "COUNTRY",
        STATE = "STATE",
        COUNTY = "COUNTY",
        CITY = "CITY",
        SPECIAL = "SPECIAL"
    }
    interface ItemAvailabilityInfo$1 {
        /**
         * Item availability status.
         * + `"NOT_FOUND"`: Item does not exist
         * + `"NOT_AVAILABLE"`: Item not in stock
         * + `"PARTIALLY_AVAILABLE"`: Available quantity is less than requested
         */
        status?: ItemAvailabilityStatus$1;
        /** Quantity available. */
        quantityAvailable?: number | null;
    }
    enum ItemAvailabilityStatus$1 {
        AVAILABLE = "AVAILABLE",
        NOT_FOUND = "NOT_FOUND",
        /** Not in stock */
        NOT_AVAILABLE = "NOT_AVAILABLE",
        /** Available quantity is less than requested */
        PARTIALLY_AVAILABLE = "PARTIALLY_AVAILABLE"
    }
    /** Billing Info and shipping details */
    interface AddressWithContact$1 {
        /** Address. */
        address?: Address$2;
        /** Contact details. */
        contactDetails?: FullAddressContactDetails$1;
    }
    /** Physical address */
    interface Address$2 {
        /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
        country?: string | null;
        /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Postal or zip code. */
        postalCode?: string | null;
        /** Street address. */
        streetAddress?: StreetAddress$1;
        /** Main address line (usually street name and number). */
        addressLine1?: string | null;
        /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
        addressLine2?: string | null;
    }
    interface StreetAddress$1 {
        /** Street number. */
        number?: string;
        /** Street name. */
        name?: string;
    }
    interface AddressLocation$1 {
        /** Address latitude. */
        latitude?: number | null;
        /** Address longitude. */
        longitude?: number | null;
    }
    /** Full contact details for an address */
    interface FullAddressContactDetails$1 {
        /** First name. */
        firstName?: string | null;
        /** Last name. */
        lastName?: string | null;
        /** Phone number. */
        phone?: string | null;
        /** Company name. */
        company?: string | null;
        /** Tax information (for Brazil only). If ID is provided, `vatId.type` must also be set, `UNSPECIFIED` is not allowed. */
        vatId?: VatId$2;
    }
    interface VatId$2 {
        /** Customer's tax ID. */
        _id?: string;
        /**
         * Tax type.
         *
         * Supported values:
         * + `CPF`: for individual tax payers
         * + `CNPJ`: for corporations
         */
        type?: VatType$2;
    }
    /** tax info types */
    enum VatType$2 {
        UNSPECIFIED = "UNSPECIFIED",
        /** CPF - for individual tax payers. */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface ShippingInfo$1 {
        /** Shipping address and contact details. */
        shippingDestination?: AddressWithContact$1;
        /** Selected option out of the options allowed for the `region`. */
        selectedCarrierServiceOption?: SelectedCarrierServiceOption$1;
        /**
         * Shipping region. Based on the address provided.
         * @readonly
         */
        region?: ShippingRegion$1;
        /**
         * All carrier options for this shipping rule.
         * @readonly
         */
        carrierServiceOptions?: CarrierServiceOption$1[];
    }
    interface SelectedCarrierServiceOption$1 {
        /** Unique identifier of selected option. For example, "usps_std_overnight". */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         * @readonly
         */
        title?: string;
        /**
         * Delivery logistics.
         * @readonly
         */
        logistics?: DeliveryLogistics$1;
        /**
         * Shipping costs.
         * @readonly
         */
        cost?: SelectedCarrierServiceOptionPrices$1;
        /**
         * Were we able to find the requested shipping option, or otherwise we fallback to the default one (the first)
         * @readonly
         */
        requestedShippingOption?: boolean;
        /** Other charges */
        otherCharges?: SelectedCarrierServiceOptionOtherCharge$1[];
        /** This carrier's unique ID */
        carrierId?: string | null;
    }
    interface DeliveryLogistics$1 {
        /** Expected delivery time, in free text. For example, "3-5 business days". */
        deliveryTime?: string | null;
        /** Instructions for caller, e.g for pickup: "Please deliver during opening hours, and please don't park in disabled parking spot". */
        instructions?: string | null;
        /** Pickup details. */
        pickupDetails?: PickupDetails$2;
    }
    interface PickupDetails$2 {
        /** Pickup address. */
        address?: Address$2;
        /** Whether the pickup address is that of a business - this may effect tax calculation. */
        businessLocation?: boolean;
        /** Pickup method */
        pickupMethod?: PickupMethod$1;
    }
    enum PickupMethod$1 {
        UNKNOWN_METHOD = "UNKNOWN_METHOD",
        STORE_PICKUP = "STORE_PICKUP",
        PICKUP_POINT = "PICKUP_POINT"
    }
    interface DeliveryTimeSlot$1 {
        /** starting time of the delivery time slot */
        from?: Date;
        /** ending time of the delivery time slot */
        to?: Date;
    }
    interface SelectedCarrierServiceOptionPrices$1 {
        /** Total shipping price, after discount and after tax. */
        totalPriceAfterTax?: MultiCurrencyPrice$1;
        /** Total price of shipping after discounts (when relevant), and before tax. */
        totalPriceBeforeTax?: MultiCurrencyPrice$1;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$1;
        /** Shipping discount before tax. */
        totalDiscount?: MultiCurrencyPrice$1;
        /** Shipping price before discount and before tax. */
        price?: MultiCurrencyPrice$1;
    }
    interface SelectedCarrierServiceOptionOtherCharge$1 {
        /** Type of additional cost. */
        type?: ChargeType$1;
        /** Details of the charge, such as 'Full Coverage Insurance of up to 80% of value of shipment'. */
        details?: string | null;
        /** Price of added charge. */
        cost?: SelectedCarrierServiceOptionPrices$1;
    }
    enum ChargeType$1 {
        HANDLING_FEE = "HANDLING_FEE",
        INSURANCE = "INSURANCE"
    }
    interface ShippingRegion$1 {
        /**
         * Shipping region ID.
         * @readonly
         */
        _id?: string;
        /** Shipping region name. */
        name?: string;
    }
    interface CarrierServiceOption$1 {
        /** Carrier ID. */
        carrierId?: string;
        /** Shipping options offered by this carrier for this request. */
        shippingOptions?: ShippingOption$1[];
    }
    interface ShippingOption$1 {
        /**
         * Unique code of provided shipping option like "usps_std_overnight".
         * For legacy calculators this would be the UUID of the option.
         */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         */
        title?: string;
        /** Delivery logistics. */
        logistics?: DeliveryLogistics$1;
        /** Sipping price information. */
        cost?: ShippingPrice$1;
    }
    interface ShippingPrice$1 {
        /** Shipping price. */
        price?: MultiCurrencyPrice$1;
        /** Other costs such as insurance, handling & packaging for fragile items, etc. */
        otherCharges?: OtherCharge$1[];
    }
    interface OtherCharge$1 {
        /** Type of additional cost. */
        type?: ChargeType$1;
        /** Price of added cost. */
        price?: MultiCurrencyPrice$1;
    }
    interface BuyerInfo$3 extends BuyerInfoIdOneOf$1 {
        /**
         * Visitor ID (if site visitor is **not** a member).
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID (if site visitor is a site member).
         * @readonly
         */
        memberId?: string;
        /**
         * Contact ID. Auto-created if one does not yet exist. For more information, see [Contacts API](https://dev.wix.com/api/rest/contacts/contacts/introduction).
         * @readonly
         */
        contactId?: string | null;
        /** Buyer email address. */
        email?: string | null;
    }
    /** @oneof */
    interface BuyerInfoIdOneOf$1 {
        /**
         * Visitor ID (if site visitor is **not** a member).
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID (if site visitor is a site member).
         * @readonly
         */
        memberId?: string;
    }
    interface PriceSummary$1 {
        /** Subtotal of all line items, before discounts and before tax. */
        subtotal?: MultiCurrencyPrice$1;
        /** Total shipping price, before discounts and before tax. */
        shipping?: MultiCurrencyPrice$1;
        /** Total tax. */
        tax?: MultiCurrencyPrice$1;
        /** Total calculated discount value. */
        discount?: MultiCurrencyPrice$1;
        /** Total price after discounts, gift cards, and tax. */
        total?: MultiCurrencyPrice$1;
        /** Total additional fees price before tax. */
        additionalFees?: MultiCurrencyPrice$1;
    }
    interface CalculationErrors$1 extends CalculationErrorsShippingCalculationErrorOneOf$1 {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details$1;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors$1;
        /** Tax calculation error. */
        taxCalculationError?: Details$1;
        /** Coupon calculation error. */
        couponCalculationError?: Details$1;
        /** Gift card calculation error. */
        giftCardCalculationError?: Details$1;
        /** Order validation errors. */
        orderValidationErrors?: ApplicationError$3[];
        /**
         * Membership payment methods calculation errors
         * For example, will indicate that a line item that must be paid with membership payment doesn't have one or selected memberships are invalid
         */
        membershipError?: Details$1;
        /** Discount Rule calculation error. */
        discountsCalculationError?: Details$1;
    }
    /** @oneof */
    interface CalculationErrorsShippingCalculationErrorOneOf$1 {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details$1;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors$1;
    }
    interface Details$1 extends DetailsKindOneOf$1 {
        applicationError?: ApplicationError$3;
        validationError?: ValidationError$1;
        systemError?: SystemError$1;
        /** deprecated in API's - to enable migration from rendering arbitrary tracing to rest response */
        tracing?: Record<string, string>;
    }
    /** @oneof */
    interface DetailsKindOneOf$1 {
        applicationError?: ApplicationError$3;
        validationError?: ValidationError$1;
        systemError?: SystemError$1;
    }
    interface ApplicationError$3 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    /**
     * example result:
     * {
     * "fieldViolations": [
     * {
     * "field": "fieldA",
     * "description": "invalid music note. supported notes: [do,re,mi,fa,sol,la,ti]",
     * "violatedRule": "OTHER",
     * "ruleName": "INVALID_NOTE",
     * "data": {
     * "value": "FI"
     * }
     * },
     * {
     * "field": "fieldB",
     * "description": "field value out of range. supported range: [0-20]",
     * "violatedRule": "MAX",
     * "data": {
     * "threshold": 20
     * }
     * },
     * {
     * "field": "fieldC",
     * "description": "invalid phone number. provide a valid phone number of size: [7-12], supported characters: [0-9, +, -, (, )]",
     * "violatedRule": "FORMAT",
     * "data": {
     * "type": "PHONE"
     * }
     * }
     * ]
     * }
     */
    interface ValidationError$1 {
        fieldViolations?: FieldViolation$1[];
    }
    enum RuleType$1 {
        VALIDATION = "VALIDATION",
        OTHER = "OTHER",
        MAX = "MAX",
        MIN = "MIN",
        MAX_LENGTH = "MAX_LENGTH",
        MIN_LENGTH = "MIN_LENGTH",
        MAX_SIZE = "MAX_SIZE",
        MIN_SIZE = "MIN_SIZE",
        FORMAT = "FORMAT",
        DECIMAL_LTE = "DECIMAL_LTE",
        DECIMAL_GTE = "DECIMAL_GTE",
        DECIMAL_LT = "DECIMAL_LT",
        DECIMAL_GT = "DECIMAL_GT",
        DECIMAL_MAX_SCALE = "DECIMAL_MAX_SCALE",
        INVALID_ENUM_VALUE = "INVALID_ENUM_VALUE",
        REQUIRED_FIELD = "REQUIRED_FIELD",
        FIELD_NOT_ALLOWED = "FIELD_NOT_ALLOWED",
        ONE_OF_ALIGNMENT = "ONE_OF_ALIGNMENT"
    }
    interface FieldViolation$1 {
        field?: string;
        description?: string;
        violatedRule?: RuleType$1;
        /** applicable when violated_rule=OTHER */
        ruleName?: string | null;
        data?: Record<string, any> | null;
    }
    interface SystemError$1 {
        /** Error code. */
        errorCode?: string | null;
    }
    interface CarrierErrors$1 {
        /** Carrier errors. */
        errors?: CarrierError$1[];
    }
    interface CarrierError$1 {
        /** Carrier ID. */
        carrierId?: string;
        /** Error details. */
        error?: Details$1;
    }
    interface GiftCard$2 {
        /** Gift Card ID. */
        _id?: string;
        /** Gift card obfuscated code. */
        obfuscatedCode?: string;
        /** Gift card value. */
        amount?: MultiCurrencyPrice$1;
        /** App ID of the gift card provider. */
        appId?: string;
    }
    interface AppliedDiscount$1 extends AppliedDiscountDiscountSourceOneOf$1 {
        /** Coupon details. */
        coupon?: Coupon$1;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$1;
        /** Discount rule */
        discountRule?: DiscountRule$1;
        /** Discount type. */
        discountType?: DiscountType$1;
        /** IDs of line items the discount applies to. */
        lineItemIds?: string[];
    }
    /** @oneof */
    interface AppliedDiscountDiscountSourceOneOf$1 {
        /** Coupon details. */
        coupon?: Coupon$1;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount$1;
        /** Discount rule */
        discountRule?: DiscountRule$1;
    }
    enum DiscountType$1 {
        GLOBAL = "GLOBAL",
        SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
        SHIPPING = "SHIPPING"
    }
    /** Coupon */
    interface Coupon$1 {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
        /** Coupon value. */
        amount?: MultiCurrencyPrice$1;
        /** Coupon name. */
        name?: string;
    }
    interface MerchantDiscount$1 {
        /** Discount value. */
        amount?: MultiCurrencyPrice$1;
        /** Discount Percentage. Will be calculated from items price before other discounts. */
        percentage?: number | null;
    }
    interface DiscountRule$1 {
        /** Discount rule ID */
        _id?: string;
        /** Discount rule name */
        name?: DiscountRuleName$1;
        /** Discount value. */
        amount?: MultiCurrencyPrice$1;
    }
    interface DiscountRuleName$1 {
        /** Original discount rule name (in site's default language). */
        original?: string;
        /** Translated discount rule name according to buyer language. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface LineItemDiscount$1 {
        /** ID of line item the discount applies to. */
        _id?: string;
        /** Discount value. */
        totalDiscountAmount?: MultiCurrencyPrice$1;
    }
    interface CustomField$1 {
        /** Custom field value. */
        value?: any;
        /** Custom field title. */
        title?: string;
        /** Translated custom field title. */
        translatedTitle?: string | null;
    }
    enum WeightUnit$2 {
        /** Weight unit can't be classified, due to an error */
        UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
        /** Kilograms */
        KG = "KG",
        /** Pounds */
        LB = "LB"
    }
    interface TaxSummary$1 {
        /**
         * Amount for which tax is calculated, added from line items.
         * @readonly
         */
        taxableAmount?: MultiCurrencyPrice$1;
        /**
         * Calculated tax, added from line items.
         * @readonly
         */
        totalTax?: MultiCurrencyPrice$1;
        /** Tax calculator that was active when the order was created. */
        calculationDetails?: TaxCalculationDetails$1;
    }
    interface TaxCalculationDetails$1 extends TaxCalculationDetailsCalculationDetailsOneOf$1 {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason$1;
        /** Details of the fallback rate calculation. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails$1;
        /** Rate calculation type. */
        rateType?: RateType$1;
    }
    /** @oneof */
    interface TaxCalculationDetailsCalculationDetailsOneOf$1 {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason$1;
        /** Details of the fallback rate calculation. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails$1;
    }
    enum RateType$1 {
        /** no tax being collected for this request due to location of purchase */
        NO_TAX_COLLECTED = "NO_TAX_COLLECTED",
        /** manual rate used for calculation */
        MANUAL_RATE = "MANUAL_RATE",
        /** autotax rate used for calculation */
        AUTO_RATE = "AUTO_RATE",
        /** fallback rate used for calculation */
        FALLBACK_RATE = "FALLBACK_RATE"
    }
    enum ManualCalculationReason$1 {
        /** user set calculator in Business Manager to be Manual */
        GLOBAL_SETTING_TO_MANUAL = "GLOBAL_SETTING_TO_MANUAL",
        /** specific region is on manual even though Global setting is Auto-tax */
        REGION_SETTING_TO_MANUAL = "REGION_SETTING_TO_MANUAL"
    }
    interface AutoTaxFallbackCalculationDetails$1 {
        /** reason for fallback */
        fallbackReason?: FallbackReason$1;
        /** invalid request (i.e. address), timeout, internal error, license error, and others will be encoded here */
        error?: ApplicationError$3;
    }
    enum FallbackReason$1 {
        /** auto-tax failed to be calculated */
        AUTO_TAX_FAILED = "AUTO_TAX_FAILED",
        /** auto-tax was temporarily deactivated on a system-level */
        AUTO_TAX_DEACTIVATED = "AUTO_TAX_DEACTIVATED"
    }
    /**
     * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
     * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
     */
    interface AggregatedTaxBreakdown$1 {
        /** The name of the tax against which this tax amount was calculated. */
        taxName?: string;
        /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
        taxType?: string;
        /** The name of the jurisdiction in which this tax detail applies. */
        jurisdiction?: string;
        /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
        jurisdictionTypeEnum?: JurisdictionType$1;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.000 signifies 200% tax. (Decimal value) */
        rate?: string;
        /** The sum of all the tax from line items that calculated by the tax identifiers. */
        aggregatedTaxAmount?: MultiCurrencyPrice$1;
    }
    enum ChannelType$2 {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        POS = "POS",
        EBAY = "EBAY",
        AMAZON = "AMAZON",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE",
        WIX_INVOICES = "WIX_INVOICES",
        BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
        WISH = "WISH",
        CLASS_PASS = "CLASS_PASS",
        GLOBAL_E = "GLOBAL_E",
        FACEBOOK = "FACEBOOK",
        ETSY = "ETSY",
        TIKTOK = "TIKTOK",
        FAIRE_COM = "FAIRE_COM"
    }
    interface CreatedBy extends CreatedByIdOneOf {
        /**
         * User ID - when the order was created by a Wix user on behalf of a buyer.
         * For example, via POS (point of service).
         */
        userId?: string;
        /** Member ID - when the order was created by a **logged in** site visitor. */
        memberId?: string;
        /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
        visitorId?: string;
        /** App ID - when the order was created by an external application or Wix service. */
        appId?: string;
    }
    /** @oneof */
    interface CreatedByIdOneOf {
        /**
         * User ID - when the order was created by a Wix user on behalf of a buyer.
         * For example, via POS (point of service).
         */
        userId?: string;
        /** Member ID - when the order was created by a **logged in** site visitor. */
        memberId?: string;
        /** Visitor ID - when the order was created by a site visitor that was **not** logged in. */
        visitorId?: string;
        /** App ID - when the order was created by an external application or Wix service. */
        appId?: string;
    }
    /** Reserved for internal use. */
    interface MembershipOptions$1 {
        /**
         * Reserved for internal use.
         * @readonly
         */
        eligibleMemberships?: Membership$1[];
        /**
         * Reserved for internal use.
         * @readonly
         */
        invalidMemberships?: InvalidMembership$1[];
        /** Selected membership to apply to this checkout. */
        selectedMemberships?: SelectedMemberships$1;
    }
    interface Membership$1 {
        /** Membership ID. */
        _id?: string;
        /** ID of the application providing this payment option. */
        appId?: string;
        /** The name of this membership. */
        name?: MembershipName$2;
        /** Line item IDs which are "paid" for by this membership. */
        lineItemIds?: string[];
        /** Optional - For a membership that has limited credits, information about credit usage. */
        credits?: MembershipPaymentCredits$1;
        /** Optional - TMembership expiry date. */
        expirationDate?: Date;
        /** Additional data about this membership. */
        additionalData?: Record<string, any> | null;
    }
    interface MembershipName$2 {
        /** The name of this membership */
        original?: string;
        /** Optional - Translated name of this membership. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface MembershipPaymentCredits$1 {
        /** How much credit this membership has in total */
        total?: number;
        /** How much credit remained for this membership */
        remaining?: number;
    }
    interface InvalidMembership$1 {
        /** Membership details. */
        membership?: Membership$1;
        /** Reason why this membership is invalid and cannot be used. */
        reason?: string;
    }
    interface SelectedMemberships$1 {
        /** Selected memberships. */
        memberships?: SelectedMembership$1[];
    }
    interface SelectedMembership$1 {
        /** Membership ID. */
        _id?: string;
        /** ID of the app providing this payment option. */
        appId?: string;
        /** IDs of the line items this membership applies to. */
        lineItemIds?: string[];
    }
    interface AdditionalFee$1 {
        /** Additional fee's unique code (or ID) for future processing. */
        code?: string | null;
        /** Translated additional fee's name. */
        name?: string;
        /** Additional fee's price. */
        price?: MultiCurrencyPrice$1;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails$1;
        /** Provider's app id. */
        providerAppId?: string | null;
        /** Additional fee's price before tax. */
        priceBeforeTax?: MultiCurrencyPrice$1;
        /**
         * Optional - Line items associated with this additional fee.
         * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
         */
        lineItemIds?: string[];
    }
    interface ConversionInfo {
        /**
         * The site currency.
         * @readonly
         */
        siteCurrency?: string;
        /**
         * The rate used when converting from the site currency to the checkout currency.
         * @readonly
         */
        conversionRate?: string;
    }
    interface Violation$1 {
        /** Severity of the violation. The violations are shown on the cart and checkout pages. A warning is displayed as yellow, and allows a site visitor to proceed with caution. An error is displayed as red, and doesn't allow a site visitor to proceed with the eCommerce flow. */
        severity?: Severity$1;
        /** Target location on a checkout or cart page where the violation will be displayed. */
        target?: Target$1;
        /** Violation description. Can include rich text. Only HTTP or HTTPS links in the following format are allowed: `<a href="https://www.wix.com">Click me</a>`. */
        description?: string | null;
    }
    enum Severity$1 {
        /** The user is allowed to move forward in the flow. */
        WARNING = "WARNING",
        /**
         * The user is blocked from moving forward in the flow.
         * For example, if callerContext is CART - moving to checkout is blocked. if callerContext is CHECKOUT, placing an order is blocked.
         */
        ERROR = "ERROR"
    }
    interface Target$1 extends TargetTargetTypeOneOf$1 {
        /** General (other) violation. */
        other?: Other$1;
        /** Specific line item violation. */
        lineItem?: TargetLineItem$1;
    }
    /** @oneof */
    interface TargetTargetTypeOneOf$1 {
        /** General (other) violation. */
        other?: Other$1;
        /** Specific line item violation. */
        lineItem?: TargetLineItem$1;
    }
    /** Available locations on the webpage */
    enum NameInOther$1 {
        /** default location, in case no specific location is specified */
        OTHER_DEFAULT = "OTHER_DEFAULT"
    }
    /** Available locations on the line item */
    enum NameInLineItem$1 {
        /** default location, in case no specific location is specified */
        LINE_ITEM_DEFAULT = "LINE_ITEM_DEFAULT"
    }
    /** General (other) violation. */
    interface Other$1 {
        /** Location on a checkout or a cart page where a general (other) violation will be displayed. */
        name?: NameInOther$1;
    }
    /** Specific line item violation. */
    interface TargetLineItem$1 {
        /** Location on a checkout or a cart page where the specific line item violation will be displayed. */
        name?: NameInLineItem$1;
        /** ID of the line item containing the violation. */
        _id?: string | null;
    }
    interface CustomSettings {
        /**
         * Whether to restrict the option to add or remove a gift card on the checkout page.
         *
         * Default: `false`
         */
        lockGiftCard?: boolean;
        /**
         * Whether to restrict the option to add or remove a coupon code on the checkout page.
         *
         * Default: `false`
         */
        lockCouponCode?: boolean;
    }
    interface CreateAndRedirectToCheckoutRequest {
        /** ID of the checkout template to use to create a checkout. */
        checkoutTemplateId: string;
        /** ID of the site associated with the checkout template. */
        siteId: string;
    }
    interface RawHttpResponse {
        body?: Uint8Array;
        statusCode?: number | null;
        headers?: HeadersEntry[];
    }
    interface HeadersEntry {
        key?: string;
        value?: string;
    }
    interface DomainEvent$3 extends DomainEventBodyOneOf$3 {
        createdEvent?: EntityCreatedEvent$3;
        updatedEvent?: EntityUpdatedEvent$3;
        deletedEvent?: EntityDeletedEvent$3;
        actionEvent?: ActionEvent$3;
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
    interface DomainEventBodyOneOf$3 {
        createdEvent?: EntityCreatedEvent$3;
        updatedEvent?: EntityUpdatedEvent$3;
        deletedEvent?: EntityDeletedEvent$3;
        actionEvent?: ActionEvent$3;
    }
    interface EntityCreatedEvent$3 {
        entityAsJson?: string;
    }
    interface EntityUpdatedEvent$3 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$3 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$3 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$3 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$3;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$3;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$3 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$3 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates a checkout template.
     *
     * A checkout template is used to create a new checkout that will include predefined information. For example, a single link with
     * a `checkoutTemplateId` can be shared with customers and each time the link is clicked, a new checkout page will be created
     * for that customer with certain checkout information already populated.
     *
     * The customizable features include the option to allow or to lock coupon codes or gift cards. For example, if a store owner is
     * using the checkout template to offer a flash sale to their social media followers, they may want to lock the option to apply an
     * additional coupon on top of the sale being offered. If so, they can set `customization.lockedCoupon` to `true`.
     *
     * A checkout can be created with a checkout template by calling `createCheckoutFromTemplate()`. The site may add further customizations to the new checkout and then redirect the customer using the new checkout's `checkoutUrl`.
     * @param checkoutTemplate - Checkout template to create.
     * @public
     * @documentationMaturity preview
     * @requiredField checkoutTemplate
     * @requiredField checkoutTemplate.lineItems.catalogReference
     * @requiredField checkoutTemplate.lineItems.catalogReference.appId
     * @requiredField checkoutTemplate.lineItems.catalogReference.catalogItemId
     * @requiredField checkoutTemplate.lineItems.quantity
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     * @returns Created checkout template.
     */
    function createCheckoutTemplate(checkoutTemplate: CheckoutTemplate): Promise<CheckoutTemplate>;
    /**
     * Retrieves a checkout template.
     * @param checkoutTemplateId - ID of the checkout template to retrieve.
     * @public
     * @documentationMaturity preview
     * @requiredField checkoutTemplateId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     * @returns Retrieved checkout template.
     */
    function getCheckoutTemplate(checkoutTemplateId: string): Promise<CheckoutTemplate>;
    /**
     * Updates a checkout template.
     *
     * If the info in a checkout template is updated, only new checkouts created from this template will include the updated items. Checkouts previously
     * created from this template before the update will not be affected.
     * @param _id - Checkout template ID.
     * @public
     * @documentationMaturity preview
     * @requiredField _id
     * @requiredField checkoutTemplate
     * @param checkoutTemplate - Checkout template info to update.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     * @returns Updated checkout template.
     */
    function updateCheckoutTemplate(_id: string | null, checkoutTemplate: UpdateCheckoutTemplate, options?: UpdateCheckoutTemplateOptions): Promise<CheckoutTemplate>;
    interface UpdateCheckoutTemplate {
        /**
         * Checkout template ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Status of the checkout template.
         *
         * When `status` is `INACTIVE` checkouts will not be created with this template `_id`. Instead, the function will redirect to the domain site.
         *
         * Default: `ACTIVE`
         */
        status?: Status;
        /** Custom settings to apply to the checkout page created from this template. */
        customization?: CheckoutCustomization;
        /**
         * Line items.
         *
         * Max: 300 items
         */
        lineItems?: V1LineItem[];
        /**
         * Coupon code.
         *
         * Note that a checkout can only hold one `couponCode` at a time. If an additional `couponCode` is added, it will override the existing `couponCode`.
         * For additional information, see the Coupons API.
         */
        couponCode?: string | null;
    }
    interface UpdateCheckoutTemplateOptions {
    }
    /**
     * Deletes a checkout template.
     *
     * If a checkout template is deleted and a customer attempts to create a checkout with that `checkoutTemplateId` then
     * the customer will be redirected to the domain site.
     * @param checkoutTemplateId - ID of the checkout template to delete.
     * @public
     * @documentationMaturity preview
     * @requiredField checkoutTemplateId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteCheckoutTemplate(checkoutTemplateId: string): Promise<void>;
    /**
     * Creates a query to retrieve a list of checkout templates.
     *
     * The `queryCheckoutTemplates()` function builds a query to retrieve a list of checkout templates and returns a `CheckoutTemplatesQueryBuilder` object.
     *
     * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
     *
     * You can refine the query by chaining `CheckoutTemplatesQueryBuilder` functions onto the query. `CheckoutTemplatesQueryBuilder` functions enable you to sort, filter, and control the results that `queryCheckoutTemplates()` returns.
     *
     * `queryCheckoutTemplates()` runs with the following `CheckoutTemplatesQueryBuilder` default that you can override:
     * + `ascending("_id")`
     *
     * The functions that are chained to `queryCheckoutTemplates()` are applied in the order they are called. For example, if you apply `ascending("status")` and then `ascending("_id")`, the results are sorted first by the `"status"`, and then, if there are multiple results with the same `"status"`, the items are sorted by `"_id"`.
     *
     * The following `CheckoutTemplatesQueryBuilder` functions are supported for the `queryCheckoutTemplates()` function. For a full description of the checkout template object, see the object returned for the `items` property in `CheckoutTemplatesQueryResult`.
     * @public
     * @documentationMaturity preview
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @adminMethod
     */
    function queryCheckoutTemplates(): CheckoutTemplatesQueryBuilder;
    interface QueryCursorResult {
        cursors: Cursors;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface CheckoutTemplatesQueryResult extends QueryCursorResult {
        items: CheckoutTemplate[];
        query: CheckoutTemplatesQueryBuilder;
        next: () => Promise<CheckoutTemplatesQueryResult>;
        prev: () => Promise<CheckoutTemplatesQueryResult>;
    }
    interface CheckoutTemplatesQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        eq: (propertyName: "_id" | "status", value: any) => CheckoutTemplatesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ne: (propertyName: "_id" | "status", value: any) => CheckoutTemplatesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         * @documentationMaturity preview
         */
        startsWith: (propertyName: "_id", value: string) => CheckoutTemplatesQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         * @documentationMaturity preview
         */
        hasSome: (propertyName: "_id" | "status", value: any[]) => CheckoutTemplatesQueryBuilder;
        /** @documentationMaturity preview */
        in: (propertyName: "_id" | "status", value: any) => CheckoutTemplatesQueryBuilder;
        /** @documentationMaturity preview */
        exists: (propertyName: "_id" | "status", value: boolean) => CheckoutTemplatesQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        ascending: (...propertyNames: Array<"_id" | "status">) => CheckoutTemplatesQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        descending: (...propertyNames: Array<"_id" | "status">) => CheckoutTemplatesQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
         * @documentationMaturity preview
         */
        limit: (limit: number) => CheckoutTemplatesQueryBuilder;
        /** @param cursor - A pointer to specific record
         * @documentationMaturity preview
         */
        skipTo: (cursor: string) => CheckoutTemplatesQueryBuilder;
        /** @documentationMaturity preview */
        find: () => Promise<CheckoutTemplatesQueryResult>;
    }
    /**
     * Creates a new checkout based on the checkout template.
     *
     * Before using this function, you must have a checkout template available. Create a checkout template with `createCheckoutTemplate()`.
     *
     * The customer can be directed to the new checkout using the checkout's `checkoutUrl`.
     * @param checkoutTemplateId - ID of the checkout template to use to create a checkout from.
     * @param siteId - ID of the site associated with the checkout template.
     * @public
     * @documentationMaturity preview
     * @requiredField checkoutTemplateId
     * @requiredField siteId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     * @applicableIdentity VISITOR
     */
    function createCheckoutFromTemplate(checkoutTemplateId: string, siteId: string): Promise<CreateCheckoutFromTemplateResponse>;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplate = CheckoutTemplate;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Status = Status;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Status: typeof Status;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutCustomization = CheckoutCustomization;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_WebClientCustomization = WebClientCustomization;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_V1LineItem = V1LineItem;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutTemplateRequest = CreateCheckoutTemplateRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutTemplateResponse = CreateCheckoutTemplateResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_GetCheckoutTemplateRequest = GetCheckoutTemplateRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_GetCheckoutTemplateResponse = GetCheckoutTemplateResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplateRequest = UpdateCheckoutTemplateRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplateResponse = UpdateCheckoutTemplateResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_DeleteCheckoutTemplateRequest = DeleteCheckoutTemplateRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_DeleteCheckoutTemplateResponse = DeleteCheckoutTemplateResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_QueryCheckoutTemplatesRequest = QueryCheckoutTemplatesRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorQuery = CursorQuery;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Sorting = Sorting;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_SortOrder = SortOrder;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_SortOrder: typeof SortOrder;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorPaging = CursorPaging;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_QueryCheckoutTemplatesResponse = QueryCheckoutTemplatesResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorPagingMetadata = CursorPagingMetadata;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Cursors = Cursors;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutFromTemplateRequest = CreateCheckoutFromTemplateRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutFromTemplateResponse = CreateCheckoutFromTemplateResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplateUsed = CheckoutTemplateUsed;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Checkout = Checkout;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreatedBy = CreatedBy;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreatedByIdOneOf = CreatedByIdOneOf;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_ConversionInfo = ConversionInfo;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CustomSettings = CustomSettings;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateAndRedirectToCheckoutRequest = CreateAndRedirectToCheckoutRequest;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_RawHttpResponse = RawHttpResponse;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_HeadersEntry = HeadersEntry;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_createCheckoutTemplate: typeof createCheckoutTemplate;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_getCheckoutTemplate: typeof getCheckoutTemplate;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_updateCheckoutTemplate: typeof updateCheckoutTemplate;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplate = UpdateCheckoutTemplate;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplateOptions = UpdateCheckoutTemplateOptions;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_deleteCheckoutTemplate: typeof deleteCheckoutTemplate;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_queryCheckoutTemplates: typeof queryCheckoutTemplates;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplatesQueryResult = CheckoutTemplatesQueryResult;
    type ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplatesQueryBuilder = CheckoutTemplatesQueryBuilder;
    const ecomV1CheckoutTemplateCheckoutTemplates_universal_d_createCheckoutFromTemplate: typeof createCheckoutFromTemplate;
    namespace ecomV1CheckoutTemplateCheckoutTemplates_universal_d {
        export { ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplate as CheckoutTemplate, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Status as Status, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutCustomization as CheckoutCustomization, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_WebClientCustomization as WebClientCustomization, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_V1LineItem as V1LineItem, CatalogReference$1 as CatalogReference, CatalogOverrideFields$1 as CatalogOverrideFields, ProductName$1 as ProductName, DescriptionLine$1 as DescriptionLine, DescriptionLineValueOneOf$1 as DescriptionLineValueOneOf, DescriptionLineDescriptionLineValueOneOf$1 as DescriptionLineDescriptionLineValueOneOf, DescriptionLineName$1 as DescriptionLineName, PlainTextValue$1 as PlainTextValue, Color$1 as Color, DescriptionLineType$1 as DescriptionLineType, PhysicalProperties$1 as PhysicalProperties, CustomLineItem$1 as CustomLineItem, PriceDescription$1 as PriceDescription, ItemType$1 as ItemType, ItemTypeItemTypeDataOneOf$1 as ItemTypeItemTypeDataOneOf, ItemTypeItemType$1 as ItemTypeItemType, Scope$1 as Scope, Group$1 as Group, SubscriptionOptionInfo$2 as SubscriptionOptionInfo, SubscriptionSettings$2 as SubscriptionSettings, SubscriptionFrequency$2 as SubscriptionFrequency, Title$1 as Title, Description$1 as Description, SecuredMedia$1 as SecuredMedia, FileType$1 as FileType, PaymentOptionType$1 as PaymentOptionType, ServiceProperties$1 as ServiceProperties, ExtendedFields$1 as ExtendedFields, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutTemplateRequest as CreateCheckoutTemplateRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutTemplateResponse as CreateCheckoutTemplateResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_GetCheckoutTemplateRequest as GetCheckoutTemplateRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_GetCheckoutTemplateResponse as GetCheckoutTemplateResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplateRequest as UpdateCheckoutTemplateRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplateResponse as UpdateCheckoutTemplateResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_DeleteCheckoutTemplateRequest as DeleteCheckoutTemplateRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_DeleteCheckoutTemplateResponse as DeleteCheckoutTemplateResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_QueryCheckoutTemplatesRequest as QueryCheckoutTemplatesRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorQuery as CursorQuery, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Sorting as Sorting, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_SortOrder as SortOrder, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorPaging as CursorPaging, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_QueryCheckoutTemplatesResponse as QueryCheckoutTemplatesResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CursorPagingMetadata as CursorPagingMetadata, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Cursors as Cursors, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutFromTemplateRequest as CreateCheckoutFromTemplateRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateCheckoutFromTemplateResponse as CreateCheckoutFromTemplateResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplateUsed as CheckoutTemplateUsed, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_Checkout as Checkout, LineItem$2 as LineItem, MultiCurrencyPrice$1 as MultiCurrencyPrice, ItemTaxFullDetails$1 as ItemTaxFullDetails, TaxRateBreakdown$1 as TaxRateBreakdown, TaxBreakdown$1 as TaxBreakdown, JurisdictionType$1 as JurisdictionType, ItemAvailabilityInfo$1 as ItemAvailabilityInfo, ItemAvailabilityStatus$1 as ItemAvailabilityStatus, AddressWithContact$1 as AddressWithContact, Address$2 as Address, StreetAddress$1 as StreetAddress, AddressLocation$1 as AddressLocation, FullAddressContactDetails$1 as FullAddressContactDetails, VatId$2 as VatId, VatType$2 as VatType, ShippingInfo$1 as ShippingInfo, SelectedCarrierServiceOption$1 as SelectedCarrierServiceOption, DeliveryLogistics$1 as DeliveryLogistics, PickupDetails$2 as PickupDetails, PickupMethod$1 as PickupMethod, DeliveryTimeSlot$1 as DeliveryTimeSlot, SelectedCarrierServiceOptionPrices$1 as SelectedCarrierServiceOptionPrices, SelectedCarrierServiceOptionOtherCharge$1 as SelectedCarrierServiceOptionOtherCharge, ChargeType$1 as ChargeType, ShippingRegion$1 as ShippingRegion, CarrierServiceOption$1 as CarrierServiceOption, ShippingOption$1 as ShippingOption, ShippingPrice$1 as ShippingPrice, OtherCharge$1 as OtherCharge, BuyerInfo$3 as BuyerInfo, BuyerInfoIdOneOf$1 as BuyerInfoIdOneOf, PriceSummary$1 as PriceSummary, CalculationErrors$1 as CalculationErrors, CalculationErrorsShippingCalculationErrorOneOf$1 as CalculationErrorsShippingCalculationErrorOneOf, Details$1 as Details, DetailsKindOneOf$1 as DetailsKindOneOf, ApplicationError$3 as ApplicationError, ValidationError$1 as ValidationError, RuleType$1 as RuleType, FieldViolation$1 as FieldViolation, SystemError$1 as SystemError, CarrierErrors$1 as CarrierErrors, CarrierError$1 as CarrierError, GiftCard$2 as GiftCard, AppliedDiscount$1 as AppliedDiscount, AppliedDiscountDiscountSourceOneOf$1 as AppliedDiscountDiscountSourceOneOf, DiscountType$1 as DiscountType, Coupon$1 as Coupon, MerchantDiscount$1 as MerchantDiscount, DiscountRule$1 as DiscountRule, DiscountRuleName$1 as DiscountRuleName, LineItemDiscount$1 as LineItemDiscount, CustomField$1 as CustomField, WeightUnit$2 as WeightUnit, TaxSummary$1 as TaxSummary, TaxCalculationDetails$1 as TaxCalculationDetails, TaxCalculationDetailsCalculationDetailsOneOf$1 as TaxCalculationDetailsCalculationDetailsOneOf, RateType$1 as RateType, ManualCalculationReason$1 as ManualCalculationReason, AutoTaxFallbackCalculationDetails$1 as AutoTaxFallbackCalculationDetails, FallbackReason$1 as FallbackReason, AggregatedTaxBreakdown$1 as AggregatedTaxBreakdown, ChannelType$2 as ChannelType, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreatedBy as CreatedBy, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreatedByIdOneOf as CreatedByIdOneOf, MembershipOptions$1 as MembershipOptions, Membership$1 as Membership, MembershipName$2 as MembershipName, MembershipPaymentCredits$1 as MembershipPaymentCredits, InvalidMembership$1 as InvalidMembership, SelectedMemberships$1 as SelectedMemberships, SelectedMembership$1 as SelectedMembership, AdditionalFee$1 as AdditionalFee, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_ConversionInfo as ConversionInfo, Violation$1 as Violation, Severity$1 as Severity, Target$1 as Target, TargetTargetTypeOneOf$1 as TargetTargetTypeOneOf, NameInOther$1 as NameInOther, NameInLineItem$1 as NameInLineItem, Other$1 as Other, TargetLineItem$1 as TargetLineItem, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CustomSettings as CustomSettings, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CreateAndRedirectToCheckoutRequest as CreateAndRedirectToCheckoutRequest, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_RawHttpResponse as RawHttpResponse, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_HeadersEntry as HeadersEntry, DomainEvent$3 as DomainEvent, DomainEventBodyOneOf$3 as DomainEventBodyOneOf, EntityCreatedEvent$3 as EntityCreatedEvent, EntityUpdatedEvent$3 as EntityUpdatedEvent, EntityDeletedEvent$3 as EntityDeletedEvent, ActionEvent$3 as ActionEvent, MessageEnvelope$3 as MessageEnvelope, IdentificationData$3 as IdentificationData, IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf, WebhookIdentityType$3 as WebhookIdentityType, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_createCheckoutTemplate as createCheckoutTemplate, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_getCheckoutTemplate as getCheckoutTemplate, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_updateCheckoutTemplate as updateCheckoutTemplate, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplate as UpdateCheckoutTemplate, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_UpdateCheckoutTemplateOptions as UpdateCheckoutTemplateOptions, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_deleteCheckoutTemplate as deleteCheckoutTemplate, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_queryCheckoutTemplates as queryCheckoutTemplates, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplatesQueryResult as CheckoutTemplatesQueryResult, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_CheckoutTemplatesQueryBuilder as CheckoutTemplatesQueryBuilder, ecomV1CheckoutTemplateCheckoutTemplates_universal_d_createCheckoutFromTemplate as createCheckoutFromTemplate, };
    }
    interface OrderWithFulfillments {
        /** Order ID. */
        orderId?: string;
        /** Fulfillments associated with the order. */
        fulfillments?: Fulfillment$1[];
    }
    /** for now, this is a sub-object of Orders, so can refer to order line items by id. */
    interface Fulfillment$1 extends FulfillmentFulfillmentInfoOneOf {
        /** Tracking info. */
        trackingInfo?: FulfillmentTrackingInfo$1;
        /** Custom fulfillment info. */
        customInfo?: CustomFulfillmentInfo;
        /**
         * Fulfillment ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Fulfillment creation date and time in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * @readonly
         */
        _createdDate?: Date;
        /** Line items being fulfilled. */
        lineItems?: FulfillmentLineItem$1[];
        /**
         * Fulfillment status.
         *
         * Supported values:
         * + `"Pending"`
         * + `"Accepted"`
         * + `"Ready"`
         * + `"In_Delivery"`
         * + `"Fulfilled"`
         */
        status?: string | null;
        /** Fulfillment handling complete. */
        completed?: boolean | null;
    }
    /** @oneof */
    interface FulfillmentFulfillmentInfoOneOf {
        /** Tracking info. */
        trackingInfo?: FulfillmentTrackingInfo$1;
        /** Custom fulfillment info. */
        customInfo?: CustomFulfillmentInfo;
    }
    interface FulfillmentLineItem$1 {
        /** Line item ID (mirrors the ID of the order line item). */
        _id?: string;
        /**
         * Line item quantity.
         * * If this property isn't passed on creation, it defaults to the number of items not already linked to a fulfillment.
         * * If the order does not have the requested quantity of line items available to add to this fulfillment, the fulfillment will not be created and an error is returned.
         *
         * Min: `1`
         * Max: `100000`
         */
        quantity?: number | null;
    }
    interface FulfillmentTrackingInfo$1 {
        /** Shipping/delivery tracking number. */
        trackingNumber?: string | null;
        /**
         * Shipping provider. Using one of the following shipping providers will allow for auto-filling the tracking link:
         * * `'fedex'`
         * * `'ups'`
         * * `'usps'`
         * * `'dhl'`
         * * `'canadaPost'`
         */
        shippingProvider?: string | null;
        /** Tracking link. Auto-filled if a predefined shipping provider is used, otherwise provided on creation. */
        trackingLink?: string | null;
    }
    interface CustomFulfillmentInfo {
        /** Custom fulfillment info in key:value form. */
        fieldsData?: Record<string, string>;
    }
    interface FulfillmentCreated {
        /** Order ID (auto generated upon order creation). */
        orderId?: string;
        /** ID of the newly created fulfillment. */
        fulfillmentId?: string;
        /** Fulfillment creation date and time. */
        dateCreated?: Date;
        /** Buyer information. */
        buyerInfo?: BuyerInfo$2;
        /** Order fulfillment status. */
        fulfillmentStatus?: FulfillmentStatus$1;
        /** Fulfillment tracking information. */
        trackingInfo?: V2FulfillmentTrackingInfo;
    }
    /** Buyer Info */
    interface BuyerInfo$2 {
        /** Wix customer ID */
        _id?: string | null;
        /**
         * Deprecated (use identityType instead)
         * @readonly
         */
        type?: IdentityType$1;
        /** Customer type */
        identityType?: IdentityType$1;
        /**
         * Customer's first name
         * @readonly
         */
        firstName?: string;
        /**
         * Customer's last name
         * @readonly
         */
        lastName?: string;
        /**
         * Customer's phone number
         * @readonly
         */
        phone?: string | null;
        /**
         * Customer's email address
         * @readonly
         */
        email?: string;
    }
    enum IdentityType$1 {
        UNSPECIFIED_IDENTITY_TYPE = "UNSPECIFIED_IDENTITY_TYPE",
        /** Site member */
        MEMBER = "MEMBER",
        /** Contact */
        CONTACT = "CONTACT"
    }
    enum FulfillmentStatus$1 {
        /** None of the order items are fulfilled */
        NOT_FULFILLED = "NOT_FULFILLED",
        /**
         * All of the order items are fulfilled
         * Orders without shipping info are fulfilled automatically
         */
        FULFILLED = "FULFILLED",
        /** Order is canceled */
        CANCELED = "CANCELED",
        /** Some, but not all of the order items are fulfilled */
        PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED"
    }
    interface V2FulfillmentTrackingInfo {
        /** Tracking number. */
        trackingNumber?: string;
        /**
         * Shipping provider. Using the following shipping providers will allow for autofilling the tracking link:
         * * `fedex`
         * * `ups`
         * * `usps`
         * * `dhl`
         * * `canadaPost`
         */
        shippingProvider?: string;
        /** Tracking link - autofilled if using a predefined shipping provider, otherwise provided on creation. */
        trackingLink?: string | null;
    }
    interface FulfillmentUpdated {
        /** Order ID (auto generated upon order creation). */
        orderId?: string;
        /** ID of the updated fulfillment. */
        fulfillmentId?: string;
        /** Fulfillment tracking information. */
        trackingInfo?: V2FulfillmentTrackingInfo;
    }
    interface FulfillmentDeleted {
        /** Order ID (auto generated upon order creation). */
        orderId?: string;
        /** ID of the deleted fulfillment. */
        fulfillmentId?: string;
        /** Order fulfillment status. */
        fulfillmentStatus?: FulfillmentStatus$1;
    }
    interface ListFulfillmentsForSingleOrderRequest {
        /** Order ID for which to retrieve fulfillments. */
        orderId: string;
    }
    interface ListFulfillmentsForSingleOrderResponse {
        /** List of fulfillments associated with the order. */
        orderWithFulfillments?: OrderWithFulfillments;
    }
    interface ListFulfillmentsForMultipleOrdersRequest {
        /** List of order IDs for which to retrieve fulfillments. */
        orderIds: string[];
    }
    interface ListFulfillmentsForMultipleOrdersResponse {
        /** List of order IDs and their associated fulfillments. */
        ordersWithFulfillments?: OrderWithFulfillments[];
    }
    interface CreateFulfillmentRequest {
        /** Order ID. */
        orderId: string;
        /** Fulfillment info. */
        fulfillment: Fulfillment$1;
    }
    interface CreateFulfillmentResponse {
        /** Order ID and the orders' fulfillments. */
        orderWithFulfillments?: OrderWithFulfillments;
        /** ID of created fulfillment. */
        fulfillmentId?: string;
    }
    interface UpdateFulfillmentRequest {
        /** Order ID. */
        orderId: string;
        /** Fulfillment info to update. */
        fulfillment?: Fulfillment$1;
    }
    interface UpdateFulfillmentResponse {
        /** Order ID and the orders' associated fulfillments after update. */
        orderWithFulfillments?: OrderWithFulfillments;
    }
    interface DeleteFulfillmentRequest {
        /** Order ID. */
        orderId: string;
        /** ID of the fulfillment to delete. */
        fulfillmentId: string;
    }
    interface DeleteFulfillmentResponse {
        /** Order ID and the order's associated fulfillments after deletion. */
        orderWithFulfillments?: OrderWithFulfillments;
    }
    interface BulkCreateFulfillmentRequest {
        /** List of order IDs and their associated fulfillments' info. */
        ordersWithFulfillments: BulkCreateOrderWithFulfillments[];
    }
    interface BulkCreateOrderWithFulfillments {
        /** Order ID. */
        orderId?: string;
        /** Fulfillments associated with the order. */
        fulfillments?: Fulfillment$1[];
    }
    interface BulkCreateFulfillmentResponse {
        /** Items updated by bulk action. */
        results?: BulkOrderFulfillmentsResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$1;
    }
    interface BulkOrderFulfillmentsResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata$1;
        /** List of order IDs and their associated fulfillments. */
        ordersWithFulfillments?: OrderWithFulfillments;
    }
    interface ItemMetadata$1 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$2;
    }
    interface ApplicationError$2 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata$1 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
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
    }
    interface EntityUpdatedEvent$2 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$2 {
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
     * Retrieves fulfillments associated with a specified order.
     *
     *
     * The `listFulfillmentsForSingleOrder()` function returns a Promise that resolves when the fulfillments are retrieved.
     * @param orderId - Order ID for which to retrieve fulfillments.
     * @public
     * @requiredField orderId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     */
    function listFulfillmentsForSingleOrder(orderId: string): Promise<ListFulfillmentsForSingleOrderResponse>;
    /**
     * Retrieves fulfillments associated with multiple specified orders.
     *
     *
     * The `listFulfillmentsForMultipleOrders()` function returns a Promise that resolves when the fulfillments are retrieved.
     * @param orderIds - List of order IDs for which to retrieve fulfillments.
     * @public
     * @requiredField orderIds
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     */
    function listFulfillmentsForMultipleOrders(orderIds: string[]): Promise<ListFulfillmentsForMultipleOrdersResponse>;
    /**
     * Creates an order fulfillment.
     *
     *
     * The `createFulfillment()` function returns a Promise that resolves when the fulfillment is created.
     * @param orderId - Order ID.
     * @param fulfillment - Fulfillment info.
     * @public
     * @requiredField fulfillment
     * @requiredField fulfillment.lineItems
     * @requiredField fulfillment.lineItems._id
     * @requiredField orderId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function createFulfillment(orderId: string, fulfillment: Fulfillment$1): Promise<CreateFulfillmentResponse>;
    /**
     * Updates a fulfillment's properties.
     * To update a field's value, include the new value in the `fulfillment` field in the body params.
     * To remove a field's value, pass `null`.
     *
     *
     * The `updateFulfillment()` function returns a Promise that resolves when the fulfillment is updated.
     *
     * > **Note:** Updating line item IDs or fulfilled quantities is not allowed. To update line item IDs or quantities, delete the fulfillment and create it again.
     * @public
     * @requiredField identifiers
     * @requiredField identifiers.fulfillmentId
     * @requiredField identifiers.orderId
     * @param identifiers - Order and fulfillment IDs to be updated.
     * @param options - Available options to use when updating a fulfillment.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Order ID and the orders' associated fulfillments after update.
     */
    function updateFulfillment(identifiers: UpdateFulfillmentIdentifiers, options?: UpdateFulfillmentOptions): Promise<OrderWithFulfillments>;
    interface UpdateFulfillmentOptions {
        /** Fulfillment info. */
        fulfillment: {
            /** Tracking info. */
            trackingInfo?: FulfillmentTrackingInfo$1;
            /** Custom fulfillment info. */
            customInfo?: CustomFulfillmentInfo;
            /**
             * Fulfillment ID.
             * @readonly
             */
            _id?: string | null;
            /**
             * Fulfillment creation date and time in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
             * @readonly
             */
            _createdDate?: Date;
            /** Line items being fulfilled. */
            lineItems?: FulfillmentLineItem$1[];
            /**
             * Fulfillment status.
             *
             * Supported values:
             * + `"Pending"`
             * + `"Accepted"`
             * + `"Ready"`
             * + `"In_Delivery"`
             * + `"Fulfilled"`
             */
            status?: string | null;
            /** Fulfillment handling complete. */
            completed?: boolean | null;
        };
    }
    interface UpdateFulfillmentIdentifiers {
        /**
         * ID of the fulfillment to be updated.
         * @readonly
         */
        fulfillmentId?: string | null;
        /** Order ID. */
        orderId: string;
    }
    /**
     * Deletes an existing order fulfillment.
     *
     *
     * The `deleteFulfillment()` function returns a Promise that resolves when the fulfillment is deleted.
     * @public
     * @requiredField identifiers
     * @requiredField identifiers.fulfillmentId
     * @requiredField identifiers.orderId
     * @param identifiers - Order and fulfillment IDs.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteFulfillment(identifiers: DeleteFulfillmentIdentifiers): Promise<DeleteFulfillmentResponse>;
    interface DeleteFulfillmentIdentifiers {
        /** ID of the fulfillment to delete. */
        fulfillmentId: string;
        /** Order ID. */
        orderId: string;
    }
    /**
     * Creates multiple fulfillments for one or more orders.
     *
     *
     * The `bulkCreateFulfillments()` function returns a Promise that resolves when the fulfillments are created.
     * @param ordersWithFulfillments - List of order IDs and their associated fulfillments' info.
     * @public
     * @requiredField ordersWithFulfillments
     * @requiredField ordersWithFulfillments.fulfillments
     * @requiredField ordersWithFulfillments.fulfillments.lineItems
     * @requiredField ordersWithFulfillments.fulfillments.lineItems._id
     * @requiredField ordersWithFulfillments.orderId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkCreateFulfillments(ordersWithFulfillments: BulkCreateOrderWithFulfillments[]): Promise<BulkCreateFulfillmentResponse>;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_OrderWithFulfillments = OrderWithFulfillments;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentFulfillmentInfoOneOf = FulfillmentFulfillmentInfoOneOf;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_CustomFulfillmentInfo = CustomFulfillmentInfo;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentCreated = FulfillmentCreated;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_V2FulfillmentTrackingInfo = V2FulfillmentTrackingInfo;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentUpdated = FulfillmentUpdated;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentDeleted = FulfillmentDeleted;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForSingleOrderRequest = ListFulfillmentsForSingleOrderRequest;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForSingleOrderResponse = ListFulfillmentsForSingleOrderResponse;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForMultipleOrdersRequest = ListFulfillmentsForMultipleOrdersRequest;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForMultipleOrdersResponse = ListFulfillmentsForMultipleOrdersResponse;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_CreateFulfillmentRequest = CreateFulfillmentRequest;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_CreateFulfillmentResponse = CreateFulfillmentResponse;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentRequest = UpdateFulfillmentRequest;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentResponse = UpdateFulfillmentResponse;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_DeleteFulfillmentRequest = DeleteFulfillmentRequest;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_DeleteFulfillmentResponse = DeleteFulfillmentResponse;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_BulkCreateFulfillmentRequest = BulkCreateFulfillmentRequest;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_BulkCreateOrderWithFulfillments = BulkCreateOrderWithFulfillments;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_BulkCreateFulfillmentResponse = BulkCreateFulfillmentResponse;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_BulkOrderFulfillmentsResult = BulkOrderFulfillmentsResult;
    const ecomV1FulfillmentsOrderFulfillments_universal_d_listFulfillmentsForSingleOrder: typeof listFulfillmentsForSingleOrder;
    const ecomV1FulfillmentsOrderFulfillments_universal_d_listFulfillmentsForMultipleOrders: typeof listFulfillmentsForMultipleOrders;
    const ecomV1FulfillmentsOrderFulfillments_universal_d_createFulfillment: typeof createFulfillment;
    const ecomV1FulfillmentsOrderFulfillments_universal_d_updateFulfillment: typeof updateFulfillment;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentOptions = UpdateFulfillmentOptions;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentIdentifiers = UpdateFulfillmentIdentifiers;
    const ecomV1FulfillmentsOrderFulfillments_universal_d_deleteFulfillment: typeof deleteFulfillment;
    type ecomV1FulfillmentsOrderFulfillments_universal_d_DeleteFulfillmentIdentifiers = DeleteFulfillmentIdentifiers;
    const ecomV1FulfillmentsOrderFulfillments_universal_d_bulkCreateFulfillments: typeof bulkCreateFulfillments;
    namespace ecomV1FulfillmentsOrderFulfillments_universal_d {
        export { ecomV1FulfillmentsOrderFulfillments_universal_d_OrderWithFulfillments as OrderWithFulfillments, Fulfillment$1 as Fulfillment, ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentFulfillmentInfoOneOf as FulfillmentFulfillmentInfoOneOf, FulfillmentLineItem$1 as FulfillmentLineItem, FulfillmentTrackingInfo$1 as FulfillmentTrackingInfo, ecomV1FulfillmentsOrderFulfillments_universal_d_CustomFulfillmentInfo as CustomFulfillmentInfo, ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentCreated as FulfillmentCreated, BuyerInfo$2 as BuyerInfo, IdentityType$1 as IdentityType, FulfillmentStatus$1 as FulfillmentStatus, ecomV1FulfillmentsOrderFulfillments_universal_d_V2FulfillmentTrackingInfo as V2FulfillmentTrackingInfo, ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentUpdated as FulfillmentUpdated, ecomV1FulfillmentsOrderFulfillments_universal_d_FulfillmentDeleted as FulfillmentDeleted, ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForSingleOrderRequest as ListFulfillmentsForSingleOrderRequest, ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForSingleOrderResponse as ListFulfillmentsForSingleOrderResponse, ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForMultipleOrdersRequest as ListFulfillmentsForMultipleOrdersRequest, ecomV1FulfillmentsOrderFulfillments_universal_d_ListFulfillmentsForMultipleOrdersResponse as ListFulfillmentsForMultipleOrdersResponse, ecomV1FulfillmentsOrderFulfillments_universal_d_CreateFulfillmentRequest as CreateFulfillmentRequest, ecomV1FulfillmentsOrderFulfillments_universal_d_CreateFulfillmentResponse as CreateFulfillmentResponse, ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentRequest as UpdateFulfillmentRequest, ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentResponse as UpdateFulfillmentResponse, ecomV1FulfillmentsOrderFulfillments_universal_d_DeleteFulfillmentRequest as DeleteFulfillmentRequest, ecomV1FulfillmentsOrderFulfillments_universal_d_DeleteFulfillmentResponse as DeleteFulfillmentResponse, ecomV1FulfillmentsOrderFulfillments_universal_d_BulkCreateFulfillmentRequest as BulkCreateFulfillmentRequest, ecomV1FulfillmentsOrderFulfillments_universal_d_BulkCreateOrderWithFulfillments as BulkCreateOrderWithFulfillments, ecomV1FulfillmentsOrderFulfillments_universal_d_BulkCreateFulfillmentResponse as BulkCreateFulfillmentResponse, ecomV1FulfillmentsOrderFulfillments_universal_d_BulkOrderFulfillmentsResult as BulkOrderFulfillmentsResult, ItemMetadata$1 as ItemMetadata, ApplicationError$2 as ApplicationError, BulkActionMetadata$1 as BulkActionMetadata, DomainEvent$2 as DomainEvent, DomainEventBodyOneOf$2 as DomainEventBodyOneOf, EntityCreatedEvent$2 as EntityCreatedEvent, EntityUpdatedEvent$2 as EntityUpdatedEvent, EntityDeletedEvent$2 as EntityDeletedEvent, ActionEvent$2 as ActionEvent, MessageEnvelope$2 as MessageEnvelope, IdentificationData$2 as IdentificationData, IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf, WebhookIdentityType$2 as WebhookIdentityType, ecomV1FulfillmentsOrderFulfillments_universal_d_listFulfillmentsForSingleOrder as listFulfillmentsForSingleOrder, ecomV1FulfillmentsOrderFulfillments_universal_d_listFulfillmentsForMultipleOrders as listFulfillmentsForMultipleOrders, ecomV1FulfillmentsOrderFulfillments_universal_d_createFulfillment as createFulfillment, ecomV1FulfillmentsOrderFulfillments_universal_d_updateFulfillment as updateFulfillment, ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentOptions as UpdateFulfillmentOptions, ecomV1FulfillmentsOrderFulfillments_universal_d_UpdateFulfillmentIdentifiers as UpdateFulfillmentIdentifiers, ecomV1FulfillmentsOrderFulfillments_universal_d_deleteFulfillment as deleteFulfillment, ecomV1FulfillmentsOrderFulfillments_universal_d_DeleteFulfillmentIdentifiers as DeleteFulfillmentIdentifiers, ecomV1FulfillmentsOrderFulfillments_universal_d_bulkCreateFulfillments as bulkCreateFulfillments, };
    }
    interface OrderTransactions {
        /** Order ID. */
        orderId?: string;
        /** Record of payments made to the merchant. */
        payments?: Payment[];
        /** Record of refunds made to the buyer. */
        refunds?: Refund[];
    }
    interface Payment extends PaymentPaymentDetailsOneOf {
        /** Regular payment details. */
        regularPaymentDetails?: RegularPaymentDetails;
        /** Gift card payment details. */
        giftcardPaymentDetails?: GiftCardPaymentDetails;
        /**
         * Payment ID.
         * @readonly
         */
        _id?: string | null;
        /** Date and time the payment was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. Defaults to current time when not provided. */
        _createdDate?: Date;
        /**
         * Date and time the payment was last updated in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format.
         * @readonly
         */
        _updatedDate?: Date;
        /** Payment amount. */
        amount?: Price;
        /**
         * Whether refunds for this payment are disabled.
         * + `true`: This payment is not refundable.
         * + `false`: This payment may be refunded. However, this ultimately depends on the payment provider.
         */
        refundDisabled?: boolean;
    }
    /** @oneof */
    interface PaymentPaymentDetailsOneOf {
        /** Regular payment details. */
        regularPaymentDetails?: RegularPaymentDetails;
        /** Gift card payment details. */
        giftcardPaymentDetails?: GiftCardPaymentDetails;
    }
    interface RegularPaymentDetails {
        /** Wix Payments order ID. */
        paymentOrderId?: string | null;
        /**
         * Payment gateway's transaction ID. This ID can be used with the Wix Payments [Transactions API](https://dev.wix.com/docs/rest/api-reference/wix-payments/transactions/introduction).
         * This field is only returned when the value of `offline_payment` is `false`.
         */
        gatewayTransactionId?: string | null;
        /**
         * Payment method. Non-exhaustive list of supported values:
         * + `CreditCard`, `Alipay`, `AstropayCash`, `AstropayDBT`, `AstropayMBT`, `Bitcoin`, `BitPay`, `Cash`, `ConvenienceStore`, `EPay`, `Fake`, `Giropay`, `IDeal`, `InPerson`, `Klarna`, `MercadoPago`, `Netpay`, `NordeaSolo`, `Offline`, `PagSeguro`, `PayEasy`, `PayPal`, `Paysafecard`, `Paysafecash`, `PointOfSale`, `Poli`, `Privat24`, `Przelewy24`, `RapidTransfer`, `Sepa`, `Skrill`, `Sofort`, `Trustly`, `Neteller`, `Unionpay`, `UniPay`, `Yandex`
         */
        paymentMethod?: string | null;
        /** Transaction ID in the payment provider's system. For example, at PayPal, Square, Stripe, etc. Not returned for offline payments. */
        providerTransactionId?: string | null;
        /** Whether the payment was made offline. For example, when using cash or when marked as paid in the Business Manager. */
        offlinePayment?: boolean;
        /** Payment status. */
        status?: TransactionStatus;
        /** Whether there is a payment agreement that allows for future charges. */
        savedPaymentMethod?: boolean;
    }
    enum TransactionStatus {
        UNDEFINED = "UNDEFINED",
        APPROVED = "APPROVED",
        PENDING = "PENDING",
        PENDING_MERCHANT = "PENDING_MERCHANT",
        CANCELED = "CANCELED",
        DECLINED = "DECLINED",
        REFUNDED = "REFUNDED",
        PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
        AUTHORIZED = "AUTHORIZED",
        VOIDED = "VOIDED"
    }
    interface GiftCardPaymentDetails {
        /** Gift card payment ID. */
        giftCardPaymentId?: string;
        /** ID of the app that created the gift card. */
        appId?: string;
        /**
         * Whether the gift card is voided.
         * @readonly
         */
        voided?: boolean;
    }
    interface MembershipPaymentDetails {
        /** Membership ID. */
        membershipId?: string;
        /** ID of the line item this membership applies to. */
        lineItemId?: string;
        /** Payment status. */
        status?: MembershipPaymentStatus;
        /** Membership name. */
        name?: MembershipName$1;
        /** The transaction ID in the membership system. Can be used to void the transaction. */
        externalTransactionId?: string | null;
        /**
         * Whether the membership is voided.
         * @readonly
         */
        voided?: boolean;
        /** ID of the application providing this payment option. */
        providerAppId?: string;
    }
    enum MembershipPaymentStatus {
        /** CHARGED - Payment was charged */
        CHARGED = "CHARGED",
        /** CHARGE_FAILED - The attempt to charge that payment have failed, for example due to lack of credits */
        CHARGE_FAILED = "CHARGE_FAILED"
    }
    interface MembershipName$1 {
        /** The name of this membership */
        original?: string;
        /** Optional - Translated name of this membership. Defaults to `original` when not provided. */
        translated?: string | null;
    }
    interface Price {
        /** Amount. */
        amount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
    }
    interface Refund {
        /**
         * Refund ID.
         * @readonly
         */
        _id?: string;
        /** List of transactions. */
        transactions?: RefundTransaction[];
        /** Refund business details. */
        details?: RefundDetails;
        /** Date and time the refund was created in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. Defaults to current time when not provided. */
        _createdDate?: Date;
    }
    interface RefundTransaction {
        /** ID of the payment associated with this refund. */
        paymentId?: string;
        /** Refund amount. */
        amount?: Price;
        /** Refund status. */
        refundStatus?: RefundStatus;
        /**
         * Payment gateway's refund ID. This ID can be used with the Wix Payments [Transactions API](https://dev.wix.com/docs/rest/api-reference/wix-payments/transactions/introduction).
         * This field is only returned when the value of `external_refund` is `false`.
         */
        gatewayRefundId?: string | null;
        /** ID of the refund in the payment provider's system. For example, at PayPal, Square, Stripe, etc. Not returned for external refunds. */
        providerRefundId?: string | null;
        /** Whether refund was made externally and manually on the payment provider's side. */
        externalRefund?: boolean;
    }
    enum RefundStatus {
        PENDING = "PENDING",
        SUCCEEDED = "SUCCEEDED",
        FAILED = "FAILED"
    }
    /** Business model of a refund request */
    interface RefundDetails {
        /** Order line item IDs and quantities that were refunded. */
        items?: RefundItem[];
        /** Whether the shipping fee was also refunded. */
        shippingIncluded?: boolean;
        /** Reason for the refund, provided by customer (optional). */
        reason?: string | null;
    }
    interface RefundItem {
        /** Line item ID the refunded line item. */
        lineItemId?: string;
        /** Line item quantity refunded. */
        quantity?: number;
    }
    interface SnapshotMessage {
        _id?: string;
        opType?: number;
    }
    interface IndexingMessage {
        _id?: string;
        opType?: number;
        requiredVersions?: string[];
    }
    interface DiffmatokyPayload {
        left?: string;
        right?: string;
        compareChannel?: string;
        entityId?: string;
        errorInformation?: ErrorInformation;
        tags?: string[];
    }
    interface ErrorInformation {
        stackTrace?: string;
    }
    interface OrderRefunded {
        /**
         * Refund ID.
         * @readonly
         */
        refundId?: string;
        /**
         * Refunded order data.
         * @readonly
         */
        order?: Order;
    }
    interface Order {
        /**
         * Order ID (auto-generated upon order creation).
         * @readonly
         */
        _id?: string | null;
        /**
         * Order number displayed in the owner's store (auto-generated).
         * @readonly
         */
        number?: number;
        /**
         * Order creation date and time.
         * @readonly
         */
        dateCreated?: Date;
        /** Buyer information. */
        buyerInfo?: BuyerInfo$1;
        /** Currency used for the pricing of this order in [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes) format. */
        currency?: string | null;
        /** Weight unit used in this store. */
        weightUnit?: WeightUnit$1;
        /** Totals for order's line items. */
        totals?: Totals;
        /** Billing information. */
        billingInfo?: BillingInfo;
        /** Shipping information. */
        shippingInfo?: ShippingInfo;
        /** A note added by the buyer. */
        buyerNote?: string | null;
        /**
         * Deprecated.
         * @readonly
         */
        read?: boolean;
        /**
         * Whether or not the order was archived.
         * @readonly
         */
        archived?: boolean;
        /** Current status of the payment. */
        paymentStatus?: PaymentStatus;
        /**
         * Order's current fulfillment status (whether the order received a tracking number or was delivered/picked up).
         * @readonly
         */
        fulfillmentStatus?: FulfillmentStatus;
        /** Line items ordered. */
        lineItems?: LineItem$1[];
        /**
         * Log of updates related to the order.
         * @readonly
         */
        activities?: Activity[];
        /** Invoice information. */
        invoiceInfo?: V2InvoiceInfo;
        /**
         * Order fulfillment information.
         * @readonly
         */
        fulfillments?: Fulfillment[];
        /** Discount information. */
        discount?: Discount;
        /** Custom field information. */
        customField?: CustomField;
        /** Shopping cart ID. */
        cartId?: string | null;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         */
        buyerLanguage?: string | null;
        /** Information about the sales channel that submitted this order. */
        channelInfo?: ChannelInfo;
        /**
         * Identity of the order's initiator.
         * @readonly
         */
        enteredBy?: EnteredBy;
        /**
         * Date and time of latest update.
         * @readonly
         */
        lastUpdated?: Date;
        /** Subscription information. */
        subscriptionInfo?: SubscriptionInfo;
        /**
         * Order’s unique numeric ID.
         * Primarily used for sorting and filtering when crawling all orders.
         * @readonly
         */
        numericId?: string;
        /**
         * Refund information.
         * @readonly
         */
        refunds?: V2Refund[];
    }
    /** Buyer Info */
    interface BuyerInfo$1 {
        /** Wix customer ID */
        _id?: string | null;
        /**
         * Deprecated (use identityType instead)
         * @readonly
         */
        type?: IdentityType;
        /** Customer type */
        identityType?: IdentityType;
        /**
         * Customer's first name
         * @readonly
         */
        firstName?: string;
        /**
         * Customer's last name
         * @readonly
         */
        lastName?: string;
        /**
         * Customer's phone number
         * @readonly
         */
        phone?: string | null;
        /**
         * Customer's email address
         * @readonly
         */
        email?: string;
    }
    enum IdentityType {
        UNSPECIFIED_IDENTITY_TYPE = "UNSPECIFIED_IDENTITY_TYPE",
        /** Site member */
        MEMBER = "MEMBER",
        /** Contact */
        CONTACT = "CONTACT"
    }
    enum WeightUnit$1 {
        /** Weight unit can't be classified, due to an error */
        UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
        /** Kilograms */
        KG = "KG",
        /** Pounds */
        LB = "LB"
    }
    interface Totals {
        /** Subtotal of all the line items, before tax. */
        subtotal?: string;
        /** Total shipping price, before tax. */
        shipping?: string | null;
        /** Total tax. */
        tax?: string | null;
        /** Total calculated discount value. */
        discount?: string | null;
        /** Total price charged. */
        total?: string;
        /**
         * Total items weight.
         * @readonly
         */
        weight?: string;
        /**
         * Total number of line items.
         * @readonly
         */
        quantity?: number;
        /**
         * Total refund.
         * @readonly
         */
        refund?: string | null;
        /** Total calculated gift card value. */
        giftCard?: string | null;
    }
    interface BillingInfo {
        /** Payment method used for this order */
        paymentMethod?: string | null;
        /**
         * Deprecated (use paymentProviderTransactionId instead)
         * @readonly
         */
        externalTransactionId?: string | null;
        /** Transaction ID from payment provider (e.g., PayPal, Square, Stripe) transaction ID */
        paymentProviderTransactionId?: string | null;
        /** Transaction ID from payment gateway (e.g., Wix Payments) */
        paymentGatewayTransactionId?: string | null;
        /** Full billing address */
        address?: Address$1;
        /**
         * Payment date
         * @readonly
         */
        paidDate?: Date;
        /** Whether order can be refunded by payment provider (manually or automatic) */
        refundableByPaymentProvider?: boolean | null;
    }
    interface Address$1 extends AddressAddressLine1OptionsOneOf {
        /** Address line 1 (free text) */
        addressLine1?: string;
        /** Address line 1 (street) */
        street?: Street;
        /** Addressee name */
        fullName?: FullName;
        /** Country code (2 letters) */
        country?: string | null;
        /** State or district */
        subdivision?: string | null;
        /** City name */
        city?: string | null;
        /** ZIP/postal code */
        zipCode?: string | null;
        /** Phone number */
        phone?: string | null;
        /** Company name */
        company?: string | null;
        /** Email address */
        email?: string | null;
        /** address line */
        addressLine2?: string | null;
        /** Tax information (for Brazil only) */
        vatId?: VatId$1;
    }
    /** @oneof */
    interface AddressAddressLine1OptionsOneOf {
        /** Address line 1 (free text) */
        addressLine1?: string;
        /** Address line 1 (street) */
        street?: Street;
    }
    interface FullName {
        /** Customer's first name */
        firstName?: string;
        /** Customer's last name */
        lastName?: string;
    }
    interface Street {
        /** Street number */
        number?: string;
        /** Street name */
        name?: string;
    }
    interface VatId$1 {
        /** Customer's tax ID. */
        number?: string;
        /**
         * Tax type.
         * + `CPF`: For individual tax payers.
         * + `CNPJ`: For corporations.
         */
        type?: VatType$1;
    }
    /** Brazilian tax info types */
    enum VatType$1 {
        /** When the tax info type can't be classified, due to an error */
        UNSPECIFIED_TAX_TYPE = "UNSPECIFIED_TAX_TYPE",
        /** CPF - for individual tax payers */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface ShippingInfo extends ShippingInfoDetailsOneOf {
        /** Shipment details (when this object describes shipment). */
        shipmentDetails?: ShipmentDetails;
        /** Pickup details (when this object describes pickup). */
        pickupDetails?: PickupDetails$1;
        /** Shipping option name. */
        deliveryOption?: string;
        /** Shipping option delivery time. */
        estimatedDeliveryTime?: string | null;
        /** Deprecated - Latest expected delivery date. */
        deliverByDate?: Date;
        /** Shipping region. */
        shippingRegion?: string | null;
        /**
         * Unique code of provided shipping option. For example, `"usps_std_overnight"`.
         * @readonly
         */
        code?: string | null;
    }
    /** @oneof */
    interface ShippingInfoDetailsOneOf {
        /** Shipment details (when this object describes shipment). */
        shipmentDetails?: ShipmentDetails;
        /** Pickup details (when this object describes pickup). */
        pickupDetails?: PickupDetails$1;
    }
    interface ShipmentDetails {
        /** Shipping destination address. */
        address?: Address$1;
        /**
         * Deprecated (use fulfillments instead).
         * @readonly
         */
        trackingInfo?: TrackingInfo;
        /** Discount applied for shipping. */
        discount?: string | null;
        /** Tax applied for shipping. */
        tax?: string | null;
        /** Price data. */
        priceData?: ShippingPriceData;
    }
    interface TrackingInfo {
        /**
         * Tracking number
         * @readonly
         */
        trackingNumber?: string | null;
        /**
         * Shipping provider
         * @readonly
         */
        shippingProvider?: string | null;
        /**
         * Tracking link
         * @readonly
         */
        trackingLink?: string | null;
    }
    interface ShippingPriceData {
        /** Whether tax is included in the price. */
        taxIncludedInPrice?: boolean;
        /** Shipping price. */
        price?: string | null;
    }
    interface PickupDetails$1 {
        /** Pickup address. */
        pickupAddress?: PickupAddress;
        /**
         * Deprecated (use billingInfo instead).
         * @readonly
         */
        buyerDetails?: BuyerDetails;
        /** Store owner's pickup instructions. */
        pickupInstructions?: string | null;
    }
    interface PickupAddress {
        /** Country code (3 letters) */
        country?: string;
        /** State/District */
        subdivision?: string | null;
        /** Address */
        addressLine1?: string;
        /** City */
        city?: string;
        /** ZIP/postal code */
        zipCode?: string;
    }
    interface BuyerDetails {
        /** Addressee name */
        fullName?: FullName;
        /** Email address */
        email?: string;
        /** Phone number */
        phone?: string;
    }
    /** This might be extended in the future with pending orders statuses */
    enum PaymentStatus {
        /** Payment status can't be classified, due to an error */
        UNSPECIFIED_PAYMENT_STATUS = "UNSPECIFIED_PAYMENT_STATUS",
        /** Order is pending response from the payment provider */
        PENDING = "PENDING",
        /** Order is marked as not paid, and can be marked as paid later on. This is relevant for POS and offline orders */
        NOT_PAID = "NOT_PAID",
        /** The order is marked as paid */
        PAID = "PAID",
        /** Order was refunded, refund amount less than order total price */
        PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
        /** Full order total price was refunded */
        FULLY_REFUNDED = "FULLY_REFUNDED",
        /** At least one payment was received and approved, covering less than total price amount */
        PARTIALLY_PAID = "PARTIALLY_PAID"
    }
    enum FulfillmentStatus {
        /** None of the order items are fulfilled */
        NOT_FULFILLED = "NOT_FULFILLED",
        /**
         * All of the order items are fulfilled
         * Orders without shipping info are fulfilled automatically
         */
        FULFILLED = "FULFILLED",
        /** Order is canceled */
        CANCELED = "CANCELED",
        /** Some, but not all of the order items are fulfilled */
        PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED"
    }
    interface LineItem$1 {
        /**
         * Line item ID (auto-generated, stable within this order only)
         * @readonly
         */
        index?: number | null;
        /** Line item quantity */
        quantity?: number;
        /**
         * Deprecated (use priceData instead)
         * @readonly
         */
        price?: string | null;
        /** Line item name */
        name?: string | null;
        /** Product name, translated into the customer's language */
        translatedName?: string | null;
        /** Line item product ID (optional for POS orders) */
        productId?: string | null;
        /**
         * Deprecated (use priceData instead)
         * @readonly
         */
        totalPrice?: string | null;
        /** Line item type (may be extended) */
        lineItemType?: LineItemType;
        /** Line item options ordered */
        options?: OptionSelection[];
        /** Line item custom text field entry */
        customTextFields?: CustomTextFieldSelection[];
        /** Line item weight */
        weight?: string | null;
        /** Primary media for preview of the line item */
        mediaItem?: MediaItem;
        /** Line item SKU */
        sku?: string | null;
        /** Line item notes */
        notes?: string | null;
        /** Line item variantId (from Stores Catalog) */
        variantId?: string | null;
        /** Line item fulfillerId from stores fulfillers. No value equals self fulfilled */
        fulfillerId?: string | null;
        /** Discount applied for this line item */
        discount?: string | null;
        /** Tax applied for this line item */
        tax?: string | null;
        /**
         * Deprecated (use priceData instead)
         * @readonly
         */
        taxIncludedInPrice?: boolean;
        /** Tax group ID */
        taxGroupId?: string | null;
        /** Price data */
        priceData?: LineItemPriceData;
    }
    enum LineItemType {
        /** Line item type can't be classified, due to an error */
        UNSPECIFIED_LINE_ITEM_TYPE = "UNSPECIFIED_LINE_ITEM_TYPE",
        /** Physical item type */
        PHYSICAL = "PHYSICAL",
        /** Digital item type */
        DIGITAL = "DIGITAL",
        /** Custom item price */
        CUSTOM_AMOUNT_ITEM = "CUSTOM_AMOUNT_ITEM"
    }
    interface OptionSelection {
        /** Option name */
        option?: string;
        /** Selected choice for this option */
        selection?: string;
    }
    interface CustomTextFieldSelection {
        /** Custom text field name */
        title?: string;
        /** Custom text field value */
        value?: string;
    }
    interface MediaItem {
        /**
         * Media type
         * @readonly
         */
        mediaType?: MediaItemType;
        /**
         * Media URL
         * @readonly
         */
        url?: string;
        /**
         * Media item width
         * @readonly
         */
        width?: number;
        /**
         * Media item height
         * @readonly
         */
        height?: number;
        /** Deprecated */
        mediaId?: string | null;
        /** Media ID (for media items previously saved in Wix Media) */
        _id?: string | null;
        /** Media external URL */
        externalImageUrl?: string | null;
        /** Alternative text for presentation when media cannot be displayed */
        altText?: string | null;
    }
    enum MediaItemType {
        /** Media item type can't be classified, due to an error */
        UNSPECIFIED_MEDIA_TYPE_ITEM = "UNSPECIFIED_MEDIA_TYPE_ITEM",
        /** Image item type */
        IMAGE = "IMAGE"
    }
    interface LineItemPriceData {
        /** Whether tax is included in the price set for this line item */
        taxIncludedInPrice?: boolean;
        /** Line item price */
        price?: string;
        /**
         * Total price charged to the customer (per line item) after computation of quantity and discount
         * @readonly
         */
        totalPrice?: string | null;
    }
    interface DigitalFile {
        /** id of the secure file in media */
        fileId?: string;
    }
    interface Activity {
        /**
         * Activity item type
         * @readonly
         */
        type?: ActivityType;
        /**
         * Activity item author
         * @readonly
         */
        author?: string | null;
        /**
         * Comment added to activity item
         * @readonly
         */
        message?: string | null;
        /**
         * Activity item timestamp
         * @readonly
         */
        timestamp?: Date;
    }
    enum ActivityType {
        /** Activity item type can't be classified, due to an error */
        UNSPECIFIED_ORDER_HISTORY_ITEM_TYPE = "UNSPECIFIED_ORDER_HISTORY_ITEM_TYPE",
        /** Store owner added a comment */
        MERCHANT_COMMENT = "MERCHANT_COMMENT",
        /** Order placed */
        ORDER_PLACED = "ORDER_PLACED",
        /** Order marked as paid, either by the store owner (for offline orders), or when an online transaction was confirmed */
        ORDER_PAID = "ORDER_PAID",
        /** Order shipping status set as fulfilled */
        ORDER_FULFILLED = "ORDER_FULFILLED",
        /** Order shipping status set as not fulfilled */
        ORDER_NOT_FULFILLED = "ORDER_NOT_FULFILLED",
        /** A download link was sent (relevant for orders with digital line items) */
        DOWNLOAD_LINK_SENT = "DOWNLOAD_LINK_SENT",
        /** An email notification for pickup was sent */
        PICKUP_READY_EMAIL_SENT = "PICKUP_READY_EMAIL_SENT",
        /** Shipping tracking number was set */
        TRACKING_NUMBER_ADDED = "TRACKING_NUMBER_ADDED",
        /** Shipping tracking number was edited */
        TRACKING_NUMBER_EDITED = "TRACKING_NUMBER_EDITED",
        /** Shipping tracking link was set */
        TRACKING_LINK_WAS_SET = "TRACKING_LINK_WAS_SET",
        /** An email confirmation of order shipment was sent */
        SHIPPING_CONFIRMATION_EMAIL_SENT = "SHIPPING_CONFIRMATION_EMAIL_SENT",
        /** Invoice was set in the order */
        INVOICE_WAS_SET = "INVOICE_WAS_SET",
        /** Invoice was removed from the order */
        INVOICE_WAS_REMOVED = "INVOICE_WAS_REMOVED",
        /** Invoice was sent to customer via email */
        INVOICE_WAS_SENT = "INVOICE_WAS_SENT",
        /** Email was sent to fulfiller */
        FULFILLER_EMAIL_SENT = "FULFILLER_EMAIL_SENT",
        /** Shipping address was updated */
        SHIPPING_ADDRESS_EDITED = "SHIPPING_ADDRESS_EDITED",
        /** Order email was updated */
        EMAIL_EDITED = "EMAIL_EDITED",
        /** Order partially paid. During the checkout for orders with deposit items. */
        ORDER_PARTIALLY_PAID = "ORDER_PARTIALLY_PAID"
    }
    interface V2InvoiceInfo {
        /** Invoice ID */
        _id?: string;
        /** Invoice source */
        source?: InvoiceSource;
    }
    enum InvoiceSource {
        /** Invoice source can't be classified, due to an error */
        UNSPECIFIED_INVOICE_SOURCE = "UNSPECIFIED_INVOICE_SOURCE",
        /** Invoice created using the Invoices API */
        WIX = "WIX"
    }
    interface Fulfillment {
        /**
         * Fulfillment ID (auto generated upon fulfillment creation).
         * @readonly
         */
        _id?: string | null;
        /**
         * Fulfillment creation date and time.
         * @readonly
         */
        dateCreated?: Date;
        /** Information about the line items in the fulfilled order. */
        lineItems?: FulfillmentLineItem[];
        /** Tracking information. */
        trackingInfo?: FulfillmentTrackingInfo;
    }
    interface FulfillmentLineItem {
        /** Line item ID (mirrors the line item index of the order). */
        index?: number;
        /**
         * Line item quantity.
         * On creation, if this parameter isn't passed, the new fulfillment will automatically include all items of this line item that have not already been linked to a fulfillment.
         * If the order does not have the requested quantity of line items available to add to this fulfillment, the fulfillment will not be created and an error will be returned.
         * This property will always have a value when returned.
         */
        quantity?: number | null;
    }
    interface FulfillmentTrackingInfo {
        /** Tracking number. */
        trackingNumber?: string;
        /**
         * Shipping provider. Using the following shipping providers will allow for autofilling the tracking link:
         * * `fedex`
         * * `ups`
         * * `usps`
         * * `dhl`
         * * `canadaPost`
         */
        shippingProvider?: string;
        /** Tracking link - autofilled if using a predefined shipping provider, otherwise provided on creation. */
        trackingLink?: string | null;
    }
    interface Discount {
        /**
         * Deprecated (use Totals.discount instead)
         * @readonly
         */
        value?: string;
        /** Applied coupon */
        appliedCoupon?: AppliedCoupon;
    }
    interface AppliedCoupon {
        /** Coupon ID */
        couponId?: string;
        /** Coupon name */
        name?: string;
        /** Coupon code */
        code?: string;
    }
    /** Custom field */
    interface CustomField {
        /** Free text that the customer entered in the custom field during the checkout process */
        value?: string;
        /** Title for the custom field */
        title?: string;
        /** The title translated according to the buyer language */
        translatedTitle?: string;
    }
    interface ChannelInfo {
        /** Sales channel that submitted the order */
        type?: ChannelType$1;
        /** Reference to an order ID from an external system, as defined in channelInfo (e.g., eBay or Amazon) */
        externalOrderId?: string | null;
        /** URL to the order in the external system, as defined in channelInfo (e.g., eBay or Amazon) */
        externalOrderUrl?: string | null;
    }
    enum ChannelType$1 {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        POS = "POS",
        EBAY = "EBAY",
        AMAZON = "AMAZON",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE",
        WIX_INVOICES = "WIX_INVOICES",
        BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
        WISH = "WISH",
        CLASS_PASS = "CLASS_PASS",
        GLOBAL_E = "GLOBAL_E",
        FACEBOOK = "FACEBOOK",
        ETSY = "ETSY",
        TIKTOK = "TIKTOK",
        FAIRE_COM = "FAIRE_COM"
    }
    interface EnteredBy {
        _id?: string;
        identityType?: EnteredByIdentityType;
    }
    enum EnteredByIdentityType {
        USER = "USER",
        MEMBER = "MEMBER",
        CONTACT = "CONTACT",
        APP = "APP"
    }
    interface SubscriptionInfo {
        /** Subscription ID. */
        _id?: string | null;
        /** Current cycle number. For example, if the subscription is in the 3rd month of a 4-month subscription, the value will be `3`. */
        cycleNumber?: number;
        /** Subscription settings. */
        subscriptionSettings?: SubscriptionSettings$1;
        /** Subscription options info. */
        subscriptionOptionInfo?: SubscriptionOptionInfo$1;
    }
    interface SubscriptionSettings$1 {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency$1;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal: true`. */
        billingCycles?: number | null;
    }
    /** Frequency unit of recurring payment */
    enum SubscriptionFrequency$1 {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface SubscriptionOptionInfo$1 {
        /** Subscription option title. */
        title?: string;
        /** Subscription option description. */
        description?: string | null;
    }
    interface V2Refund {
        /** Refund created timestamp. */
        dateCreated?: Date;
        /** Refund amount. */
        amount?: string;
        /** Reason for refund, given by user (optional). */
        reason?: string | null;
        /** Payment provider transaction ID. Used to find refund transaction info on the payment provider's side. */
        paymentProviderTransactionId?: string | null;
        /** Refund ID. */
        _id?: string;
        /** Whether refund was made externally (on the payment provider's side). */
        externalRefund?: boolean;
    }
    interface GiftCard$1 {
        transactionId?: string;
        /** giftcard internal ID */
        _id?: string;
        /** giftcard provider appid */
        providerId?: string;
        /** giftcard amount */
        amount?: string;
    }
    interface ListTransactionsForSingleOrderRequest {
        /** Order ID. */
        orderId: string;
    }
    interface ListTransactionsForSingleOrderResponse {
        /** Order ID and its associated transactions. */
        orderTransactions?: OrderTransactions;
    }
    interface ListTransactionsForMultipleOrdersRequest {
        /** Order IDs for which to retrieve transactions. */
        orderIds: string[];
    }
    interface ListTransactionsForMultipleOrdersResponse {
        /** List of order IDs and their associated transactions. */
        orderTransactions?: OrderTransactions[];
    }
    interface AddPaymentsRequest {
        /** Order ID. */
        orderId: string;
        /** Payments to be added to order. */
        payments: Payment[];
    }
    interface AddPaymentsResponse {
        /** Order ID and its associated transactions. */
        orderTransactions?: OrderTransactions;
        /** IDs of added order payments. */
        paymentsIds?: string[];
    }
    /** Triggered when a payment is updated. */
    interface PaymentsUpdated {
        /** Updated order transactions. */
        orderTransactions?: OrderTransactions;
        /** List of IDs of the updated payments. */
        paymentIds?: string[];
        /** List of IDs of the updated refunds. */
        refundIds?: string[];
    }
    interface AddRefundRequest {
        /** Order ID this refunds related to */
        orderId: string;
        /** Refund with refund transactions to be added to order. */
        refund: Refund;
        /** Side effect details related to refund */
        sideEffects?: RefundSideEffects;
    }
    interface RefundSideEffects {
        /** Inventory restock details as part of this refund. */
        restockInfo?: RestockInfo;
        /** Whether to send a refund confirmation email to the customer. */
        sendOrderRefundedEmail?: boolean;
        /** Custom message added to the refund confirmation email. */
        customMessage?: string | null;
    }
    interface RestockInfo {
        /** Restock type. */
        type?: RestockType;
        /** Restocked line items and quantities. Only relevant for `{"type": "SOME_ITEMS"}`. */
        items?: RestockItem[];
    }
    enum RestockType {
        NO_ITEMS = "NO_ITEMS",
        ALL_ITEMS = "ALL_ITEMS",
        SOME_ITEMS = "SOME_ITEMS"
    }
    interface RestockItem {
        /** ID of the line item being restocked. */
        lineItemId?: string;
        /** Line item quantity being restocked. */
        quantity?: number;
    }
    interface AddRefundResponse {
        /** Order ID and its associated transactions. */
        orderTransactions?: OrderTransactions;
        /** Created refund ID */
        refundId?: string;
    }
    /** Triggered when a refund is created. */
    interface RefundCreated {
        /** Updated order transactions. */
        orderTransactions?: OrderTransactions;
        /** ID of the created refund. */
        refundId?: string;
        /** Inventory restock details as part of this refund.. */
        restockInfo?: RestockInfo;
        /** Whether to send a refund confirmation email to the customer. */
        sendOrderRefundedEmail?: boolean;
        /** Custom message added to the refund confirmation email. */
        customMessage?: string | null;
        /** Refunded line items and quantities that are part of the created refund. */
        refundItems?: RefundItem[];
    }
    interface UpdatePaymentStatusRequest {
        /** Order ID. */
        orderId: string;
        /** Payment ID. */
        paymentId: string;
        /** Payment status. */
        status?: TransactionStatus;
    }
    interface UpdatePaymentStatusResponse {
        /** Order ID and its associated transactions after update. */
        orderTransactions?: OrderTransactions;
    }
    interface BulkUpdatePaymentStatusesRequest {
        /** Order and payment IDs for which to update payment status. */
        paymentAndOrderIds: PaymentAndOrderId[];
        /** Whether to return the full payment entity (`results.item`) in the response. */
        returnFullEntity?: boolean;
        /** Payment status. */
        status?: TransactionStatus;
    }
    interface PaymentAndOrderId {
        /** Order ID. */
        orderId?: string;
        /**
         * Payment ID.
         * todo: remove comment once UI will use BulkMarkOrderAsPaid
         */
        paymentId?: string;
    }
    interface BulkUpdatePaymentStatusesResponse {
        /** Bulk operation results. */
        results?: BulkPaymentResult[];
        /** Bulk operation metadata. */
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkPaymentResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata;
        /** Updated payment. Returned if `return_full_entity` set to `true`. */
        item?: Payment;
    }
    interface ItemMetadata {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$1;
    }
    interface ApplicationError$1 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface TriggerRefundRequest {
        /** The order this refund related to */
        orderId: string;
        /**
         * Refund operations information
         * Currently, only *one* payment refund is supported per request
         */
        payments: PaymentRefund[];
        /** Business model of a refund */
        details?: RefundDetails;
        /** How to restock items as part of this refund */
        restockInfo?: RestockInfo;
        /** Should send a confirmation mail to the customer */
        sendOrderRefundedEmail?: boolean;
        /** Personal note added to the email */
        customMessage?: string | null;
    }
    interface PaymentRefund {
        /** Specific payment within the order to refund */
        paymentId?: string;
        /** Refund amount. Not relevant for membership refunds. */
        amount?: Price;
        /**
         * Whether refund is made externally and manually (on the payment provider's side)
         * When false (default), the payment gateway will be called in order to make an actual refund, and then the payment will be marked as refunded.
         * When true, the payment will only be *marked* as refunded, and no actual refund will be performed.
         */
        externalRefund?: boolean;
    }
    interface TriggerRefundResponse {
        /** All order's transactions after the refunds were added */
        orderTransactions?: OrderTransactions;
        /** Created refund ID */
        refundId?: string;
    }
    interface CalculateRefundRequest {
        /** Order ID */
        orderId: string;
        /** Refunded line items and quantity */
        refundItems?: CalculateRefundItemRequest[];
        /** Should include shipping in refund calculation */
        refundShipping?: boolean;
    }
    interface CalculateRefundItemRequest {
        /** ID of the line item being refunded */
        lineItemId?: string;
        /** How much of that line item is being refunded */
        quantity?: number;
        /** Should this item be restocked (used for validation purposes) */
        restock?: boolean;
    }
    interface CalculateRefundResponse {
        /** Total refundable amount */
        total?: string;
        /** Tax cost of the order */
        tax?: string;
        /** Discount given for this order */
        discount?: string;
        /** Total cost of the order (without tax) */
        subtotal?: string;
        /** Previous refund given on that order */
        previouslyRefundedAmount?: string | null;
        /** The refundable items of that order */
        items?: CalculateRefundItemResponse[];
    }
    interface CalculateRefundItemResponse {
        /** Line item ID */
        lineItemId?: string;
        /** The line item's price */
        lineItemPrice?: number;
    }
    interface GetRefundabilityStatusRequest {
        /** Order ID. */
        orderId: string;
    }
    interface GetRefundabilityStatusResponse {
        /** Refundability details. */
        refundabilities?: Refundability[];
        /** Whether the order supports refunding per item. */
        refundablePerItem?: boolean;
    }
    interface Refundability extends RefundabilityAdditionalRefundabilityInfoOneOf {
        /** Reason why payment is not refundable. */
        nonRefundableReason?: NonRefundableReason;
        /** Reason why payment is only refundable manually. */
        manuallyRefundableReason?: ManuallyRefundableReason;
        /** Payment ID. */
        paymentId?: string;
        /** Payment refundability status. */
        refundabilityStatus?: RefundableStatus;
        /** Link to payment provider dashboard. */
        providerLink?: string | null;
    }
    /** @oneof */
    interface RefundabilityAdditionalRefundabilityInfoOneOf {
        /** Reason why payment is not refundable. */
        nonRefundableReason?: NonRefundableReason;
        /** Reason why payment is only refundable manually. */
        manuallyRefundableReason?: ManuallyRefundableReason;
    }
    enum RefundableStatus {
        NOT_REFUNDABLE = "NOT_REFUNDABLE",
        MANUAL = "MANUAL",
        REFUNDABLE = "REFUNDABLE"
    }
    enum NonRefundableReason {
        NONE = "NONE",
        ALREADY_REFUNDED = "ALREADY_REFUNDED",
        PROVIDER_IS_DOWN = "PROVIDER_IS_DOWN",
        INTERNAL_ERROR = "INTERNAL_ERROR",
        NOT_PAID = "NOT_PAID",
        ACCESS_DENIED = "ACCESS_DENIED",
        ZERO_PRICE = "ZERO_PRICE",
        DISABLED_BY_PROVIDER = "DISABLED_BY_PROVIDER",
        PARTIALLY_PAID = "PARTIALLY_PAID",
        DEPOSIT_ONLINE_ITEM = "DEPOSIT_ONLINE_ITEM",
        PENDING_REFUND = "PENDING_REFUND",
        FORBIDDEN = "FORBIDDEN"
    }
    enum ManuallyRefundableReason {
        EXPIRED = "EXPIRED",
        NOT_SUPPORTED = "NOT_SUPPORTED",
        NOT_FOUND = "NOT_FOUND",
        OFFLINE = "OFFLINE"
    }
    interface ListInvoicesForSingleOrderRequest {
        /** Order ID. */
        orderId: string;
    }
    interface ListInvoicesForSingleOrderResponse {
        /** List of invoices. */
        invoices?: InvoiceInfo[];
    }
    interface InvoiceInfo {
        /** Invoice ID. */
        _id?: string;
        /** ID of the app that set the invoice. */
        appId?: string;
        /** Invoice URL. */
        url?: string | null;
        /** Invoice creation date and time. */
        _createdDate?: Date;
    }
    interface ListInvoicesForMultipleOrdersRequest {
        /** Order IDs for which to retrieve invoices. */
        orderIds: string[];
    }
    interface ListInvoicesForMultipleOrdersResponse {
        /** List of order IDs and their associated invoices. */
        invoicesForOrder?: InvoicesForOrder[];
    }
    interface InvoicesForOrder {
        /** Order ID. */
        orderId?: string;
        /** Invoices info. */
        invoicesInfo?: InvoiceInfo[];
    }
    interface GenerateInvoiceRequest {
        /** Order ID. */
        orderId: string;
    }
    interface GenerateInvoiceResponse {
        /** Invoice ID. */
        invoiceId?: string;
    }
    interface BulkGenerateInvoicesRequest {
        /** Order IDs. */
        orderIds: string[];
    }
    interface BulkGenerateInvoicesResponse {
        results?: BulkInvoiceResult[];
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkInvoiceResult {
        itemMetadata?: ItemMetadata;
        item?: InvoiceForOrder;
    }
    interface InvoiceForOrder {
        /** Order ID. */
        orderId?: string;
        /** Invoice ID. */
        invoiceId?: string;
    }
    interface AddInvoiceToOrderRequest {
        /** Order ID. */
        orderId: string;
        /** Invoice info. */
        invoiceInfo: InvoiceInfo;
    }
    interface AddInvoiceToOrderResponse {
        /** List of order invoices. */
        orderInvoices?: InvoiceInfo[];
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
    }
    interface EntityUpdatedEvent$1 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$1 {
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
     * Retrieves information about payments and refunds associated with a specified order.
     *
     *
     * The `listTransactionsForSingleOrder()` function returns a Promise that resolves when the specified order's transaction records are retrieved.
     * @param orderId - Order ID.
     * @public
     * @documentationMaturity preview
     * @requiredField orderId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function listTransactionsForSingleOrder(orderId: string): Promise<ListTransactionsForSingleOrderResponse>;
    /**
     * Retrieves information about payments and refunds associated with all specified orders.
     *
     *
     * The `listTransactionsForMultipleOrders()` function returns a Promise that resolves when the specified orders' transaction records are retrieved.
     * @param orderIds - Order IDs for which to retrieve transactions.
     * @public
     * @documentationMaturity preview
     * @requiredField orderIds
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function listTransactionsForMultipleOrders(orderIds: string[]): Promise<ListTransactionsForMultipleOrdersResponse>;
    /**
     * Adds up to 50 payment records to an order.
     *
     *
     * The `addPayments()` function returns a Promise that resolves when the payment records are added to an order.
     *
     * > **Note:** This does **NOT** perform the actual charging - the order is only updated with records of the payments.
     * @param orderId - Order ID.
     * @param payments - Payments to be added to order.
     * @public
     * @documentationMaturity preview
     * @requiredField orderId
     * @requiredField payments
     * @requiredField payments.amount
     * @requiredField payments.giftcardPaymentDetails.giftCardPaymentId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function addPayments(orderId: string, payments: Payment[]): Promise<AddPaymentsResponse>;
    interface AddRefundOptions {
        /** Side effect details related to refund */
        sideEffects?: RefundSideEffects;
    }
    /**
     * Updates the status of an order's payment.
     *
     *
     * The `updatePaymentStatus()` function returns a Promise that resolves when the payment status is updated.
     * @public
     * @documentationMaturity preview
     * @requiredField identifiers
     * @requiredField identifiers.orderId
     * @requiredField identifiers.paymentId
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function updatePaymentStatus(identifiers: UpdatePaymentStatusIdentifiers, options?: UpdatePaymentStatusOptions): Promise<UpdatePaymentStatusResponse>;
    interface UpdatePaymentStatusIdentifiers {
        /** Payment ID. */
        paymentId: string;
        /** Order ID. */
        orderId: string;
    }
    interface UpdatePaymentStatusOptions {
        /** Payment status. */
        status?: TransactionStatus;
    }
    /**
     * Updates multiple order payments with a specified status.
     *
     *
     * The `bulkUpdatePaymentStatus()` function returns a Promise that resolves when the payment statuses are updated.
     * @param paymentAndOrderIds - Order and payment IDs for which to update payment status.
     * @public
     * @documentationMaturity preview
     * @requiredField paymentAndOrderIds
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkUpdatePaymentStatuses(paymentAndOrderIds: PaymentAndOrderId[], options?: BulkUpdatePaymentStatusesOptions): Promise<BulkUpdatePaymentStatusesResponse>;
    interface BulkUpdatePaymentStatusesOptions {
        /** Whether to return the full payment entity (`results.item`) in the response. */
        returnFullEntity?: boolean;
        /** Payment status. */
        status?: TransactionStatus;
    }
    interface TriggerRefundOptions {
        /** Business model of a refund */
        details?: RefundDetails;
        /** How to restock items as part of this refund */
        restockInfo?: RestockInfo;
        /** Should send a confirmation mail to the customer */
        sendOrderRefundedEmail?: boolean;
        /** Personal note added to the email */
        customMessage?: string | null;
    }
    interface CalculateRefundOptions {
        /** Refunded line items and quantity */
        refundItems?: CalculateRefundItemRequest[];
        /** Should include shipping in refund calculation */
        refundShipping?: boolean;
    }
    type ecomV1OrderTransactionsOrderTransactions_universal_d_OrderTransactions = OrderTransactions;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Payment = Payment;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentPaymentDetailsOneOf = PaymentPaymentDetailsOneOf;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RegularPaymentDetails = RegularPaymentDetails;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_TransactionStatus = TransactionStatus;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_TransactionStatus: typeof TransactionStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_GiftCardPaymentDetails = GiftCardPaymentDetails;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_MembershipPaymentDetails = MembershipPaymentDetails;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_MembershipPaymentStatus = MembershipPaymentStatus;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_MembershipPaymentStatus: typeof MembershipPaymentStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Price = Price;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Refund = Refund;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundTransaction = RefundTransaction;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundStatus = RefundStatus;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_RefundStatus: typeof RefundStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundDetails = RefundDetails;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundItem = RefundItem;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_SnapshotMessage = SnapshotMessage;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_IndexingMessage = IndexingMessage;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_DiffmatokyPayload = DiffmatokyPayload;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ErrorInformation = ErrorInformation;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_OrderRefunded = OrderRefunded;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Order = Order;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_IdentityType = IdentityType;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_IdentityType: typeof IdentityType;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Totals = Totals;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BillingInfo = BillingInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddressAddressLine1OptionsOneOf = AddressAddressLine1OptionsOneOf;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_FullName = FullName;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Street = Street;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ShippingInfo = ShippingInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ShippingInfoDetailsOneOf = ShippingInfoDetailsOneOf;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ShipmentDetails = ShipmentDetails;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_TrackingInfo = TrackingInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ShippingPriceData = ShippingPriceData;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_PickupAddress = PickupAddress;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BuyerDetails = BuyerDetails;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentStatus = PaymentStatus;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentStatus: typeof PaymentStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentStatus = FulfillmentStatus;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentStatus: typeof FulfillmentStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_LineItemType = LineItemType;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_LineItemType: typeof LineItemType;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_OptionSelection = OptionSelection;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CustomTextFieldSelection = CustomTextFieldSelection;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_MediaItem = MediaItem;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_MediaItemType = MediaItemType;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_MediaItemType: typeof MediaItemType;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_LineItemPriceData = LineItemPriceData;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_DigitalFile = DigitalFile;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Activity = Activity;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ActivityType = ActivityType;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_ActivityType: typeof ActivityType;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_V2InvoiceInfo = V2InvoiceInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceSource = InvoiceSource;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceSource: typeof InvoiceSource;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Fulfillment = Fulfillment;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentLineItem = FulfillmentLineItem;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentTrackingInfo = FulfillmentTrackingInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Discount = Discount;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AppliedCoupon = AppliedCoupon;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CustomField = CustomField;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ChannelInfo = ChannelInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_EnteredBy = EnteredBy;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_EnteredByIdentityType = EnteredByIdentityType;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_EnteredByIdentityType: typeof EnteredByIdentityType;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_SubscriptionInfo = SubscriptionInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_V2Refund = V2Refund;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForSingleOrderRequest = ListTransactionsForSingleOrderRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForSingleOrderResponse = ListTransactionsForSingleOrderResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForMultipleOrdersRequest = ListTransactionsForMultipleOrdersRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForMultipleOrdersResponse = ListTransactionsForMultipleOrdersResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddPaymentsRequest = AddPaymentsRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddPaymentsResponse = AddPaymentsResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentsUpdated = PaymentsUpdated;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddRefundRequest = AddRefundRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundSideEffects = RefundSideEffects;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RestockInfo = RestockInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RestockType = RestockType;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_RestockType: typeof RestockType;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RestockItem = RestockItem;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddRefundResponse = AddRefundResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundCreated = RefundCreated;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusRequest = UpdatePaymentStatusRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusResponse = UpdatePaymentStatusResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkUpdatePaymentStatusesRequest = BulkUpdatePaymentStatusesRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentAndOrderId = PaymentAndOrderId;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkUpdatePaymentStatusesResponse = BulkUpdatePaymentStatusesResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkPaymentResult = BulkPaymentResult;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ItemMetadata = ItemMetadata;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkActionMetadata = BulkActionMetadata;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_TriggerRefundRequest = TriggerRefundRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentRefund = PaymentRefund;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_TriggerRefundResponse = TriggerRefundResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundRequest = CalculateRefundRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundItemRequest = CalculateRefundItemRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundResponse = CalculateRefundResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundItemResponse = CalculateRefundItemResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_GetRefundabilityStatusRequest = GetRefundabilityStatusRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_GetRefundabilityStatusResponse = GetRefundabilityStatusResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_Refundability = Refundability;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundabilityAdditionalRefundabilityInfoOneOf = RefundabilityAdditionalRefundabilityInfoOneOf;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_RefundableStatus = RefundableStatus;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_RefundableStatus: typeof RefundableStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_NonRefundableReason = NonRefundableReason;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_NonRefundableReason: typeof NonRefundableReason;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ManuallyRefundableReason = ManuallyRefundableReason;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_ManuallyRefundableReason: typeof ManuallyRefundableReason;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForSingleOrderRequest = ListInvoicesForSingleOrderRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForSingleOrderResponse = ListInvoicesForSingleOrderResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceInfo = InvoiceInfo;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForMultipleOrdersRequest = ListInvoicesForMultipleOrdersRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForMultipleOrdersResponse = ListInvoicesForMultipleOrdersResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_InvoicesForOrder = InvoicesForOrder;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_GenerateInvoiceRequest = GenerateInvoiceRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_GenerateInvoiceResponse = GenerateInvoiceResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkGenerateInvoicesRequest = BulkGenerateInvoicesRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkGenerateInvoicesResponse = BulkGenerateInvoicesResponse;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkInvoiceResult = BulkInvoiceResult;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceForOrder = InvoiceForOrder;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddInvoiceToOrderRequest = AddInvoiceToOrderRequest;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddInvoiceToOrderResponse = AddInvoiceToOrderResponse;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_listTransactionsForSingleOrder: typeof listTransactionsForSingleOrder;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_listTransactionsForMultipleOrders: typeof listTransactionsForMultipleOrders;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_addPayments: typeof addPayments;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_AddRefundOptions = AddRefundOptions;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_updatePaymentStatus: typeof updatePaymentStatus;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusIdentifiers = UpdatePaymentStatusIdentifiers;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusOptions = UpdatePaymentStatusOptions;
    const ecomV1OrderTransactionsOrderTransactions_universal_d_bulkUpdatePaymentStatuses: typeof bulkUpdatePaymentStatuses;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_BulkUpdatePaymentStatusesOptions = BulkUpdatePaymentStatusesOptions;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_TriggerRefundOptions = TriggerRefundOptions;
    type ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundOptions = CalculateRefundOptions;
    namespace ecomV1OrderTransactionsOrderTransactions_universal_d {
        export { ecomV1OrderTransactionsOrderTransactions_universal_d_OrderTransactions as OrderTransactions, ecomV1OrderTransactionsOrderTransactions_universal_d_Payment as Payment, ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentPaymentDetailsOneOf as PaymentPaymentDetailsOneOf, ecomV1OrderTransactionsOrderTransactions_universal_d_RegularPaymentDetails as RegularPaymentDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_TransactionStatus as TransactionStatus, ecomV1OrderTransactionsOrderTransactions_universal_d_GiftCardPaymentDetails as GiftCardPaymentDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_MembershipPaymentDetails as MembershipPaymentDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_MembershipPaymentStatus as MembershipPaymentStatus, MembershipName$1 as MembershipName, ecomV1OrderTransactionsOrderTransactions_universal_d_Price as Price, ecomV1OrderTransactionsOrderTransactions_universal_d_Refund as Refund, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundTransaction as RefundTransaction, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundStatus as RefundStatus, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundDetails as RefundDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundItem as RefundItem, ecomV1OrderTransactionsOrderTransactions_universal_d_SnapshotMessage as SnapshotMessage, ecomV1OrderTransactionsOrderTransactions_universal_d_IndexingMessage as IndexingMessage, ecomV1OrderTransactionsOrderTransactions_universal_d_DiffmatokyPayload as DiffmatokyPayload, ecomV1OrderTransactionsOrderTransactions_universal_d_ErrorInformation as ErrorInformation, ecomV1OrderTransactionsOrderTransactions_universal_d_OrderRefunded as OrderRefunded, ecomV1OrderTransactionsOrderTransactions_universal_d_Order as Order, BuyerInfo$1 as BuyerInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_IdentityType as IdentityType, WeightUnit$1 as WeightUnit, ecomV1OrderTransactionsOrderTransactions_universal_d_Totals as Totals, ecomV1OrderTransactionsOrderTransactions_universal_d_BillingInfo as BillingInfo, Address$1 as Address, ecomV1OrderTransactionsOrderTransactions_universal_d_AddressAddressLine1OptionsOneOf as AddressAddressLine1OptionsOneOf, ecomV1OrderTransactionsOrderTransactions_universal_d_FullName as FullName, ecomV1OrderTransactionsOrderTransactions_universal_d_Street as Street, VatId$1 as VatId, VatType$1 as VatType, ecomV1OrderTransactionsOrderTransactions_universal_d_ShippingInfo as ShippingInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_ShippingInfoDetailsOneOf as ShippingInfoDetailsOneOf, ecomV1OrderTransactionsOrderTransactions_universal_d_ShipmentDetails as ShipmentDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_TrackingInfo as TrackingInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_ShippingPriceData as ShippingPriceData, PickupDetails$1 as PickupDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_PickupAddress as PickupAddress, ecomV1OrderTransactionsOrderTransactions_universal_d_BuyerDetails as BuyerDetails, ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentStatus as PaymentStatus, ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentStatus as FulfillmentStatus, LineItem$1 as LineItem, ecomV1OrderTransactionsOrderTransactions_universal_d_LineItemType as LineItemType, ecomV1OrderTransactionsOrderTransactions_universal_d_OptionSelection as OptionSelection, ecomV1OrderTransactionsOrderTransactions_universal_d_CustomTextFieldSelection as CustomTextFieldSelection, ecomV1OrderTransactionsOrderTransactions_universal_d_MediaItem as MediaItem, ecomV1OrderTransactionsOrderTransactions_universal_d_MediaItemType as MediaItemType, ecomV1OrderTransactionsOrderTransactions_universal_d_LineItemPriceData as LineItemPriceData, ecomV1OrderTransactionsOrderTransactions_universal_d_DigitalFile as DigitalFile, ecomV1OrderTransactionsOrderTransactions_universal_d_Activity as Activity, ecomV1OrderTransactionsOrderTransactions_universal_d_ActivityType as ActivityType, ecomV1OrderTransactionsOrderTransactions_universal_d_V2InvoiceInfo as V2InvoiceInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceSource as InvoiceSource, ecomV1OrderTransactionsOrderTransactions_universal_d_Fulfillment as Fulfillment, ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentLineItem as FulfillmentLineItem, ecomV1OrderTransactionsOrderTransactions_universal_d_FulfillmentTrackingInfo as FulfillmentTrackingInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_Discount as Discount, ecomV1OrderTransactionsOrderTransactions_universal_d_AppliedCoupon as AppliedCoupon, ecomV1OrderTransactionsOrderTransactions_universal_d_CustomField as CustomField, ecomV1OrderTransactionsOrderTransactions_universal_d_ChannelInfo as ChannelInfo, ChannelType$1 as ChannelType, ecomV1OrderTransactionsOrderTransactions_universal_d_EnteredBy as EnteredBy, ecomV1OrderTransactionsOrderTransactions_universal_d_EnteredByIdentityType as EnteredByIdentityType, ecomV1OrderTransactionsOrderTransactions_universal_d_SubscriptionInfo as SubscriptionInfo, SubscriptionSettings$1 as SubscriptionSettings, SubscriptionFrequency$1 as SubscriptionFrequency, SubscriptionOptionInfo$1 as SubscriptionOptionInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_V2Refund as V2Refund, GiftCard$1 as GiftCard, ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForSingleOrderRequest as ListTransactionsForSingleOrderRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForSingleOrderResponse as ListTransactionsForSingleOrderResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForMultipleOrdersRequest as ListTransactionsForMultipleOrdersRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_ListTransactionsForMultipleOrdersResponse as ListTransactionsForMultipleOrdersResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_AddPaymentsRequest as AddPaymentsRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_AddPaymentsResponse as AddPaymentsResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentsUpdated as PaymentsUpdated, ecomV1OrderTransactionsOrderTransactions_universal_d_AddRefundRequest as AddRefundRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundSideEffects as RefundSideEffects, ecomV1OrderTransactionsOrderTransactions_universal_d_RestockInfo as RestockInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_RestockType as RestockType, ecomV1OrderTransactionsOrderTransactions_universal_d_RestockItem as RestockItem, ecomV1OrderTransactionsOrderTransactions_universal_d_AddRefundResponse as AddRefundResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundCreated as RefundCreated, ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusRequest as UpdatePaymentStatusRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusResponse as UpdatePaymentStatusResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkUpdatePaymentStatusesRequest as BulkUpdatePaymentStatusesRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentAndOrderId as PaymentAndOrderId, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkUpdatePaymentStatusesResponse as BulkUpdatePaymentStatusesResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkPaymentResult as BulkPaymentResult, ecomV1OrderTransactionsOrderTransactions_universal_d_ItemMetadata as ItemMetadata, ApplicationError$1 as ApplicationError, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkActionMetadata as BulkActionMetadata, ecomV1OrderTransactionsOrderTransactions_universal_d_TriggerRefundRequest as TriggerRefundRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_PaymentRefund as PaymentRefund, ecomV1OrderTransactionsOrderTransactions_universal_d_TriggerRefundResponse as TriggerRefundResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundRequest as CalculateRefundRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundItemRequest as CalculateRefundItemRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundResponse as CalculateRefundResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundItemResponse as CalculateRefundItemResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_GetRefundabilityStatusRequest as GetRefundabilityStatusRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_GetRefundabilityStatusResponse as GetRefundabilityStatusResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_Refundability as Refundability, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundabilityAdditionalRefundabilityInfoOneOf as RefundabilityAdditionalRefundabilityInfoOneOf, ecomV1OrderTransactionsOrderTransactions_universal_d_RefundableStatus as RefundableStatus, ecomV1OrderTransactionsOrderTransactions_universal_d_NonRefundableReason as NonRefundableReason, ecomV1OrderTransactionsOrderTransactions_universal_d_ManuallyRefundableReason as ManuallyRefundableReason, ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForSingleOrderRequest as ListInvoicesForSingleOrderRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForSingleOrderResponse as ListInvoicesForSingleOrderResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceInfo as InvoiceInfo, ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForMultipleOrdersRequest as ListInvoicesForMultipleOrdersRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_ListInvoicesForMultipleOrdersResponse as ListInvoicesForMultipleOrdersResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_InvoicesForOrder as InvoicesForOrder, ecomV1OrderTransactionsOrderTransactions_universal_d_GenerateInvoiceRequest as GenerateInvoiceRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_GenerateInvoiceResponse as GenerateInvoiceResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkGenerateInvoicesRequest as BulkGenerateInvoicesRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkGenerateInvoicesResponse as BulkGenerateInvoicesResponse, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkInvoiceResult as BulkInvoiceResult, ecomV1OrderTransactionsOrderTransactions_universal_d_InvoiceForOrder as InvoiceForOrder, ecomV1OrderTransactionsOrderTransactions_universal_d_AddInvoiceToOrderRequest as AddInvoiceToOrderRequest, ecomV1OrderTransactionsOrderTransactions_universal_d_AddInvoiceToOrderResponse as AddInvoiceToOrderResponse, DomainEvent$1 as DomainEvent, DomainEventBodyOneOf$1 as DomainEventBodyOneOf, EntityCreatedEvent$1 as EntityCreatedEvent, EntityUpdatedEvent$1 as EntityUpdatedEvent, EntityDeletedEvent$1 as EntityDeletedEvent, ActionEvent$1 as ActionEvent, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, ecomV1OrderTransactionsOrderTransactions_universal_d_listTransactionsForSingleOrder as listTransactionsForSingleOrder, ecomV1OrderTransactionsOrderTransactions_universal_d_listTransactionsForMultipleOrders as listTransactionsForMultipleOrders, ecomV1OrderTransactionsOrderTransactions_universal_d_addPayments as addPayments, ecomV1OrderTransactionsOrderTransactions_universal_d_AddRefundOptions as AddRefundOptions, ecomV1OrderTransactionsOrderTransactions_universal_d_updatePaymentStatus as updatePaymentStatus, ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusIdentifiers as UpdatePaymentStatusIdentifiers, ecomV1OrderTransactionsOrderTransactions_universal_d_UpdatePaymentStatusOptions as UpdatePaymentStatusOptions, ecomV1OrderTransactionsOrderTransactions_universal_d_bulkUpdatePaymentStatuses as bulkUpdatePaymentStatuses, ecomV1OrderTransactionsOrderTransactions_universal_d_BulkUpdatePaymentStatusesOptions as BulkUpdatePaymentStatusesOptions, ecomV1OrderTransactionsOrderTransactions_universal_d_TriggerRefundOptions as TriggerRefundOptions, ecomV1OrderTransactionsOrderTransactions_universal_d_CalculateRefundOptions as CalculateRefundOptions, };
    }
    interface Cart {
        /** Cart ID. */
        _id?: string | null;
        /**
         * Line items.
         * @readonly
         */
        lineItems?: LineItem[];
        /** [Buyer note](https://support.wix.com/en/article/wix-stores-viewing-buyer-notes) left by the customer. */
        buyerNote?: string | null;
        /** Buyer information. */
        buyerInfo?: BuyerInfo;
        /**
         * Currency used for pricing.
         * @readonly
         */
        currency?: string;
        /**
         * Currency code used for all the converted prices that are returned.
         * For a site that supports multiple currencies, this is the currency the buyer selected.
         * @readonly
         */
        conversionCurrency?: string;
        /**
         * Language for communication with the buyer. Defaults to the site language.
         * For a site that supports multiple languages, this is the language the buyer selected.
         * @readonly
         */
        buyerLanguage?: string | null;
        /**
         * Site language in which original values are displayed.
         * @readonly
         */
        siteLanguage?: string | null;
        /**
         * Whether tax is included in line item prices.
         * @readonly
         */
        taxIncludedInPrices?: boolean | null;
        /**
         * Weight measurement unit - defaults to site's weight unit. Supported values:
         * + `"KG"`
         * + `"LB"`
         * @readonly
         */
        weightUnit?: WeightUnit;
        /**
         * ID of the checkout that originated from this cart.
         * @readonly
         */
        checkoutId?: string | null;
        /**
         * Cart discounts.
         * @readonly
         */
        appliedDiscounts?: CartDiscount[];
        /**
         * Date and time the cart was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the cart was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /** Contact info. */
        contactInfo?: AddressWithContact;
        /**
         * `overrideCheckoutUrl` allows the flexibility to redirect customers to a customized checkout page.
         *
         * This field overrides the `checkoutUrl` in a cart or checkout. `checkoutUrl` is used to send customers back to their checkouts. By default, a `checkoutUrl` generates for a checkout and directs to a standard Wix checkout page. When `overrideCheckoutUrl` has a value, it will replace and set the value of `checkoutUrl`.
         */
        overrideCheckoutUrl?: string | null;
        /**
         * Persistent ID that correlates between the various eCommerce elements: cart, checkout, and order.
         * @readonly
         */
        purchaseFlowId?: string | null;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
    }
    interface LineItem {
        /**
         * Line item ID.
         * @readonly
         */
        _id?: string | null;
        /** Item quantity. */
        quantity?: number;
        /** Catalog and item reference. Holds IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference;
        /**
         * Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         * @readonly
         */
        productName?: ProductName;
        /**
         * URL to the item's page on the site.
         * @readonly
         */
        url?: string;
        /**
         * Item price **after** catalog-defined discount and line item discounts.
         * @readonly
         */
        price?: MultiCurrencyPrice;
        /**
         * Item price **before** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        fullPrice?: MultiCurrencyPrice;
        /**
         * Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided.
         * @readonly
         */
        priceBeforeDiscounts?: MultiCurrencyPrice;
        /**
         * Line item description lines. Used for displaying the cart, checkout and order.
         * @readonly
         */
        descriptionLines?: DescriptionLine[];
        /**
         * Line item image details.
         * @readonly
         */
        image?: string;
        /**
         * Item availability details.
         * @readonly
         */
        availability?: ItemAvailabilityInfo;
        /**
         * Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability.
         * @readonly
         */
        physicalProperties?: PhysicalProperties;
        /**
         * Item type. Either a preset type or custom.
         * @readonly
         */
        itemType?: ItemType;
        /**
         * Type of selected payment option for current item. Defaults to `"FULL_PAYMENT_ONLINE"`.
         * + `"FULL_PAYMENT_ONLINE"` - The entire payment for this item happens as part of the checkout.
         * + `"FULL_PAYMENT_OFFLINE"` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `"MEMBERSHIP"` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` will be 0.
         * @readonly
         */
        paymentOption?: PaymentOptionType;
        /**
         * Service properties. When relevant, this contains information such as date and number of participants.
         * @readonly
         */
        serviceProperties?: ServiceProperties;
        /**
         * In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + in most cases, this field is the same as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         * @readonly
         */
        rootCatalogItemId?: string | null;
        /**
         * Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67".
         * @readonly
         */
        priceDescription?: PriceDescription;
        /**
         * Partial payment to be paid upfront during the checkout. Eligible for catalog items with `lineItem.paymentOption` type `DEPOSIT_ONLINE` only.
         * @readonly
         */
        depositAmount?: MultiCurrencyPrice;
        /** Selected membership to be used as payment for this item. Must be used with `lineItem.paymentOption` set to `MEMBERSHIP` or `MEMBERSHIP_OFFLINE`. This field can be empty when `lineItem.paymentOption` is set to `MEMBERSHIP_OFFLINE`. */
        selectedMembership?: SelectedMembership;
        /**
         * Tax group ID for this line item.
         * @readonly
         */
        taxGroupId?: string | null;
        /**
         * Item payment policy that requires customer consent to complete purchase. The payment policy will be displayed on the checkout page.
         * @readonly
         */
        consentRequiredPaymentPolicy?: string | null;
    }
    /** Used for grouping line items. Sent when an item is added to a cart, checkout, or order. */
    interface CatalogReference {
        /** ID of the item within the catalog it belongs to. */
        catalogItemId?: string;
        /**
         * ID of the app providing the catalog.
         *
         * You can get your app's ID from its page in the [Wix Dev Center](https://dev.wix.com/apps).
         *
         * For items from Wix catalogs, the following values always apply:
         * + Wix Stores: `"215238eb-22a5-4c36-9e7b-e7c08025e04e"`
         * + Wix Bookings: `"13d21c63-b5ec-5912-8397-c3a5ddb27a97"`
         * + Wix Restaurants: `"9a5d83fd-8570-482e-81ab-cfa88942ee60"`
         */
        appId?: string;
        /**
         * Additional item details in key:value pairs.
         *
         * Use this optional field to provide more specificity with item selection. The `options` field values differ depending on which catalog is providing the items.
         *
         * For products and variants from your Wix Stores catalog, learn more about [eCommerce integration](https://www.wix.com/velo/reference/wix-stores-backend/ecommerce-integration).
         */
        options?: Record<string, any> | null;
    }
    interface ProductName {
        /** **Required** - Original product name (in site's default language). */
        original?: string;
        /** Description product name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface MultiCurrencyPrice {
        /** Amount. */
        amount?: string;
        /**
         * Converted amount.
         * @readonly
         */
        convertedAmount?: string;
        /**
         * Amount formatted with currency symbol.
         * @readonly
         */
        formattedAmount?: string;
        /**
         * Converted amount formatted with currency symbol.
         * @readonly
         */
        formattedConvertedAmount?: string;
    }
    interface DescriptionLine extends DescriptionLineValueOneOf, DescriptionLineDescriptionLineValueOneOf {
        /** Description line plain text value. */
        plainText?: PlainTextValue;
        /** Description line color value. */
        colorInfo?: Color;
        /** Description line name. */
        name?: DescriptionLineName;
    }
    /** @oneof */
    interface DescriptionLineValueOneOf {
        /** Description line plain text value. */
        plainText?: PlainTextValue;
        /** Description line color value. */
        colorInfo?: Color;
    }
    /** @oneof */
    interface DescriptionLineDescriptionLineValueOneOf {
    }
    interface DescriptionLineName {
        /** Description line name in site's default language. */
        original?: string;
        /** Description line name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface PlainTextValue {
        /** Description line plain text value in site's default language. */
        original?: string;
        /** Description line plain text value translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface Color {
        /** Description line color name in site's default language. */
        original?: string;
        /** Description line color name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
        /**
         * HEX or RGB color code for display.
         *
         */
        code?: string | null;
    }
    enum DescriptionLineType {
        UNRECOGNISED = "UNRECOGNISED",
        PLAIN_TEXT = "PLAIN_TEXT",
        COLOR = "COLOR"
    }
    interface ItemAvailabilityInfo {
        /**
         * Item availability status.
         *
         * NOT_FOUND - Item does not exist.
         * NOT_AVAILABLE - Not in stock.
         * PARTIALLY_AVAILABLE - Available quantity is less than requested.
         */
        status?: ItemAvailabilityStatus;
        /** Quantity available. */
        quantityAvailable?: number | null;
    }
    enum ItemAvailabilityStatus {
        AVAILABLE = "AVAILABLE",
        NOT_FOUND = "NOT_FOUND",
        /** Not in stock */
        NOT_AVAILABLE = "NOT_AVAILABLE",
        /** Available quantity is less than requested */
        PARTIALLY_AVAILABLE = "PARTIALLY_AVAILABLE"
    }
    interface PhysicalProperties {
        /**
         * Line item weight. Measurement unit is taken from `order.weightUnit`. Supported values:
         * + `"KG"`
         * + `"LB"`
         */
        weight?: number | null;
        /** Stock-keeping unit. Learn more about [SKUs](https://www.wix.com/encyclopedia/definition/stock-keeping-unit-sku). */
        sku?: string | null;
        /** Whether this line item is shippable. */
        shippable?: boolean;
    }
    interface Scope {
        /** Scope namespace (Wix Stores, Wix Bookings, Wix Events, Wix Pricing Plans) */
        namespace?: string;
        /** Coupon scope's applied group (e.g., event or ticket in Wix Events) */
        group?: Group;
    }
    interface Group {
        /** Coupon scope's group (e.g., product or collection in Wix Stores). See [valid scope values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values). */
        name?: string;
        /** Item ID (when the coupon scope is limited to just one item). */
        entityId?: string | null;
    }
    interface ItemType extends ItemTypeItemTypeDataOneOf {
        /** Preset item type. */
        preset?: ItemTypeItemType;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    /** @oneof */
    interface ItemTypeItemTypeDataOneOf {
        /** Preset item type. */
        preset?: ItemTypeItemType;
        /** Custom item type. When none of the preset types are suitable, specifies the custom type. */
        custom?: string;
    }
    enum ItemTypeItemType {
        UNRECOGNISED = "UNRECOGNISED",
        PHYSICAL = "PHYSICAL",
        DIGITAL = "DIGITAL",
        GIFT_CARD = "GIFT_CARD",
        SERVICE = "SERVICE"
    }
    interface SubscriptionOptionInfo {
        /** Subscription option settings. */
        subscriptionSettings?: SubscriptionSettings;
        /** Subscription option title. */
        title?: Title;
        /** Subscription option description. */
        description?: Description;
    }
    interface SubscriptionSettings {
        /** Frequency of recurring payment. */
        frequency?: SubscriptionFrequency;
        /** Whether subscription is renewed automatically at the end of each period. */
        autoRenewal?: boolean;
        /** Number of billing cycles before subscription ends. Ignored if `autoRenewal` is `true`. */
        billingCycles?: number | null;
    }
    /** Frequency unit of recurring payment */
    enum SubscriptionFrequency {
        UNDEFINED = "UNDEFINED",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface Title {
        /** Subscription option name in the site's default language. */
        original?: string;
        /**
         * Subscription option name translated into the buyer's language.
         *
         * Default: Same as `original`.
         */
        translated?: string | null;
    }
    interface Description {
        /** Subscription option description. */
        original?: string;
        /** Translated subscription option description. */
        translated?: string | null;
    }
    interface SecuredMedia {
        /** Media ID in Wix Media Manager. */
        _id?: string;
        /** Original filename. */
        fileName?: string;
        /** File type. */
        fileType?: FileType;
    }
    enum FileType {
        UNSPECIFIED = "UNSPECIFIED",
        SECURE_PICTURE = "SECURE_PICTURE",
        SECURE_VIDEO = "SECURE_VIDEO",
        SECURE_DOCUMENT = "SECURE_DOCUMENT",
        SECURE_MUSIC = "SECURE_MUSIC",
        SECURE_ARCHIVE = "SECURE_ARCHIVE"
    }
    /** Type of selected payment option for catalog item */
    enum PaymentOptionType {
        /** The entire payment for this item happens as part of the checkout. */
        FULL_PAYMENT_ONLINE = "FULL_PAYMENT_ONLINE",
        /** The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods. */
        FULL_PAYMENT_OFFLINE = "FULL_PAYMENT_OFFLINE",
        /** Payment for this item is done by charging a membership. When selected, `price` is `0`. */
        MEMBERSHIP = "MEMBERSHIP",
        /** Partial payment to be paid upfront during the checkout. Initial amount to be paid for each line item is specified in `depositAmount`. */
        DEPOSIT_ONLINE = "DEPOSIT_ONLINE",
        /** Payment for this item can only be done by charging a membership and must be manually redeemed in the dashboard by the site admin. When selected, `price` is `0`. */
        MEMBERSHIP_OFFLINE = "MEMBERSHIP_OFFLINE"
    }
    interface ServiceProperties {
        /** The date and time for which the service is supposed to be provided. For example, the time of the class. */
        scheduledDate?: Date;
        /** The number of people participating in this service. For example, the number of people attending the class or the number of people per hotel room. */
        numberOfParticipants?: number | null;
    }
    interface PriceDescription {
        /**
         * **Required** - Original price description (in site's default language).
         *
         */
        original?: string;
        /** Product name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    /** Selected Membership */
    interface SelectedMembership {
        /** Membership ID. */
        _id?: string;
        /** ID of the app providing this payment option. */
        appId?: string;
    }
    interface CatalogOverrideFields {
        /** Item product name */
        productName?: ProductName;
        /** Item price **after** discounts. */
        price?: string | null;
        /** Item price **before** discount. */
        fullPrice?: string | null;
        /** Line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine[];
        /** Physical properties of the item. When relevant, contains information such as SKU, item weight, and shippability. */
        physicalProperties?: PhysicalProperties;
        /** Line item image details. */
        image?: string;
    }
    /** Buyer Info */
    interface BuyerInfo extends BuyerInfoIdOneOf {
        /**
         * Visitor ID - if the buyer is **not** a site member.
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID - if the buyer is a site member.
         * @readonly
         */
        memberId?: string;
        /**
         * User ID - if the cart owner is a Wix user.
         * @readonly
         */
        userId?: string;
        /** Contact ID. For more information, see the Contacts API. */
        contactId?: string | null;
        /** Buyer email address. */
        email?: string | null;
    }
    /** @oneof */
    interface BuyerInfoIdOneOf {
        /**
         * Visitor ID - if the buyer is **not** a site member.
         * @readonly
         */
        visitorId?: string;
        /**
         * Member ID - if the buyer is a site member.
         * @readonly
         */
        memberId?: string;
        /**
         * User ID - if the cart owner is a Wix user.
         * @readonly
         */
        userId?: string;
    }
    enum WeightUnit {
        /** Weight unit can't be classified, due to an error */
        UNSPECIFIED_WEIGHT_UNIT = "UNSPECIFIED_WEIGHT_UNIT",
        /** Kilograms */
        KG = "KG",
        /** Pounds */
        LB = "LB"
    }
    interface CartDiscount extends CartDiscountDiscountSourceOneOf {
        /** Coupon details. */
        coupon?: Coupon;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount;
    }
    /** @oneof */
    interface CartDiscountDiscountSourceOneOf {
        /** Coupon details. */
        coupon?: Coupon;
        /** Merchant discount. */
        merchantDiscount?: MerchantDiscount;
    }
    interface Coupon {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
    }
    interface MerchantDiscount {
        /** Discount value. */
        amount?: MultiCurrencyPrice;
    }
    /** Billing Info and shipping details */
    interface AddressWithContact {
        /** Address. */
        address?: Address;
        /** Contact details. */
        contactDetails?: FullAddressContactDetails;
    }
    /** Physical address */
    interface Address {
        /** Two-letter country code in [ISO-3166 alpha-2](https://www.iso.org/obp/ui/#search/code/) format. */
        country?: string | null;
        /** Code for a subdivision (such as state, prefecture, or province) in [ISO 3166-2](https://www.iso.org/standard/72483.html) format. */
        subdivision?: string | null;
        /** City name. */
        city?: string | null;
        /** Postal or zip code. */
        postalCode?: string | null;
        /** Street address. */
        streetAddress?: StreetAddress;
        /** Main address line (usually street name and number). */
        addressLine1?: string | null;
        /** Free text providing more detailed address info. Usually contains apt, suite, floor. */
        addressLine2?: string | null;
    }
    interface StreetAddress {
        /** Street number. */
        number?: string;
        /** Street name. */
        name?: string;
    }
    interface AddressLocation {
        /** Address latitude. */
        latitude?: number | null;
        /** Address longitude. */
        longitude?: number | null;
    }
    /** Full contact details for an address */
    interface FullAddressContactDetails {
        /** First name. */
        firstName?: string | null;
        /** Last name. */
        lastName?: string | null;
        /** Phone number. */
        phone?: string | null;
        /** Company name. */
        company?: string | null;
        /** Tax information (for Brazil only). If ID is provided, `vatId.type` must also be set, `UNSPECIFIED` is not allowed. */
        vatId?: VatId;
    }
    interface VatId {
        /** Customer's tax ID. */
        _id?: string;
        /**
         * Tax type.
         *
         * Supported values:
         * + `CPF`: for individual tax payers
         * + `CNPJ`: for corporations
         */
        type?: VatType;
    }
    /** tax info types */
    enum VatType {
        UNSPECIFIED = "UNSPECIFIED",
        /** CPF - for individual tax payers. */
        CPF = "CPF",
        /** CNPJ - for corporations */
        CNPJ = "CNPJ"
    }
    interface SelectedShippingOption {
        /** Carrier ID. */
        carrierId?: string | null;
        /** Selected shipping option code. For example, "usps_std_overnight". */
        code?: string;
    }
    interface ExtendedFields {
        /**
         * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
         * The value of each key is structured according to the schema defined when the extended fields were configured.
         *
         * You can only access fields for which you have the appropriate permissions.
         *
         * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
         */
        namespaces?: Record<string, Record<string, any>>;
    }
    interface GetCurrentCartRequest {
    }
    interface GetCurrentCartResponse {
        /** Current session's active cart. */
        cart?: Cart;
    }
    interface UpdateCartRequest {
        /** Cart info. */
        cartInfo?: Cart;
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will be applied to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput[];
        /** Catalog line items. */
        lineItems?: LineItem[];
    }
    interface MerchantDiscountInput {
        /** Discount amount. */
        amount?: string;
        /** IDs of the line items the discount applies to. */
        lineItemIds?: string[];
    }
    interface CustomLineItem {
        /**
         * Custom line item quantity.
         *
         * Min: `1`
         * Max: `100000`
         */
        quantity?: number;
        /**
         * Custom line item price.
         *
         * Must be a number or a decimal without symbols.
         */
        price?: string;
        /** Additional description for the price. For example, when price is 0 but additional details about the actual price are needed - "Starts at $67". */
        priceDescription?: PriceDescription;
        /** Custom line item description lines. Used for displaying the cart, checkout and order. */
        descriptionLines?: DescriptionLine[];
        /**
         * Custom line item media. Supported formats:
         * + Link to an image/video from the [Wix Media Manager](https://support.wix.com/en/article/wix-media-about-the-media-manager) - `"wix:image://v1/3c76e2_c53...4ea4~mv2.jpg#originWidth=1000&originHeight=1000"`.
         * + An image from the web - `"http(s)://<image url>"`.
         */
        media?: string;
        /**
         * Custom line item ID. If passed, `id` must be unique.
         * Default: auto-generated ID.
         */
        _id?: string | null;
        /** Tax group ID for this custom line item. */
        taxGroupId?: string | null;
        /**
         * *Required** - Item name.
         * + Stores - `product.name`
         * + Bookings - `service.info.name`
         * + Events - `ticket.name`
         */
        productName?: ProductName;
        /**
         * Optional - URL to the item's page on the site. When not provided, the link back from the cart page to the relevant product page will not work.
         * The URL is optional and if not provided, the site URL will be used.
         */
        url?: string;
        /** *Required** - Item type. Either a preset type or custom. */
        itemType?: ItemType;
        /** Optional - Item price **before** catalog-defined discount. Defaults to `price` when not provided. */
        fullPrice?: string | null;
        /**
         * Optional - Item quantity available for purchase. Only return this if inventory is managed.
         * Not returning this field means that the buyer can "infinitely" tick up the number of items in the cart.
         */
        quantityAvailable?: number | null;
        /** Optional - Physical properties of the item. When relevant, contains information such as SKU and item weight. */
        physicalProperties?: PhysicalProperties;
        /**
         * Optional - Type of selected payment option for current item. Defaults to `FULL_PAYMENT_ONLINE`.
         * + `FULL_PAYMENT_ONLINE` - Entire payment for this item happens as part of the checkout.
         * + `FULL_PAYMENT_OFFLINE` - Entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `MEMBERSHIP` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` is 0.
         * + `DEPOSIT_ONLINE` -  Partial payment for the given item to be paid upfront during the checkout. Amount to be paid is defined by deposit_amount field.
         */
        paymentOption?: PaymentOptionType;
        /**
         * Optional - Service properties. When relevant, this contains information such as date and number of participants.
         * Used, among other things, when checking for valid memberships.
         */
        serviceProperties?: ServiceProperties;
        /**
         * Optional - In cases where `catalogReference.catalogItemId` is NOT the actual catalog item ID, this field will return the true item's ID.
         * + For example, for Wix Bookings, `catalogReference.catalogItemId` is the booking ID. Therefore this value is set to the service ID.
         * + in most cases, this field is the name as `catalogReference.catalogItemId`.
         * + Used in membership validation.
         */
        rootCatalogItemId?: string | null;
        /**
         * Optional - partial payment for the given item to be paid upfront during the checkout.
         * Eligible for catalog items with type `DEPOSIT_ONLINE`.
         * If omitted - item's price will not be split and is expected to be paid in single installment
         */
        depositAmount?: string | null;
        /** Catalog and item reference. Includes IDs for the item and the catalog it came from, as well as further optional info. */
        catalogReference?: CatalogReference;
    }
    interface UpdateCartResponse {
        /** Updated Cart. */
        cart?: Cart;
    }
    interface AddToCurrentCartRequest {
        /** Catalog line items. */
        lineItems?: LineItem[];
    }
    interface AddToCartResponse {
        /** Updated cart. */
        cart?: Cart;
    }
    interface AddToCurrentCartAndEstimateTotalsRequest {
        /** Catalog line items. */
        lineItems?: LineItem[];
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships;
    }
    interface SelectedMemberships {
        /** Selected memberships. */
        memberships?: HostSelectedMembership[];
    }
    interface HostSelectedMembership {
        /** Membership ID. */
        _id?: string;
        /** ID of the app providing this payment option. */
        appId?: string;
        /** IDs of the line items this membership applies to. */
        lineItemIds?: string[];
    }
    interface EstimateTotalsResponse {
        /** Cart. */
        cart?: Cart;
        /** Calculated line items. */
        calculatedLineItems?: CalculatedLineItem[];
        /** Price summary. */
        priceSummary?: PriceSummary;
        /** Applied gift card. */
        giftCard?: GiftCard;
        /** Tax summary. */
        taxSummary?: TaxSummary;
        /** Shipping information. */
        shippingInfo?: ShippingInformation;
        /** Applied discounts. */
        appliedDiscounts?: AppliedDiscount[];
        /** Calculation errors. */
        calculationErrors?: CalculationErrors;
        /**
         * Weight measurement unit - defaults to site's weight unit. Supported values:
         * + `"KG"`
         * + `"LB"`
         */
        weightUnit?: WeightUnit;
        /** Currency used for pricing in this store. */
        currency?: string;
        /**
         * Minimal amount to pay in order to place the order.
         * @readonly
         */
        payNow?: PriceSummary;
        /**
         * Remaining amount for the order to be fully paid.
         * @readonly
         */
        payLater?: PriceSummary;
        /** Information about valid and invalid memberships, and which ones are selected for usage. */
        membershipOptions?: MembershipOptions;
        /** Additional fees */
        additionalFees?: AdditionalFee[];
        /**
         * List of validation violations raised by the [Validations Custom Extension SPI](https://www.wix.com/velo/reference/spis/wix-ecom/ecom-validations/introduction).
         * @readonly
         */
        violations?: Violation[];
    }
    interface CalculatedLineItem {
        /** Line item ID. */
        lineItemId?: string;
        /** Price breakdown for this line item. */
        pricesBreakdown?: LineItemPricesData;
        /**
         * Type of selected payment option for current item. Defaults to `"FULL_PAYMENT_ONLINE"`.
         * + `"FULL_PAYMENT_ONLINE"` - The entire payment for this item happens as part of the checkout.
         * + `"FULL_PAYMENT_OFFLINE"` - The entire payment for this item happens after the checkout. For example, when using cash, check, or other offline payment methods.
         * + `"MEMBERSHIP"` - Payment for this item is done by charging a membership. When this option is used, `lineItem.price.amount` will be 0.
         */
        paymentOption?: PaymentOptionType;
    }
    interface LineItemPricesData {
        /** Total price after discounts and after tax. */
        totalPriceAfterTax?: MultiCurrencyPrice;
        /** Total price after discounts, and before tax. */
        totalPriceBeforeTax?: MultiCurrencyPrice;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails;
        /** Total discount for all line items. */
        totalDiscount?: MultiCurrencyPrice;
        /** Catalog price after catalog discount and automatic discounts. */
        price?: MultiCurrencyPrice;
        /** Item price **before** line item discounts and **after** catalog-defined discount. Defaults to `price` when not provided. */
        priceBeforeDiscounts?: MultiCurrencyPrice;
        /** Total price **after** catalog-defined discount and line item discounts. */
        lineItemPrice?: MultiCurrencyPrice;
        /** Item price **before** line item discounts and **before** catalog-defined discount. Defaults to `price` when not provided. */
        fullPrice?: MultiCurrencyPrice;
    }
    interface ItemTaxFullDetails {
        /** Amount for which tax is calculated. */
        taxableAmount?: MultiCurrencyPrice;
        /** Tax rate %, as a decimal point between 0 and 1. */
        taxRate?: string;
        /** Calculated tax, based on `taxable_amount` and `tax_rate`. */
        totalTax?: MultiCurrencyPrice;
        /**
         * If breakdown exists, the sum of rates in the breakdown must equal `tax_rate`. Deprecated - use 'tax_breakdown' instead.
         * @readonly
         */
        rateBreakdown?: TaxRateBreakdown[];
    }
    interface TaxRateBreakdown {
        /** Name of tax against which the calculation was performed. */
        name?: string;
        /** Rate at which this tax detail was calculated. */
        rate?: string;
        /** Amount of tax for this tax detail. */
        tax?: MultiCurrencyPrice;
    }
    /**
     * TaxBreakdown represents tax information for a line item.
     * It holds the tax amount and the tax rate for each tax authority that apply on the line item.
     */
    interface TaxBreakdown {
        /** The name of the jurisdiction to which this tax detail applies. For example, "New York" or "Quebec". */
        jurisdiction?: string | null;
        /** The amount of this line item price that was considered nontaxable. (Decimal value) */
        nonTaxableAmount?: MultiCurrencyPrice;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.0000 signifies 200% tax. (Decimal value) */
        rate?: string | null;
        /** The amount of tax estimated for this line item. (Decimal value) */
        taxAmount?: MultiCurrencyPrice;
        /** The taxable amount of this line item. */
        taxableAmount?: MultiCurrencyPrice;
        /** The type of tax that was calculated. Depends on the jurisdiction's tax laws. For example, "Sales Tax", "Income Tax", "Value Added Tax", etc. */
        taxType?: string | null;
        /**
         * The name of the tax against which this tax amount was calculated. For example, "NY State Sales Tax", "Quebec GST", etc.
         * This name should be explicit enough to allow the merchant to understand what tax was calculated.
         */
        taxName?: string | null;
        /** The type of the jurisdiction in which this tax detail applies. */
        jurisdictionType?: JurisdictionType;
    }
    /** JurisdictionType represents the type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
    enum JurisdictionType {
        UNDEFINED = "UNDEFINED",
        COUNTRY = "COUNTRY",
        STATE = "STATE",
        COUNTY = "COUNTY",
        CITY = "CITY",
        SPECIAL = "SPECIAL"
    }
    interface PriceSummary {
        /** Subtotal of all line items, before discounts and before tax. */
        subtotal?: MultiCurrencyPrice;
        /** Total shipping price, before discounts and before tax. */
        shipping?: MultiCurrencyPrice;
        /** Total tax. */
        tax?: MultiCurrencyPrice;
        /** Total calculated discount value. */
        discount?: MultiCurrencyPrice;
        /** Total price after discounts, gift cards, and tax. */
        total?: MultiCurrencyPrice;
        /** Total additional fees price before tax. */
        additionalFees?: MultiCurrencyPrice;
    }
    interface GiftCard {
        /** Gift Card ID. */
        _id?: string;
        /** Gift card obfuscated code. */
        obfuscatedCode?: string;
        /** Gift card value. */
        amount?: MultiCurrencyPrice;
        /** App ID of the gift card provider. */
        appId?: string;
    }
    interface TaxSummary {
        /**
         * Amount for which tax is calculated, added from line items.
         * @readonly
         */
        taxableAmount?: MultiCurrencyPrice;
        /**
         * Calculated tax, added from line items.
         * @readonly
         */
        totalTax?: MultiCurrencyPrice;
        /** Tax calculator that was active when the order was created. */
        calculationDetails?: TaxCalculationDetails;
    }
    interface TaxCalculationDetails extends TaxCalculationDetailsCalculationDetailsOneOf {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason;
        /** Error details and reason for tax rate fallback. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails;
        /**
         * Rate calculation type. Supported values:
         * + `"AUTO_RATE"`
         * + `"FALLBACK_RATE"`
         * + `"MANUAL_RATE"`
         * + `"NO_TAX_COLLECTED"`
         */
        rateType?: RateType;
    }
    /** @oneof */
    interface TaxCalculationDetailsCalculationDetailsOneOf {
        /** Reason the manual calculation was used. */
        manualRateReason?: ManualCalculationReason;
        /** Details of the fallback rate calculation. */
        autoTaxFallbackDetails?: AutoTaxFallbackCalculationDetails;
    }
    enum RateType {
        /** no tax being collected for this request due to location of purchase */
        NO_TAX_COLLECTED = "NO_TAX_COLLECTED",
        /** manual rate used for calculation */
        MANUAL_RATE = "MANUAL_RATE",
        /** autotax rate used for calculation */
        AUTO_RATE = "AUTO_RATE",
        /** fallback rate used for calculation */
        FALLBACK_RATE = "FALLBACK_RATE"
    }
    enum ManualCalculationReason {
        /** user set calculator in Business Manager to be Manual */
        GLOBAL_SETTING_TO_MANUAL = "GLOBAL_SETTING_TO_MANUAL",
        /** specific region is on manual even though Global setting is Auto-tax */
        REGION_SETTING_TO_MANUAL = "REGION_SETTING_TO_MANUAL"
    }
    interface AutoTaxFallbackCalculationDetails {
        /**
         * Reason for fallback. Supported values:
         * + `"AUTO_TAX_FAILED"`
         * + `"AUTO_TAX_DEACTIVATED"`
         */
        fallbackReason?: FallbackReason;
        /** invalid request (i.e. address), timeout, internal error, license error, and others will be encoded here */
        error?: ApplicationError;
    }
    enum FallbackReason {
        /** auto-tax failed to be calculated */
        AUTO_TAX_FAILED = "AUTO_TAX_FAILED",
        /** auto-tax was temporarily deactivated on a system-level */
        AUTO_TAX_DEACTIVATED = "AUTO_TAX_DEACTIVATED"
    }
    interface ApplicationError {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    /**
     * The summary of the tax breakdown for all the line items. It will hold for each tax name, the aggregated tax amount paid for it and the tax rate.
     * Tax breakdown is the tax amount split to the tax authorities that applied on the line item.
     */
    interface AggregatedTaxBreakdown {
        /** The name of the tax against which this tax amount was calculated. */
        taxName?: string;
        /** The type of tax that was calculated. Depends on the company's nexus settings as well as the jurisdiction's tax laws. */
        taxType?: string;
        /** The name of the jurisdiction in which this tax detail applies. */
        jurisdiction?: string;
        /** The type of the jurisdiction in which this tax detail applies (e.g. Country,State,County,City,Special). */
        jurisdictionTypeEnum?: JurisdictionType;
        /** The rate at which this tax detail was calculated, e.g 0.1000 signifies 10% tax and 2.000 signifies 200% tax. (Decimal value) */
        rate?: string;
        /** The sum of all the tax from line items that calculated by the tax identifiers. */
        aggregatedTaxAmount?: MultiCurrencyPrice;
    }
    interface ShippingInformation {
        /** Shipping region. */
        region?: ShippingRegion;
        /** Selected shipping option. */
        selectedCarrierServiceOption?: SelectedCarrierServiceOption;
        /** All shipping options. */
        carrierServiceOptions?: CarrierServiceOption[];
    }
    interface ShippingRegion {
        /**
         * Shipping region ID.
         * @readonly
         */
        _id?: string;
        /** Shipping region name. */
        name?: string;
    }
    interface SelectedCarrierServiceOption {
        /** Unique identifier of selected option. For example, "usps_std_overnight". */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         * @readonly
         */
        title?: string;
        /**
         * Delivery logistics.
         * @readonly
         */
        logistics?: DeliveryLogistics;
        /**
         * Shipping costs.
         * @readonly
         */
        cost?: SelectedCarrierServiceOptionPrices;
        /**
         * Were we able to find the requested shipping option, or otherwise we fallback to the default one (the first)
         * @readonly
         */
        requestedShippingOption?: boolean;
        /** Other charges */
        otherCharges?: SelectedCarrierServiceOptionOtherCharge[];
        /** This carrier's unique ID */
        carrierId?: string | null;
    }
    interface DeliveryLogistics {
        /** Expected delivery time, in free text. For example, "3-5 business days". */
        deliveryTime?: string | null;
        /** Instructions for caller, e.g for pickup: "Please deliver during opening hours, and please don't park in disabled parking spot". */
        instructions?: string | null;
        /** Pickup details. */
        pickupDetails?: PickupDetails;
    }
    interface PickupDetails {
        /** Pickup address. */
        address?: Address;
        /** Whether the pickup address is that of a business - this may effect tax calculation. */
        businessLocation?: boolean;
        /** Pickup method */
        pickupMethod?: PickupMethod;
    }
    enum PickupMethod {
        UNKNOWN_METHOD = "UNKNOWN_METHOD",
        STORE_PICKUP = "STORE_PICKUP",
        PICKUP_POINT = "PICKUP_POINT"
    }
    interface DeliveryTimeSlot {
        /** starting time of the delivery time slot */
        from?: Date;
        /** ending time of the delivery time slot */
        to?: Date;
    }
    interface SelectedCarrierServiceOptionPrices {
        /** Total shipping price, after discount and after tax. */
        totalPriceAfterTax?: MultiCurrencyPrice;
        /** Total price of shipping after discounts (when relevant), and before tax. */
        totalPriceBeforeTax?: MultiCurrencyPrice;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails;
        /** Shipping discount before tax. */
        totalDiscount?: MultiCurrencyPrice;
        /** Shipping price before discount and before tax. */
        price?: MultiCurrencyPrice;
    }
    interface SelectedCarrierServiceOptionOtherCharge {
        /** Type of additional cost. */
        type?: ChargeType;
        /** Details of the charge, such as 'Full Coverage Insurance of up to 80% of value of shipment'. */
        details?: string | null;
        /** Price of added charge. */
        cost?: SelectedCarrierServiceOptionPrices;
    }
    enum ChargeType {
        HANDLING_FEE = "HANDLING_FEE",
        INSURANCE = "INSURANCE"
    }
    interface CarrierServiceOption {
        /** Carrier ID. */
        carrierId?: string;
        /** Shipping options offered by this carrier for this request. */
        shippingOptions?: ShippingOption[];
    }
    interface ShippingOption {
        /**
         * Unique code of provided shipping option like "usps_std_overnight".
         * For legacy calculators this would be the UUID of the option.
         */
        code?: string;
        /**
         * Title of the option, such as USPS Standard Overnight Delivery (in the requested locale).
         * For example, "Standard" or "First-Class Package International".
         */
        title?: string;
        /** Delivery logistics. */
        logistics?: DeliveryLogistics;
        /** Sipping price information. */
        cost?: ShippingPrice;
    }
    interface ShippingPrice {
        /** Shipping price. */
        price?: MultiCurrencyPrice;
        /** Other costs such as insurance, handling & packaging for fragile items, etc. */
        otherCharges?: OtherCharge[];
    }
    interface OtherCharge {
        /** Type of additional cost. */
        type?: ChargeType;
        /** Price of added cost. */
        price?: MultiCurrencyPrice;
    }
    interface AppliedDiscount extends AppliedDiscountDiscountSourceOneOf {
        /** Coupon details. */
        coupon?: V1Coupon;
        /** Merchant discount. */
        merchantDiscount?: V1MerchantDiscount;
        /** Discount rule */
        discountRule?: DiscountRule;
        /** Discount type. */
        discountType?: DiscountType;
        /** IDs of the line items the discount applies to. */
        lineItemIds?: string[];
    }
    /** @oneof */
    interface AppliedDiscountDiscountSourceOneOf {
        /** Coupon details. */
        coupon?: V1Coupon;
        /** Merchant discount. */
        merchantDiscount?: V1MerchantDiscount;
        /** Discount rule */
        discountRule?: DiscountRule;
    }
    enum DiscountType {
        GLOBAL = "GLOBAL",
        SPECIFIC_ITEMS = "SPECIFIC_ITEMS",
        SHIPPING = "SHIPPING"
    }
    /** Coupon */
    interface V1Coupon {
        /** Coupon ID. */
        _id?: string;
        /** Coupon code. */
        code?: string;
        /** Coupon value. */
        amount?: MultiCurrencyPrice;
        /** Coupon name. */
        name?: string;
    }
    interface V1MerchantDiscount {
        /** Discount value. */
        amount?: MultiCurrencyPrice;
        /** Discount Percentage. Will be calculated from items price before other discounts. */
        percentage?: number | null;
    }
    interface DiscountRule {
        /** Discount rule ID */
        _id?: string;
        /** Discount rule name */
        name?: DiscountRuleName;
        /** Discount value. */
        amount?: MultiCurrencyPrice;
    }
    interface DiscountRuleName {
        /** Original discount rule name (in site's default language). */
        original?: string;
        /** Discount rule name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface LineItemDiscount {
        /** ID of line item the discount applies to. */
        _id?: string;
        /** Discount value. */
        totalDiscountAmount?: MultiCurrencyPrice;
    }
    interface CalculationErrors extends CalculationErrorsShippingCalculationErrorOneOf {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors;
        /** Tax calculation error. */
        taxCalculationError?: Details;
        /** Coupon calculation error. */
        couponCalculationError?: Details;
        /** Gift card calculation error. */
        giftCardCalculationError?: Details;
        /** Order validation errors. */
        orderValidationErrors?: ApplicationError[];
        /**
         * Membership payment methods calculation errors
         * For example, will indicate that a line item that must be paid with membership payment doesn't have one or selected memberships are invalid
         */
        membershipError?: Details;
        /** Discount Rule calculation error. */
        discountsCalculationError?: Details;
    }
    /** @oneof */
    interface CalculationErrorsShippingCalculationErrorOneOf {
        /** General shipping calculation error. */
        generalShippingCalculationError?: Details;
        /** Carrier errors. */
        carrierErrors?: CarrierErrors;
    }
    interface Details extends DetailsKindOneOf {
        applicationError?: ApplicationError;
        validationError?: ValidationError;
        systemError?: SystemError;
        /** Deprecated in APIs. Used to enable migration from rendering arbitrary tracing to rest response. */
        tracing?: Record<string, string>;
    }
    /** @oneof */
    interface DetailsKindOneOf {
        applicationError?: ApplicationError;
        validationError?: ValidationError;
        systemError?: SystemError;
    }
    /**
     * example result:
     * {
     * "fieldViolations": [
     * {
     * "field": "fieldA",
     * "description": "invalid music note. supported notes: [do,re,mi,fa,sol,la,ti]",
     * "violatedRule": "OTHER",
     * "ruleName": "INVALID_NOTE",
     * "data": {
     * "value": "FI"
     * }
     * },
     * {
     * "field": "fieldB",
     * "description": "field value out of range. supported range: [0-20]",
     * "violatedRule": "MAX",
     * "data": {
     * "threshold": 20
     * }
     * },
     * {
     * "field": "fieldC",
     * "description": "invalid phone number. provide a valid phone number of size: [7-12], supported characters: [0-9, +, -, (, )]",
     * "violatedRule": "FORMAT",
     * "data": {
     * "type": "PHONE"
     * }
     * }
     * ]
     * }
     */
    interface ValidationError {
        fieldViolations?: FieldViolation[];
    }
    enum RuleType {
        VALIDATION = "VALIDATION",
        OTHER = "OTHER",
        MAX = "MAX",
        MIN = "MIN",
        MAX_LENGTH = "MAX_LENGTH",
        MIN_LENGTH = "MIN_LENGTH",
        MAX_SIZE = "MAX_SIZE",
        MIN_SIZE = "MIN_SIZE",
        FORMAT = "FORMAT",
        DECIMAL_LTE = "DECIMAL_LTE",
        DECIMAL_GTE = "DECIMAL_GTE",
        DECIMAL_LT = "DECIMAL_LT",
        DECIMAL_GT = "DECIMAL_GT",
        DECIMAL_MAX_SCALE = "DECIMAL_MAX_SCALE",
        INVALID_ENUM_VALUE = "INVALID_ENUM_VALUE",
        REQUIRED_FIELD = "REQUIRED_FIELD",
        FIELD_NOT_ALLOWED = "FIELD_NOT_ALLOWED",
        ONE_OF_ALIGNMENT = "ONE_OF_ALIGNMENT"
    }
    interface FieldViolation {
        field?: string;
        description?: string;
        violatedRule?: RuleType;
        /** applicable when violated_rule=OTHER */
        ruleName?: string | null;
        data?: Record<string, any> | null;
    }
    interface SystemError {
        /** Error code. */
        errorCode?: string | null;
    }
    interface CarrierErrors {
        /** Carrier errors. */
        errors?: CarrierError[];
    }
    interface CarrierError {
        /** Carrier ID. */
        carrierId?: string;
        /** Error details. */
        error?: Details;
    }
    interface MembershipOptions {
        /** List of payment options that can be used. */
        eligibleMemberships?: Membership[];
        /** List of payment options that are owned by the member, but cannot be used due to reason provided. */
        invalidMemberships?: InvalidMembership[];
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: HostSelectedMembership[];
    }
    interface Membership {
        /** Membership ID. */
        _id?: string;
        /** ID of the application providing this payment option. */
        appId?: string;
        /** The name of this membership. */
        name?: MembershipName;
        /** Line item IDs which are "paid" for by this membership. */
        lineItemIds?: string[];
        /** Optional - For a membership that has limited credits, information about credit usage. */
        credits?: MembershipPaymentCredits;
        /** Optional - TMembership expiry date. */
        expirationDate?: Date;
        /** Additional data about this membership. */
        additionalData?: Record<string, any> | null;
    }
    interface MembershipName {
        /** The name of this membership */
        original?: string;
        /** Membership name translated into buyer's language. Defaults to `original` when not defined. */
        translated?: string | null;
    }
    interface MembershipPaymentCredits {
        /** How much credit this membership has in total */
        total?: number;
        /** How much credit remained for this membership */
        remaining?: number;
    }
    interface InvalidMembership {
        /** Membership details. */
        membership?: Membership;
        /** Reason why this membership is invalid and cannot be used. */
        reason?: string;
    }
    interface AdditionalFee {
        /** Additional fee's unique code (or ID) for future processing. */
        code?: string | null;
        /** Translated additional fee's name. */
        name?: string;
        /** Additional fee's price. */
        price?: MultiCurrencyPrice;
        /** Tax details. */
        taxDetails?: ItemTaxFullDetails;
        /** Provider's app id. */
        providerAppId?: string | null;
        /** Additional fee's price before tax. */
        priceBeforeTax?: MultiCurrencyPrice;
        /**
         * Optional - Line items associated with this additional fee.
         * If no `lineItemIds` are provided, the fee will be associated with the whole cart/checkout/order.
         */
        lineItemIds?: string[];
    }
    interface Violation {
        /** Severity of the violation. The violations are shown on the cart and checkout pages. A warning is displayed as yellow, and allows a site visitor to proceed with caution. An error is displayed as red, and doesn't allow a site visitor to proceed with the eCommerce flow. */
        severity?: Severity;
        /** Target location on a checkout or cart page where the violation will be displayed. */
        target?: Target;
        /** Violation description. Can include rich text. Only HTTP or HTTPS links in the following format are allowed: `<a href="https://www.wix.com">Click me</a>`. */
        description?: string | null;
    }
    enum Severity {
        /** The user is allowed to move forward in the flow. */
        WARNING = "WARNING",
        /**
         * The user is blocked from moving forward in the flow.
         * For example, if callerContext is CART - moving to checkout is blocked. if callerContext is CHECKOUT, placing an order is blocked.
         */
        ERROR = "ERROR"
    }
    interface Target extends TargetTargetTypeOneOf {
        /** General (other) violation. */
        other?: Other;
        /** Specific line item violation. */
        lineItem?: TargetLineItem;
    }
    /** @oneof */
    interface TargetTargetTypeOneOf {
        /** General (other) violation. */
        other?: Other;
        /** Specific line item violation. */
        lineItem?: TargetLineItem;
    }
    /** Available locations on the webpage */
    enum NameInOther {
        /** default location, in case no specific location is specified */
        OTHER_DEFAULT = "OTHER_DEFAULT"
    }
    /** Available locations on the line item */
    enum NameInLineItem {
        /** default location, in case no specific location is specified */
        LINE_ITEM_DEFAULT = "LINE_ITEM_DEFAULT"
    }
    /** General (other) violation. */
    interface Other {
        /** Location on a checkout or a cart page where a general (other) violation will be displayed. */
        name?: NameInOther;
    }
    /** Specific line item violation. */
    interface TargetLineItem {
        /** Location on a checkout or a cart page where the specific line item violation will be displayed. */
        name?: NameInLineItem;
        /** ID of the line item containing the violation. */
        _id?: string | null;
    }
    interface RemoveLineItemsFromCurrentCartRequest {
        /** IDs of the line items to remove from the cart. */
        lineItemIds: string[];
    }
    interface RemoveLineItemsResponse {
        /** Updated cart. */
        cart?: Cart;
    }
    interface CreateCheckoutFromCurrentCartRequest {
        /**
         * **Required**. Sales channel type. Supported values:
         * + `"AMAZON"`
         * + `"BACKOFFICE_MERCHANT"`
         * + `"EBAY"`
         * + `"OTHER_PLATFORM"`
         * + `"POS"`
         * + `"WEB"`
         * + `"WISH"`
         * + `"WIX_APP_STORE"`
         * + `"WIX_INVOICES"`
         */
        channelType?: ChannelType;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Mandatory when setting a billing or shipping address if the site visitor isn't logged in. */
        email?: string | null;
    }
    enum ChannelType {
        UNSPECIFIED = "UNSPECIFIED",
        WEB = "WEB",
        POS = "POS",
        EBAY = "EBAY",
        AMAZON = "AMAZON",
        OTHER_PLATFORM = "OTHER_PLATFORM",
        WIX_APP_STORE = "WIX_APP_STORE",
        WIX_INVOICES = "WIX_INVOICES",
        BACKOFFICE_MERCHANT = "BACKOFFICE_MERCHANT",
        WISH = "WISH",
        CLASS_PASS = "CLASS_PASS",
        GLOBAL_E = "GLOBAL_E",
        FACEBOOK = "FACEBOOK",
        ETSY = "ETSY",
        TIKTOK = "TIKTOK",
        FAIRE_COM = "FAIRE_COM"
    }
    interface CreateCheckoutResponse {
        /** The newly created checkout's ID. */
        checkoutId?: string;
    }
    interface RemoveCouponFromCurrentCartRequest {
    }
    interface RemoveCouponResponse {
        /** Updated cart. */
        cart?: Cart;
    }
    interface UpdateCurrentCartLineItemQuantityRequest {
        /** Line item IDs and their new quantity. */
        lineItems: LineItemQuantityUpdate[];
    }
    interface LineItemQuantityUpdate {
        /** Line item ID. Required. */
        _id?: string;
        /** New quantity. Number must be 1 or higher. Required. */
        quantity?: number;
    }
    interface UpdateLineItemsQuantityResponse {
        /** Updated cart. */
        cart?: Cart;
    }
    interface EstimateCurrentCartTotalsRequest {
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships;
    }
    interface DeleteCurrentCartRequest {
    }
    interface DeleteCartResponse {
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
    }
    interface EntityUpdatedEvent {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent {
        bodyAsJson?: string;
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
    interface CreateCartRequest {
        /** Cart info. */
        cartInfo?: Cart;
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will apply to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput[];
        /** Catalog line items. */
        lineItems?: LineItem[];
    }
    interface CreateCartResponse {
        /** Cart. */
        cart?: Cart;
    }
    interface GetCartRequest {
        /** ID of the cart to retrieve. */
        _id: string;
    }
    interface GetCartResponse {
        /** The requested cart. */
        cart?: Cart;
    }
    interface GetCartByCheckoutIdRequest {
        /** Checkout ID. */
        _id: string;
    }
    interface GetCartByCheckoutIdResponse {
        /** The requested cart. */
        cart?: Cart;
    }
    interface AddToCartRequest {
        /** Cart ID. */
        _id: string;
        /** Catalog line items. */
        lineItems?: LineItem[];
    }
    interface RemoveLineItemsRequest {
        /** Cart ID. */
        _id: string;
        /** IDs of the line items to remove from the cart. */
        lineItemIds: string[];
    }
    interface CreateCheckoutRequest {
        /** Cart ID. */
        _id: string;
        /**
         * **Required**. Sales channel type. Supported values:
         * + `"AMAZON"`
         * + `"BACKOFFICE_MERCHANT"`
         * + `"EBAY"`
         * + `"OTHER_PLATFORM"`
         * + `"POS"`
         * + `"WEB"`
         * + `"WISH"`
         * + `"WIX_APP_STORE"`
         * + `"WIX_INVOICES"`
         */
        channelType?: ChannelType;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Mandatory when setting a billing or shipping address if the site visitor isn't logged in. */
        email?: string | null;
    }
    interface RemoveCouponRequest {
        /** Cart ID. */
        _id: string;
    }
    interface UpdateLineItemsQuantityRequest {
        /** Cart ID. */
        _id: string;
        /** Line item IDs and their new quantity. */
        lineItems: LineItemQuantityUpdate[];
    }
    interface EstimateTotalsRequest {
        /** Cart ID. */
        _id: string;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships;
    }
    interface DeleteCartRequest {
        /** ID of the cart to delete. */
        _id: string;
    }
    interface Empty {
    }
    /**
     * Retrieves the current site visitor's cart.
     *
     *
     * The `getCurrentCart()` function returns a Promise that resolves when the current cart is retrieved.
     * @public
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Current session's active cart.
     */
    function getCurrentCart(): Promise<Cart>;
    /**
     * Updates the current site visitor's cart.
     *
     *
     * The `updateCurrentCart()` function returns a Promise that resolves when the current cart's properties are updated.
     *
     * > **Note:** When updating catalog items, `options.lineItems.catalogReference` is required.
     * @public
     * @requiredField options.lineItems.catalogReference
     * @param options - Current cart update options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - The updated current cart.
     */
    function updateCurrentCart(options?: UpdateCurrentCartOptions): Promise<Cart>;
    interface UpdateCurrentCartOptions {
        /** Cart info. */
        cartInfo?: Cart;
        /** The code of an existing coupon to apply to the cart. For more information, see the [Coupons API](https://www.wix.com/velo/reference/wix-marketing-backend/coupons). */
        couponCode?: string | null;
        /** Merchant discounts to apply to specific line items. If no `lineItemIds` are passed, the discount will be applied to the whole cart. */
        merchantDiscounts?: MerchantDiscountInput[];
        /** Catalog line items. */
        lineItems?: LineItem[];
    }
    /**
     * Adds catalog line items to the current site visitor's cart.
     *
     *
     * The `addToCurrentCart()` function returns a Promise that resolves to the updated current cart when the specified items have been added.
     *
     * > **Note:** When adding catalog items, `options.lineItems.catalogReference` is required.
     * @public
     * @requiredField options.lineItems.catalogReference
     * @requiredField options.lineItems.quantity
     * @requiredField options.lineItems.selectedMembership._id
     * @requiredField options.lineItems.selectedMembership.appId
     * @param options - Items to be added to the current cart.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function addToCurrentCart(options?: AddToCurrentCartOptions): Promise<AddToCartResponse>;
    interface AddToCurrentCartOptions {
        /** Catalog line items. */
        lineItems?: LineItem[];
    }
    /**
     * Removes line items from the current site visitor's cart.
     *
     *
     * The `removeLineItemsFromCurrentCart()` function returns a Promise that resolves to the updated current cart when the line items are removed.
     * @public
     * @requiredField lineItemIds
     * @param lineItemIds - IDs of the line items to remove from the cart.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function removeLineItemsFromCurrentCart(lineItemIds: string[]): Promise<RemoveLineItemsResponse>;
    /**
     * Creates a checkout from the current site visitor’s cart.
     *
     *
     * The `createCheckoutFromCurrentCart()` function returns a Promise that resolves to the new checkout's ID when it's created.
     *
     * If a checkout was already created from the current cart, that checkout will be updated with any new information from the cart.
     *
     * > **Note:** `options.channelType` is a required field.
     * @public
     * @param options - Checkout creation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function createCheckoutFromCurrentCart(options?: CreateCheckoutFromCurrentCartOptions): Promise<CreateCheckoutResponse>;
    interface CreateCheckoutFromCurrentCartOptions {
        /**
         * **Required**. Sales channel type. Supported values:
         * + `"AMAZON"`
         * + `"BACKOFFICE_MERCHANT"`
         * + `"EBAY"`
         * + `"OTHER_PLATFORM"`
         * + `"POS"`
         * + `"WEB"`
         * + `"WISH"`
         * + `"WIX_APP_STORE"`
         * + `"WIX_INVOICES"`
         */
        channelType?: ChannelType;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Mandatory when setting a billing or shipping address if the site visitor isn't logged in. */
        email?: string | null;
    }
    /**
     * Removes the coupon from the current site visitor's cart.
     *
     *
     * The `removeCouponFromCurrentCart()` function returns a Promise that resolves to the updated current cart when the coupon is removed.
     * @public
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - Updated current cart.
     */
    function removeCouponFromCurrentCart(): Promise<RemoveCouponResponse>;
    /**
     * Updates the quantity of one or more line items in the current site visitor's cart.
     *
     *
     * The `updateCurrentCartLineItemQuantity()` function returns a Promise that resolves when the quantities of the current cart's line items are updated. This endpoint is only for updating the quantity of line items. To entirely remove a line item from the current cart, use [`removeLineItemsFromCurrentCart()`](#removelineitemsfromcurrentcart).
     * To add a new line item to the current cart, use [`addToCurrentCart()`](#addtocurrentcart).
     *
     * This endpoint checks the amount of stock remaining for this line item. If the specified `quantity` is greater than the remaining stock, then the `quantity` returned in the response is the total amount of remaining stock.
     * @param lineItems - Line item IDs and their new quantity.
     * @public
     * @requiredField lineItems
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - The updated current cart.
     */
    function updateCurrentCartLineItemQuantity(lineItems: LineItemQuantityUpdate[]): Promise<UpdateLineItemsQuantityResponse>;
    /**
     * Estimates the current cart's price totals (including tax), based on a selected carrier service, shipping address, and billing information.
     *
     *
     * The `estimateCurrentCartTotals()` function returns a Promise that resolves when the estimated totals are generated.
     *
     * > **Note:** Not passing any `options` properties will only estimate the cart items price totals.
     * @public
     * @param options - Total estimation options.
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Read eCommerce - all read permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.READ-ECOM
     * @permissionScope Read Orders
     * @permissionScopeId SCOPE.DC-STORES.READ-ORDERS
     * @permissionScope Read Stores - all read permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.READ-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @permissionScope Manage Orders
     * @permissionScopeId SCOPE.DC-STORES.MANAGE-ORDERS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function estimateCurrentCartTotals(options?: EstimateCurrentCartTotalsOptions): Promise<EstimateTotalsResponse>;
    interface EstimateCurrentCartTotalsOptions {
        /** Selected shipping option. */
        selectedShippingOption?: SelectedShippingOption;
        /** Shipping address. Used for calculating tax and shipping (when applicable). */
        shippingAddress?: Address;
        /** Billing address. Used for calculating tax if all the items in the cart are not shippable. */
        billingAddress?: Address;
        /** The selected membership payment options and which line items they apply to. */
        selectedMemberships?: SelectedMemberships;
    }
    /**
     * Deletes the current site visitor's cart.
     *
     *
     * The `deleteCurrentCart()` function returns a Promise that resolves when the current cart is deleted.
     * @public
     * @permissionScope Manage Stores - all permissions
     * @permissionScopeId SCOPE.DC-STORES-MEGA.MANAGE-STORES
     * @permissionScope Manage eCommerce - all permissions
     * @permissionScopeId SCOPE.DC-ECOM-MEGA.MANAGE-ECOM
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Fulfilled - When the current cart is deleted. Rejected - Error message.
     */
    function deleteCurrentCart(): Promise<void>;
    type ecomV1CartCurrentCart_universal_d_Cart = Cart;
    type ecomV1CartCurrentCart_universal_d_LineItem = LineItem;
    type ecomV1CartCurrentCart_universal_d_CatalogReference = CatalogReference;
    type ecomV1CartCurrentCart_universal_d_ProductName = ProductName;
    type ecomV1CartCurrentCart_universal_d_MultiCurrencyPrice = MultiCurrencyPrice;
    type ecomV1CartCurrentCart_universal_d_DescriptionLine = DescriptionLine;
    type ecomV1CartCurrentCart_universal_d_DescriptionLineValueOneOf = DescriptionLineValueOneOf;
    type ecomV1CartCurrentCart_universal_d_DescriptionLineDescriptionLineValueOneOf = DescriptionLineDescriptionLineValueOneOf;
    type ecomV1CartCurrentCart_universal_d_DescriptionLineName = DescriptionLineName;
    type ecomV1CartCurrentCart_universal_d_PlainTextValue = PlainTextValue;
    type ecomV1CartCurrentCart_universal_d_Color = Color;
    type ecomV1CartCurrentCart_universal_d_DescriptionLineType = DescriptionLineType;
    const ecomV1CartCurrentCart_universal_d_DescriptionLineType: typeof DescriptionLineType;
    type ecomV1CartCurrentCart_universal_d_ItemAvailabilityInfo = ItemAvailabilityInfo;
    type ecomV1CartCurrentCart_universal_d_ItemAvailabilityStatus = ItemAvailabilityStatus;
    const ecomV1CartCurrentCart_universal_d_ItemAvailabilityStatus: typeof ItemAvailabilityStatus;
    type ecomV1CartCurrentCart_universal_d_PhysicalProperties = PhysicalProperties;
    type ecomV1CartCurrentCart_universal_d_Scope = Scope;
    type ecomV1CartCurrentCart_universal_d_Group = Group;
    type ecomV1CartCurrentCart_universal_d_ItemType = ItemType;
    type ecomV1CartCurrentCart_universal_d_ItemTypeItemTypeDataOneOf = ItemTypeItemTypeDataOneOf;
    type ecomV1CartCurrentCart_universal_d_ItemTypeItemType = ItemTypeItemType;
    const ecomV1CartCurrentCart_universal_d_ItemTypeItemType: typeof ItemTypeItemType;
    type ecomV1CartCurrentCart_universal_d_SubscriptionOptionInfo = SubscriptionOptionInfo;
    type ecomV1CartCurrentCart_universal_d_SubscriptionSettings = SubscriptionSettings;
    type ecomV1CartCurrentCart_universal_d_SubscriptionFrequency = SubscriptionFrequency;
    const ecomV1CartCurrentCart_universal_d_SubscriptionFrequency: typeof SubscriptionFrequency;
    type ecomV1CartCurrentCart_universal_d_Title = Title;
    type ecomV1CartCurrentCart_universal_d_Description = Description;
    type ecomV1CartCurrentCart_universal_d_SecuredMedia = SecuredMedia;
    type ecomV1CartCurrentCart_universal_d_FileType = FileType;
    const ecomV1CartCurrentCart_universal_d_FileType: typeof FileType;
    type ecomV1CartCurrentCart_universal_d_PaymentOptionType = PaymentOptionType;
    const ecomV1CartCurrentCart_universal_d_PaymentOptionType: typeof PaymentOptionType;
    type ecomV1CartCurrentCart_universal_d_ServiceProperties = ServiceProperties;
    type ecomV1CartCurrentCart_universal_d_PriceDescription = PriceDescription;
    type ecomV1CartCurrentCart_universal_d_SelectedMembership = SelectedMembership;
    type ecomV1CartCurrentCart_universal_d_CatalogOverrideFields = CatalogOverrideFields;
    type ecomV1CartCurrentCart_universal_d_BuyerInfo = BuyerInfo;
    type ecomV1CartCurrentCart_universal_d_BuyerInfoIdOneOf = BuyerInfoIdOneOf;
    type ecomV1CartCurrentCart_universal_d_WeightUnit = WeightUnit;
    const ecomV1CartCurrentCart_universal_d_WeightUnit: typeof WeightUnit;
    type ecomV1CartCurrentCart_universal_d_CartDiscount = CartDiscount;
    type ecomV1CartCurrentCart_universal_d_CartDiscountDiscountSourceOneOf = CartDiscountDiscountSourceOneOf;
    type ecomV1CartCurrentCart_universal_d_Coupon = Coupon;
    type ecomV1CartCurrentCart_universal_d_MerchantDiscount = MerchantDiscount;
    type ecomV1CartCurrentCart_universal_d_AddressWithContact = AddressWithContact;
    type ecomV1CartCurrentCart_universal_d_Address = Address;
    type ecomV1CartCurrentCart_universal_d_StreetAddress = StreetAddress;
    type ecomV1CartCurrentCart_universal_d_AddressLocation = AddressLocation;
    type ecomV1CartCurrentCart_universal_d_FullAddressContactDetails = FullAddressContactDetails;
    type ecomV1CartCurrentCart_universal_d_VatId = VatId;
    type ecomV1CartCurrentCart_universal_d_VatType = VatType;
    const ecomV1CartCurrentCart_universal_d_VatType: typeof VatType;
    type ecomV1CartCurrentCart_universal_d_SelectedShippingOption = SelectedShippingOption;
    type ecomV1CartCurrentCart_universal_d_ExtendedFields = ExtendedFields;
    type ecomV1CartCurrentCart_universal_d_GetCurrentCartRequest = GetCurrentCartRequest;
    type ecomV1CartCurrentCart_universal_d_GetCurrentCartResponse = GetCurrentCartResponse;
    type ecomV1CartCurrentCart_universal_d_UpdateCartRequest = UpdateCartRequest;
    type ecomV1CartCurrentCart_universal_d_MerchantDiscountInput = MerchantDiscountInput;
    type ecomV1CartCurrentCart_universal_d_CustomLineItem = CustomLineItem;
    type ecomV1CartCurrentCart_universal_d_UpdateCartResponse = UpdateCartResponse;
    type ecomV1CartCurrentCart_universal_d_AddToCurrentCartRequest = AddToCurrentCartRequest;
    type ecomV1CartCurrentCart_universal_d_AddToCartResponse = AddToCartResponse;
    type ecomV1CartCurrentCart_universal_d_AddToCurrentCartAndEstimateTotalsRequest = AddToCurrentCartAndEstimateTotalsRequest;
    type ecomV1CartCurrentCart_universal_d_SelectedMemberships = SelectedMemberships;
    type ecomV1CartCurrentCart_universal_d_HostSelectedMembership = HostSelectedMembership;
    type ecomV1CartCurrentCart_universal_d_EstimateTotalsResponse = EstimateTotalsResponse;
    type ecomV1CartCurrentCart_universal_d_CalculatedLineItem = CalculatedLineItem;
    type ecomV1CartCurrentCart_universal_d_LineItemPricesData = LineItemPricesData;
    type ecomV1CartCurrentCart_universal_d_ItemTaxFullDetails = ItemTaxFullDetails;
    type ecomV1CartCurrentCart_universal_d_TaxRateBreakdown = TaxRateBreakdown;
    type ecomV1CartCurrentCart_universal_d_TaxBreakdown = TaxBreakdown;
    type ecomV1CartCurrentCart_universal_d_JurisdictionType = JurisdictionType;
    const ecomV1CartCurrentCart_universal_d_JurisdictionType: typeof JurisdictionType;
    type ecomV1CartCurrentCart_universal_d_PriceSummary = PriceSummary;
    type ecomV1CartCurrentCart_universal_d_GiftCard = GiftCard;
    type ecomV1CartCurrentCart_universal_d_TaxSummary = TaxSummary;
    type ecomV1CartCurrentCart_universal_d_TaxCalculationDetails = TaxCalculationDetails;
    type ecomV1CartCurrentCart_universal_d_TaxCalculationDetailsCalculationDetailsOneOf = TaxCalculationDetailsCalculationDetailsOneOf;
    type ecomV1CartCurrentCart_universal_d_RateType = RateType;
    const ecomV1CartCurrentCart_universal_d_RateType: typeof RateType;
    type ecomV1CartCurrentCart_universal_d_ManualCalculationReason = ManualCalculationReason;
    const ecomV1CartCurrentCart_universal_d_ManualCalculationReason: typeof ManualCalculationReason;
    type ecomV1CartCurrentCart_universal_d_AutoTaxFallbackCalculationDetails = AutoTaxFallbackCalculationDetails;
    type ecomV1CartCurrentCart_universal_d_FallbackReason = FallbackReason;
    const ecomV1CartCurrentCart_universal_d_FallbackReason: typeof FallbackReason;
    type ecomV1CartCurrentCart_universal_d_ApplicationError = ApplicationError;
    type ecomV1CartCurrentCart_universal_d_AggregatedTaxBreakdown = AggregatedTaxBreakdown;
    type ecomV1CartCurrentCart_universal_d_ShippingInformation = ShippingInformation;
    type ecomV1CartCurrentCart_universal_d_ShippingRegion = ShippingRegion;
    type ecomV1CartCurrentCart_universal_d_SelectedCarrierServiceOption = SelectedCarrierServiceOption;
    type ecomV1CartCurrentCart_universal_d_DeliveryLogistics = DeliveryLogistics;
    type ecomV1CartCurrentCart_universal_d_PickupDetails = PickupDetails;
    type ecomV1CartCurrentCart_universal_d_PickupMethod = PickupMethod;
    const ecomV1CartCurrentCart_universal_d_PickupMethod: typeof PickupMethod;
    type ecomV1CartCurrentCart_universal_d_DeliveryTimeSlot = DeliveryTimeSlot;
    type ecomV1CartCurrentCart_universal_d_SelectedCarrierServiceOptionPrices = SelectedCarrierServiceOptionPrices;
    type ecomV1CartCurrentCart_universal_d_SelectedCarrierServiceOptionOtherCharge = SelectedCarrierServiceOptionOtherCharge;
    type ecomV1CartCurrentCart_universal_d_ChargeType = ChargeType;
    const ecomV1CartCurrentCart_universal_d_ChargeType: typeof ChargeType;
    type ecomV1CartCurrentCart_universal_d_CarrierServiceOption = CarrierServiceOption;
    type ecomV1CartCurrentCart_universal_d_ShippingOption = ShippingOption;
    type ecomV1CartCurrentCart_universal_d_ShippingPrice = ShippingPrice;
    type ecomV1CartCurrentCart_universal_d_OtherCharge = OtherCharge;
    type ecomV1CartCurrentCart_universal_d_AppliedDiscount = AppliedDiscount;
    type ecomV1CartCurrentCart_universal_d_AppliedDiscountDiscountSourceOneOf = AppliedDiscountDiscountSourceOneOf;
    type ecomV1CartCurrentCart_universal_d_DiscountType = DiscountType;
    const ecomV1CartCurrentCart_universal_d_DiscountType: typeof DiscountType;
    type ecomV1CartCurrentCart_universal_d_V1Coupon = V1Coupon;
    type ecomV1CartCurrentCart_universal_d_V1MerchantDiscount = V1MerchantDiscount;
    type ecomV1CartCurrentCart_universal_d_DiscountRule = DiscountRule;
    type ecomV1CartCurrentCart_universal_d_DiscountRuleName = DiscountRuleName;
    type ecomV1CartCurrentCart_universal_d_LineItemDiscount = LineItemDiscount;
    type ecomV1CartCurrentCart_universal_d_CalculationErrors = CalculationErrors;
    type ecomV1CartCurrentCart_universal_d_CalculationErrorsShippingCalculationErrorOneOf = CalculationErrorsShippingCalculationErrorOneOf;
    type ecomV1CartCurrentCart_universal_d_Details = Details;
    type ecomV1CartCurrentCart_universal_d_DetailsKindOneOf = DetailsKindOneOf;
    type ecomV1CartCurrentCart_universal_d_ValidationError = ValidationError;
    type ecomV1CartCurrentCart_universal_d_RuleType = RuleType;
    const ecomV1CartCurrentCart_universal_d_RuleType: typeof RuleType;
    type ecomV1CartCurrentCart_universal_d_FieldViolation = FieldViolation;
    type ecomV1CartCurrentCart_universal_d_SystemError = SystemError;
    type ecomV1CartCurrentCart_universal_d_CarrierErrors = CarrierErrors;
    type ecomV1CartCurrentCart_universal_d_CarrierError = CarrierError;
    type ecomV1CartCurrentCart_universal_d_MembershipOptions = MembershipOptions;
    type ecomV1CartCurrentCart_universal_d_Membership = Membership;
    type ecomV1CartCurrentCart_universal_d_MembershipName = MembershipName;
    type ecomV1CartCurrentCart_universal_d_MembershipPaymentCredits = MembershipPaymentCredits;
    type ecomV1CartCurrentCart_universal_d_InvalidMembership = InvalidMembership;
    type ecomV1CartCurrentCart_universal_d_AdditionalFee = AdditionalFee;
    type ecomV1CartCurrentCart_universal_d_Violation = Violation;
    type ecomV1CartCurrentCart_universal_d_Severity = Severity;
    const ecomV1CartCurrentCart_universal_d_Severity: typeof Severity;
    type ecomV1CartCurrentCart_universal_d_Target = Target;
    type ecomV1CartCurrentCart_universal_d_TargetTargetTypeOneOf = TargetTargetTypeOneOf;
    type ecomV1CartCurrentCart_universal_d_NameInOther = NameInOther;
    const ecomV1CartCurrentCart_universal_d_NameInOther: typeof NameInOther;
    type ecomV1CartCurrentCart_universal_d_NameInLineItem = NameInLineItem;
    const ecomV1CartCurrentCart_universal_d_NameInLineItem: typeof NameInLineItem;
    type ecomV1CartCurrentCart_universal_d_Other = Other;
    type ecomV1CartCurrentCart_universal_d_TargetLineItem = TargetLineItem;
    type ecomV1CartCurrentCart_universal_d_RemoveLineItemsFromCurrentCartRequest = RemoveLineItemsFromCurrentCartRequest;
    type ecomV1CartCurrentCart_universal_d_RemoveLineItemsResponse = RemoveLineItemsResponse;
    type ecomV1CartCurrentCart_universal_d_CreateCheckoutFromCurrentCartRequest = CreateCheckoutFromCurrentCartRequest;
    type ecomV1CartCurrentCart_universal_d_ChannelType = ChannelType;
    const ecomV1CartCurrentCart_universal_d_ChannelType: typeof ChannelType;
    type ecomV1CartCurrentCart_universal_d_CreateCheckoutResponse = CreateCheckoutResponse;
    type ecomV1CartCurrentCart_universal_d_RemoveCouponFromCurrentCartRequest = RemoveCouponFromCurrentCartRequest;
    type ecomV1CartCurrentCart_universal_d_RemoveCouponResponse = RemoveCouponResponse;
    type ecomV1CartCurrentCart_universal_d_UpdateCurrentCartLineItemQuantityRequest = UpdateCurrentCartLineItemQuantityRequest;
    type ecomV1CartCurrentCart_universal_d_LineItemQuantityUpdate = LineItemQuantityUpdate;
    type ecomV1CartCurrentCart_universal_d_UpdateLineItemsQuantityResponse = UpdateLineItemsQuantityResponse;
    type ecomV1CartCurrentCart_universal_d_EstimateCurrentCartTotalsRequest = EstimateCurrentCartTotalsRequest;
    type ecomV1CartCurrentCart_universal_d_DeleteCurrentCartRequest = DeleteCurrentCartRequest;
    type ecomV1CartCurrentCart_universal_d_DeleteCartResponse = DeleteCartResponse;
    type ecomV1CartCurrentCart_universal_d_DomainEvent = DomainEvent;
    type ecomV1CartCurrentCart_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type ecomV1CartCurrentCart_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type ecomV1CartCurrentCart_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type ecomV1CartCurrentCart_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type ecomV1CartCurrentCart_universal_d_ActionEvent = ActionEvent;
    type ecomV1CartCurrentCart_universal_d_MessageEnvelope = MessageEnvelope;
    type ecomV1CartCurrentCart_universal_d_IdentificationData = IdentificationData;
    type ecomV1CartCurrentCart_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type ecomV1CartCurrentCart_universal_d_WebhookIdentityType = WebhookIdentityType;
    const ecomV1CartCurrentCart_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    type ecomV1CartCurrentCart_universal_d_CreateCartRequest = CreateCartRequest;
    type ecomV1CartCurrentCart_universal_d_CreateCartResponse = CreateCartResponse;
    type ecomV1CartCurrentCart_universal_d_GetCartRequest = GetCartRequest;
    type ecomV1CartCurrentCart_universal_d_GetCartResponse = GetCartResponse;
    type ecomV1CartCurrentCart_universal_d_GetCartByCheckoutIdRequest = GetCartByCheckoutIdRequest;
    type ecomV1CartCurrentCart_universal_d_GetCartByCheckoutIdResponse = GetCartByCheckoutIdResponse;
    type ecomV1CartCurrentCart_universal_d_AddToCartRequest = AddToCartRequest;
    type ecomV1CartCurrentCart_universal_d_RemoveLineItemsRequest = RemoveLineItemsRequest;
    type ecomV1CartCurrentCart_universal_d_CreateCheckoutRequest = CreateCheckoutRequest;
    type ecomV1CartCurrentCart_universal_d_RemoveCouponRequest = RemoveCouponRequest;
    type ecomV1CartCurrentCart_universal_d_UpdateLineItemsQuantityRequest = UpdateLineItemsQuantityRequest;
    type ecomV1CartCurrentCart_universal_d_EstimateTotalsRequest = EstimateTotalsRequest;
    type ecomV1CartCurrentCart_universal_d_DeleteCartRequest = DeleteCartRequest;
    type ecomV1CartCurrentCart_universal_d_Empty = Empty;
    const ecomV1CartCurrentCart_universal_d_getCurrentCart: typeof getCurrentCart;
    const ecomV1CartCurrentCart_universal_d_updateCurrentCart: typeof updateCurrentCart;
    type ecomV1CartCurrentCart_universal_d_UpdateCurrentCartOptions = UpdateCurrentCartOptions;
    const ecomV1CartCurrentCart_universal_d_addToCurrentCart: typeof addToCurrentCart;
    type ecomV1CartCurrentCart_universal_d_AddToCurrentCartOptions = AddToCurrentCartOptions;
    const ecomV1CartCurrentCart_universal_d_removeLineItemsFromCurrentCart: typeof removeLineItemsFromCurrentCart;
    const ecomV1CartCurrentCart_universal_d_createCheckoutFromCurrentCart: typeof createCheckoutFromCurrentCart;
    type ecomV1CartCurrentCart_universal_d_CreateCheckoutFromCurrentCartOptions = CreateCheckoutFromCurrentCartOptions;
    const ecomV1CartCurrentCart_universal_d_removeCouponFromCurrentCart: typeof removeCouponFromCurrentCart;
    const ecomV1CartCurrentCart_universal_d_updateCurrentCartLineItemQuantity: typeof updateCurrentCartLineItemQuantity;
    const ecomV1CartCurrentCart_universal_d_estimateCurrentCartTotals: typeof estimateCurrentCartTotals;
    type ecomV1CartCurrentCart_universal_d_EstimateCurrentCartTotalsOptions = EstimateCurrentCartTotalsOptions;
    const ecomV1CartCurrentCart_universal_d_deleteCurrentCart: typeof deleteCurrentCart;
    namespace ecomV1CartCurrentCart_universal_d {
        export { ecomV1CartCurrentCart_universal_d_Cart as Cart, ecomV1CartCurrentCart_universal_d_LineItem as LineItem, ecomV1CartCurrentCart_universal_d_CatalogReference as CatalogReference, ecomV1CartCurrentCart_universal_d_ProductName as ProductName, ecomV1CartCurrentCart_universal_d_MultiCurrencyPrice as MultiCurrencyPrice, ecomV1CartCurrentCart_universal_d_DescriptionLine as DescriptionLine, ecomV1CartCurrentCart_universal_d_DescriptionLineValueOneOf as DescriptionLineValueOneOf, ecomV1CartCurrentCart_universal_d_DescriptionLineDescriptionLineValueOneOf as DescriptionLineDescriptionLineValueOneOf, ecomV1CartCurrentCart_universal_d_DescriptionLineName as DescriptionLineName, ecomV1CartCurrentCart_universal_d_PlainTextValue as PlainTextValue, ecomV1CartCurrentCart_universal_d_Color as Color, ecomV1CartCurrentCart_universal_d_DescriptionLineType as DescriptionLineType, ecomV1CartCurrentCart_universal_d_ItemAvailabilityInfo as ItemAvailabilityInfo, ecomV1CartCurrentCart_universal_d_ItemAvailabilityStatus as ItemAvailabilityStatus, ecomV1CartCurrentCart_universal_d_PhysicalProperties as PhysicalProperties, ecomV1CartCurrentCart_universal_d_Scope as Scope, ecomV1CartCurrentCart_universal_d_Group as Group, ecomV1CartCurrentCart_universal_d_ItemType as ItemType, ecomV1CartCurrentCart_universal_d_ItemTypeItemTypeDataOneOf as ItemTypeItemTypeDataOneOf, ecomV1CartCurrentCart_universal_d_ItemTypeItemType as ItemTypeItemType, ecomV1CartCurrentCart_universal_d_SubscriptionOptionInfo as SubscriptionOptionInfo, ecomV1CartCurrentCart_universal_d_SubscriptionSettings as SubscriptionSettings, ecomV1CartCurrentCart_universal_d_SubscriptionFrequency as SubscriptionFrequency, ecomV1CartCurrentCart_universal_d_Title as Title, ecomV1CartCurrentCart_universal_d_Description as Description, ecomV1CartCurrentCart_universal_d_SecuredMedia as SecuredMedia, ecomV1CartCurrentCart_universal_d_FileType as FileType, ecomV1CartCurrentCart_universal_d_PaymentOptionType as PaymentOptionType, ecomV1CartCurrentCart_universal_d_ServiceProperties as ServiceProperties, ecomV1CartCurrentCart_universal_d_PriceDescription as PriceDescription, ecomV1CartCurrentCart_universal_d_SelectedMembership as SelectedMembership, ecomV1CartCurrentCart_universal_d_CatalogOverrideFields as CatalogOverrideFields, ecomV1CartCurrentCart_universal_d_BuyerInfo as BuyerInfo, ecomV1CartCurrentCart_universal_d_BuyerInfoIdOneOf as BuyerInfoIdOneOf, ecomV1CartCurrentCart_universal_d_WeightUnit as WeightUnit, ecomV1CartCurrentCart_universal_d_CartDiscount as CartDiscount, ecomV1CartCurrentCart_universal_d_CartDiscountDiscountSourceOneOf as CartDiscountDiscountSourceOneOf, ecomV1CartCurrentCart_universal_d_Coupon as Coupon, ecomV1CartCurrentCart_universal_d_MerchantDiscount as MerchantDiscount, ecomV1CartCurrentCart_universal_d_AddressWithContact as AddressWithContact, ecomV1CartCurrentCart_universal_d_Address as Address, ecomV1CartCurrentCart_universal_d_StreetAddress as StreetAddress, ecomV1CartCurrentCart_universal_d_AddressLocation as AddressLocation, ecomV1CartCurrentCart_universal_d_FullAddressContactDetails as FullAddressContactDetails, ecomV1CartCurrentCart_universal_d_VatId as VatId, ecomV1CartCurrentCart_universal_d_VatType as VatType, ecomV1CartCurrentCart_universal_d_SelectedShippingOption as SelectedShippingOption, ecomV1CartCurrentCart_universal_d_ExtendedFields as ExtendedFields, ecomV1CartCurrentCart_universal_d_GetCurrentCartRequest as GetCurrentCartRequest, ecomV1CartCurrentCart_universal_d_GetCurrentCartResponse as GetCurrentCartResponse, ecomV1CartCurrentCart_universal_d_UpdateCartRequest as UpdateCartRequest, ecomV1CartCurrentCart_universal_d_MerchantDiscountInput as MerchantDiscountInput, ecomV1CartCurrentCart_universal_d_CustomLineItem as CustomLineItem, ecomV1CartCurrentCart_universal_d_UpdateCartResponse as UpdateCartResponse, ecomV1CartCurrentCart_universal_d_AddToCurrentCartRequest as AddToCurrentCartRequest, ecomV1CartCurrentCart_universal_d_AddToCartResponse as AddToCartResponse, ecomV1CartCurrentCart_universal_d_AddToCurrentCartAndEstimateTotalsRequest as AddToCurrentCartAndEstimateTotalsRequest, ecomV1CartCurrentCart_universal_d_SelectedMemberships as SelectedMemberships, ecomV1CartCurrentCart_universal_d_HostSelectedMembership as HostSelectedMembership, ecomV1CartCurrentCart_universal_d_EstimateTotalsResponse as EstimateTotalsResponse, ecomV1CartCurrentCart_universal_d_CalculatedLineItem as CalculatedLineItem, ecomV1CartCurrentCart_universal_d_LineItemPricesData as LineItemPricesData, ecomV1CartCurrentCart_universal_d_ItemTaxFullDetails as ItemTaxFullDetails, ecomV1CartCurrentCart_universal_d_TaxRateBreakdown as TaxRateBreakdown, ecomV1CartCurrentCart_universal_d_TaxBreakdown as TaxBreakdown, ecomV1CartCurrentCart_universal_d_JurisdictionType as JurisdictionType, ecomV1CartCurrentCart_universal_d_PriceSummary as PriceSummary, ecomV1CartCurrentCart_universal_d_GiftCard as GiftCard, ecomV1CartCurrentCart_universal_d_TaxSummary as TaxSummary, ecomV1CartCurrentCart_universal_d_TaxCalculationDetails as TaxCalculationDetails, ecomV1CartCurrentCart_universal_d_TaxCalculationDetailsCalculationDetailsOneOf as TaxCalculationDetailsCalculationDetailsOneOf, ecomV1CartCurrentCart_universal_d_RateType as RateType, ecomV1CartCurrentCart_universal_d_ManualCalculationReason as ManualCalculationReason, ecomV1CartCurrentCart_universal_d_AutoTaxFallbackCalculationDetails as AutoTaxFallbackCalculationDetails, ecomV1CartCurrentCart_universal_d_FallbackReason as FallbackReason, ecomV1CartCurrentCart_universal_d_ApplicationError as ApplicationError, ecomV1CartCurrentCart_universal_d_AggregatedTaxBreakdown as AggregatedTaxBreakdown, ecomV1CartCurrentCart_universal_d_ShippingInformation as ShippingInformation, ecomV1CartCurrentCart_universal_d_ShippingRegion as ShippingRegion, ecomV1CartCurrentCart_universal_d_SelectedCarrierServiceOption as SelectedCarrierServiceOption, ecomV1CartCurrentCart_universal_d_DeliveryLogistics as DeliveryLogistics, ecomV1CartCurrentCart_universal_d_PickupDetails as PickupDetails, ecomV1CartCurrentCart_universal_d_PickupMethod as PickupMethod, ecomV1CartCurrentCart_universal_d_DeliveryTimeSlot as DeliveryTimeSlot, ecomV1CartCurrentCart_universal_d_SelectedCarrierServiceOptionPrices as SelectedCarrierServiceOptionPrices, ecomV1CartCurrentCart_universal_d_SelectedCarrierServiceOptionOtherCharge as SelectedCarrierServiceOptionOtherCharge, ecomV1CartCurrentCart_universal_d_ChargeType as ChargeType, ecomV1CartCurrentCart_universal_d_CarrierServiceOption as CarrierServiceOption, ecomV1CartCurrentCart_universal_d_ShippingOption as ShippingOption, ecomV1CartCurrentCart_universal_d_ShippingPrice as ShippingPrice, ecomV1CartCurrentCart_universal_d_OtherCharge as OtherCharge, ecomV1CartCurrentCart_universal_d_AppliedDiscount as AppliedDiscount, ecomV1CartCurrentCart_universal_d_AppliedDiscountDiscountSourceOneOf as AppliedDiscountDiscountSourceOneOf, ecomV1CartCurrentCart_universal_d_DiscountType as DiscountType, ecomV1CartCurrentCart_universal_d_V1Coupon as V1Coupon, ecomV1CartCurrentCart_universal_d_V1MerchantDiscount as V1MerchantDiscount, ecomV1CartCurrentCart_universal_d_DiscountRule as DiscountRule, ecomV1CartCurrentCart_universal_d_DiscountRuleName as DiscountRuleName, ecomV1CartCurrentCart_universal_d_LineItemDiscount as LineItemDiscount, ecomV1CartCurrentCart_universal_d_CalculationErrors as CalculationErrors, ecomV1CartCurrentCart_universal_d_CalculationErrorsShippingCalculationErrorOneOf as CalculationErrorsShippingCalculationErrorOneOf, ecomV1CartCurrentCart_universal_d_Details as Details, ecomV1CartCurrentCart_universal_d_DetailsKindOneOf as DetailsKindOneOf, ecomV1CartCurrentCart_universal_d_ValidationError as ValidationError, ecomV1CartCurrentCart_universal_d_RuleType as RuleType, ecomV1CartCurrentCart_universal_d_FieldViolation as FieldViolation, ecomV1CartCurrentCart_universal_d_SystemError as SystemError, ecomV1CartCurrentCart_universal_d_CarrierErrors as CarrierErrors, ecomV1CartCurrentCart_universal_d_CarrierError as CarrierError, ecomV1CartCurrentCart_universal_d_MembershipOptions as MembershipOptions, ecomV1CartCurrentCart_universal_d_Membership as Membership, ecomV1CartCurrentCart_universal_d_MembershipName as MembershipName, ecomV1CartCurrentCart_universal_d_MembershipPaymentCredits as MembershipPaymentCredits, ecomV1CartCurrentCart_universal_d_InvalidMembership as InvalidMembership, ecomV1CartCurrentCart_universal_d_AdditionalFee as AdditionalFee, ecomV1CartCurrentCart_universal_d_Violation as Violation, ecomV1CartCurrentCart_universal_d_Severity as Severity, ecomV1CartCurrentCart_universal_d_Target as Target, ecomV1CartCurrentCart_universal_d_TargetTargetTypeOneOf as TargetTargetTypeOneOf, ecomV1CartCurrentCart_universal_d_NameInOther as NameInOther, ecomV1CartCurrentCart_universal_d_NameInLineItem as NameInLineItem, ecomV1CartCurrentCart_universal_d_Other as Other, ecomV1CartCurrentCart_universal_d_TargetLineItem as TargetLineItem, ecomV1CartCurrentCart_universal_d_RemoveLineItemsFromCurrentCartRequest as RemoveLineItemsFromCurrentCartRequest, ecomV1CartCurrentCart_universal_d_RemoveLineItemsResponse as RemoveLineItemsResponse, ecomV1CartCurrentCart_universal_d_CreateCheckoutFromCurrentCartRequest as CreateCheckoutFromCurrentCartRequest, ecomV1CartCurrentCart_universal_d_ChannelType as ChannelType, ecomV1CartCurrentCart_universal_d_CreateCheckoutResponse as CreateCheckoutResponse, ecomV1CartCurrentCart_universal_d_RemoveCouponFromCurrentCartRequest as RemoveCouponFromCurrentCartRequest, ecomV1CartCurrentCart_universal_d_RemoveCouponResponse as RemoveCouponResponse, ecomV1CartCurrentCart_universal_d_UpdateCurrentCartLineItemQuantityRequest as UpdateCurrentCartLineItemQuantityRequest, ecomV1CartCurrentCart_universal_d_LineItemQuantityUpdate as LineItemQuantityUpdate, ecomV1CartCurrentCart_universal_d_UpdateLineItemsQuantityResponse as UpdateLineItemsQuantityResponse, ecomV1CartCurrentCart_universal_d_EstimateCurrentCartTotalsRequest as EstimateCurrentCartTotalsRequest, ecomV1CartCurrentCart_universal_d_DeleteCurrentCartRequest as DeleteCurrentCartRequest, ecomV1CartCurrentCart_universal_d_DeleteCartResponse as DeleteCartResponse, ecomV1CartCurrentCart_universal_d_DomainEvent as DomainEvent, ecomV1CartCurrentCart_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, ecomV1CartCurrentCart_universal_d_EntityCreatedEvent as EntityCreatedEvent, ecomV1CartCurrentCart_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, ecomV1CartCurrentCart_universal_d_EntityDeletedEvent as EntityDeletedEvent, ecomV1CartCurrentCart_universal_d_ActionEvent as ActionEvent, ecomV1CartCurrentCart_universal_d_MessageEnvelope as MessageEnvelope, ecomV1CartCurrentCart_universal_d_IdentificationData as IdentificationData, ecomV1CartCurrentCart_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, ecomV1CartCurrentCart_universal_d_WebhookIdentityType as WebhookIdentityType, ecomV1CartCurrentCart_universal_d_CreateCartRequest as CreateCartRequest, ecomV1CartCurrentCart_universal_d_CreateCartResponse as CreateCartResponse, ecomV1CartCurrentCart_universal_d_GetCartRequest as GetCartRequest, ecomV1CartCurrentCart_universal_d_GetCartResponse as GetCartResponse, ecomV1CartCurrentCart_universal_d_GetCartByCheckoutIdRequest as GetCartByCheckoutIdRequest, ecomV1CartCurrentCart_universal_d_GetCartByCheckoutIdResponse as GetCartByCheckoutIdResponse, ecomV1CartCurrentCart_universal_d_AddToCartRequest as AddToCartRequest, ecomV1CartCurrentCart_universal_d_RemoveLineItemsRequest as RemoveLineItemsRequest, ecomV1CartCurrentCart_universal_d_CreateCheckoutRequest as CreateCheckoutRequest, ecomV1CartCurrentCart_universal_d_RemoveCouponRequest as RemoveCouponRequest, ecomV1CartCurrentCart_universal_d_UpdateLineItemsQuantityRequest as UpdateLineItemsQuantityRequest, ecomV1CartCurrentCart_universal_d_EstimateTotalsRequest as EstimateTotalsRequest, ecomV1CartCurrentCart_universal_d_DeleteCartRequest as DeleteCartRequest, ecomV1CartCurrentCart_universal_d_Empty as Empty, ecomV1CartCurrentCart_universal_d_getCurrentCart as getCurrentCart, ecomV1CartCurrentCart_universal_d_updateCurrentCart as updateCurrentCart, ecomV1CartCurrentCart_universal_d_UpdateCurrentCartOptions as UpdateCurrentCartOptions, ecomV1CartCurrentCart_universal_d_addToCurrentCart as addToCurrentCart, ecomV1CartCurrentCart_universal_d_AddToCurrentCartOptions as AddToCurrentCartOptions, ecomV1CartCurrentCart_universal_d_removeLineItemsFromCurrentCart as removeLineItemsFromCurrentCart, ecomV1CartCurrentCart_universal_d_createCheckoutFromCurrentCart as createCheckoutFromCurrentCart, ecomV1CartCurrentCart_universal_d_CreateCheckoutFromCurrentCartOptions as CreateCheckoutFromCurrentCartOptions, ecomV1CartCurrentCart_universal_d_removeCouponFromCurrentCart as removeCouponFromCurrentCart, ecomV1CartCurrentCart_universal_d_updateCurrentCartLineItemQuantity as updateCurrentCartLineItemQuantity, ecomV1CartCurrentCart_universal_d_estimateCurrentCartTotals as estimateCurrentCartTotals, ecomV1CartCurrentCart_universal_d_EstimateCurrentCartTotalsOptions as EstimateCurrentCartTotalsOptions, ecomV1CartCurrentCart_universal_d_deleteCurrentCart as deleteCurrentCart, };
    }
    export { ecomV1BackInStockNotificationRequestBackInStockNotifications_universal_d as backInStockNotifications, ecomV1BackInStockSettingsBackInStockSettings_universal_d as backInStockSettings, ecomV1CartCart_universal_d as cart, ecomV1CheckoutCheckout_universal_d as checkout, ecomV1CheckoutSettingsCheckoutSettings_universal_d as checkoutSettings, ecomV1CheckoutTemplateCheckoutTemplates_universal_d as checkoutTemplates, ecomV1CartCurrentCart_universal_d as currentCart, ecomDiscountsV1DiscountRuleDiscountRules_universal_d as discountRules, ecomV1FulfillmentsOrderFulfillments_universal_d as orderFulfillments, ecomOrdersV1InvoiceOrderInvoices_universal_d as orderInvoices, ecomV1OrderTransactionsOrderTransactions_universal_d as orderTransactions, ecomV1OrderOrders_universal_d as orders, ecomV1OrdersSettingsOrdersSettings_universal_d as ordersSettings, ecomRecommendationsV1RecommendationRecommendations_universal_d as recommendations };
}
