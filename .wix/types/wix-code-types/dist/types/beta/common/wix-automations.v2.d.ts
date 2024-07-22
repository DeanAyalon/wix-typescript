declare module "wix-automations.v2" {
  interface Activation {
      /** Activation ID */
      _id?: string;
      /** Activation automation */
      automation?: Automation;
  }
  /** Automation */
  interface Automation extends AutomationOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin;
      /**
       * Automation ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the Automation is updated.
       * To prevent conflicting changes,
       * the current revision must be passed when updating the Automation.
       *
       * Ignored when creating an Automation.
       * @readonly
       */
      revision?: string | null;
      /**
       * information about the creator of the automation
       * @readonly
       */
      createdBy?: AuditInfo;
      /**
       * Date and time the Automation was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * information about who updated of the automation
       * @readonly
       */
      updatedBy?: AuditInfo;
      /**
       * Date and time the Automation was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Automation name */
      name?: string;
      /** Automation description */
      description?: string | null;
      /** Automation runtime configuration */
      configuration?: AutomationConfiguration;
      /** Origin type */
      origin?: Origin;
      /** Automation settings */
      settings?: AutomationSettings;
  }
  /** @oneof */
  interface AutomationOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin;
  }
  interface ActionSettings {
      /** list of permanent action ids of actions that cannot be deleted (default - empty, all actions are deletable by default) */
      permanentActionIds?: string[];
      /** list of readonly action ids, (default - empty, all actions are editable by default) */
      readonlyActionIds?: string[];
      /** sets if adding a delay action is disabled for this automation */
      disableDelayAddition?: boolean;
      /** sets if adding a condition action is disabled for this automation */
      disableConditionAddition?: boolean;
  }
  interface AuditInfo extends AuditInfoIdOneOf {
      /** user identifier */
      userId?: string;
      /** application identifier */
      appId?: string;
  }
  /** @oneof */
  interface AuditInfoIdOneOf {
      /** user identifier */
      userId?: string;
      /** application identifier */
      appId?: string;
  }
  /** Automation runtime configuration */
  interface AutomationConfiguration {
      /** Automation's Status */
      status?: AutomationConfigurationStatus;
      /** Trigger configuration */
      trigger?: Trigger;
      /** actions that run in parallel after the trigger */
      rootActionIds?: string[];
      /**
       * map of all actions by actionId
       * The key is the actionId of the action, and the value is the action configuration
       */
      actions?: Record<string, AutomationConfigurationAction>;
  }
  enum TimeUnit {
      UNDEFINED = "UNDEFINED",
      MINUTES = "MINUTES",
      HOURS = "HOURS",
      DAYS = "DAYS",
      WEEKS = "WEEKS",
      MONTHS = "MONTHS"
  }
  interface Filter {
      /** the filter identifier */
      _id?: string;
      /** the field key from the schema, for example "formId" */
      fieldKey?: string;
      /** filter expression that evaluates to a boolean, for example - {{ contains(["guid1","guid2"];formId) }} */
      filterExpression?: string;
  }
  interface FutureDateActivationOffset {
      /**
       * expression of offset before the trigger's time (in selected time unit), when the Automation should run
       * only allows negative offset from the trigger's date (before the trigger), positive offset should be achieved via offset delay action
       * preScheduledEventOffsetExpression: "{{5}}" + timeUnit: Days -  to run the Automation 5 days before the trigger's date
       * or, preScheduledEventOffsetExpression: "{{ someNumberField }}" + timeUnit: Minutes, to run the Automation someNumberField's value in minutes before the trigger's date
       */
      preScheduledEventOffsetExpression?: string;
      /** Time unit for the scheduled event offset */
      scheduledEventOffsetTimeUnit?: TimeUnit;
  }
  interface ConditionExpressionGroup {
      /** expression group operator */
      operator?: Operator;
      /**
       * list of boolean expressions to be evaluated with the given operator
       * examples - {{ true }}, {{ someBooleanField }}, {{ contains(["guid1...","guid2..."];formId) }}
       */
      booleanExpressions?: string[];
  }
  enum Operator {
      UNKNOWN_OPERATOR = "UNKNOWN_OPERATOR",
      OR = "OR",
      AND = "AND"
  }
  enum Type {
      /** Automation will be triggered according to the trigger configuration */
      UNKNOWN_ACTION_TYPE = "UNKNOWN_ACTION_TYPE",
      /** App defined Action */
      APP_DEFINED = "APP_DEFINED",
      /** Condition Action */
      CONDITION = "CONDITION",
      /** Delay Action */
      DELAY = "DELAY",
      /** RateLimit Action */
      RATE_LIMIT = "RATE_LIMIT",
      /** Output Action */
      OUTPUT = "OUTPUT"
  }
  interface AppDefinedAction {
      /** Action app id */
      appId?: string;
      /** Action key */
      actionKey?: string;
      /**
       * Action input mapping, example:
       * {
       * "to": "{{ var(contact.email) }}",
       * "subject": "Your registration to {{ var(eventName) }} is Confirmed",
       * "body": "Hi {{ var(contact.name) }}, you are confirmed for the event"
       * }
       */
      inputMapping?: Record<string, any> | null;
      /**
       * optional skip condition configuration - if this action should be skipped when the automation runs (following actions of a skipped action will still run)
       * the action will be skipped if either of the expression groups evaluate to `true`
       * the relation between the expression groups is an OR relation.
       */
      skipConditionOrExpressionGroups?: ConditionExpressionGroup[];
      /** actions to run in parallel after this action finishes */
      postActionIds?: string[];
  }
  interface ConditionAction {
      /**
       * the condition evaluates to `true` if either of the expression groups evaluate to `true`
       * the relation between the expression groups is an OR relation.
       */
      orExpressionGroups?: ConditionExpressionGroup[];
      /** actions to run when the entire condition is evaluated to `true` */
      truePostActionIds?: string[];
      /** actions to run when the entire condition is evaluated to `false` */
      falsePostActionIds?: string[];
  }
  interface DelayAction {
      /**
       * optional - expression for amount of time to wait (in selected time unit) - from a specific date or from the time the action is executed
       * offsetExpression: "{{5}}" + timeUnit: Days -  to wait for 5 days from the time the delay was invoked
       * or, offsetExpression: "{{5}}" + timeUnit: Days + dueDateEpochExpression: "{{someDateField}}" -  to wait for 5 days from the time date in "someDateField" field in the payload
       * or, offsetExpression: "{{ someNumberField }}" + timeUnit: Minutes,  to wait for someNumberField's value in minutes
       */
      offsetExpression?: string | null;
      /** Time unit for delay offset */
      offsetTimeUnit?: TimeUnit;
      /**
       * optional - expression of the due date to wait until, if an offset was defined, it will be calculated from this date
       * number of milliseconds since the Unix Epoch (1 January, 1970 UTC)
       * for example - "{{ 18238348023423 }}", or "{{ someEpochFromPayloadField }}" / "{{ contact.birthdate }}"
       */
      dueDateEpochExpression?: string | null;
      /** actions to run in parallel after this action finishes */
      postActionIds?: string[];
  }
  interface RateLimitAction {
      /**
       * Maximum number of activations expression. the expression will need to be parsed to Int on runtime
       * for example - "{{ 1 }}" to set max activations to 1, or "{{ var(someNumberField) }}" to set max activations as the value of "someNumberField" from the payload
       */
      maxActivationsExpression?: string;
      /**
       * Duration of the rate limiting window (in selected time unit) expression for rate limiter, if empty then no time limit. the expression will need to be parsed to Int on runtime
       * for example - "{{ 10 }}" to set timeframe to be 10 minutes, or {{ var(someNumberField) }} to set timeframe in minutes as the value of "someNumberField" from the payload
       */
      rateLimitDurationExpression?: string | null;
      /** Time unit for the rate limit duration */
      rateLimitDurationTimeUnit?: TimeUnit;
      /**
       * Unique identifier of each activation by which rate limiter will count activations, expected return type is string
       * for example - {{ var(contact.id) }} to set the unique identifier as the value of "contact.id" from the payload
       */
      uniqueIdentifierExpression?: string | null;
      /** actions to run in parallel after this action finishes */
      postActionIds?: string[];
  }
  interface OutputAction {
      /**
       * Output action output mapping
       * {
       * "to": "{{ var(contact.email) }}"
       * }
       */
      outputMapping?: Record<string, any> | null;
  }
  enum AutomationConfigurationStatus {
      /** unused */
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Automation will be triggered according to the trigger configuration */
      ACTIVE = "ACTIVE",
      /** Automation will not be triggered */
      INACTIVE = "INACTIVE"
  }
  interface Trigger {
      /** Trigger Application id */
      appId?: string;
      /** Trigger key */
      triggerKey?: string;
      /**
       * optional - list of filters on schema fields
       * the relation between the filter expressions is an AND relation.
       * all filter expressions must be evaluated to `true` for a given payload in order for the automation to be executed
       */
      filters?: Filter[];
      /** optional - future date trigger activation offset */
      scheduledEventOffset?: FutureDateActivationOffset;
  }
  interface AutomationConfigurationAction extends AutomationConfigurationActionInfoOneOf {
      /** App defined Action (via RPC, HTTP or Velo) */
      appDefinedInfo?: AppDefinedAction;
      /** Condition action */
      conditionInfo?: ConditionAction;
      /** Delay action */
      delayInfo?: DelayAction;
      /** Rate limiting action */
      rateLimitInfo?: RateLimitAction;
      /**
       * Output action
       * @internal
       */
      outputInfo?: OutputAction;
      /** Action id, if not specified, will be generated */
      _id?: string | null;
      /** Type of the action */
      type?: Type;
      /**
       * Human readable name for the action (may only contain alphanumeric characters and underscores) to differentiate from other actions of the same kind.
       * if the action has output, the output will be available in the payload under this name, otherwise it will be concatenated to the payload as is
       * without namespaces (or in case of exact same namespaces), if the user has multiple actions of the same kind (appId+actionKey), the output will be overwritten.
       *
       * for example, given:
       * - if the action output looks like this - { "message": "hello" }
       * - the namespace is "action_1"
       * - the trigger payload looks like this - { "someField": "50", "someBoolean": true }
       *
       * the payload will look like this:
       * {
       * "someField": "50",
       * "someBoolean": true,
       * "action_1": {
       * "message": "hello"
       * }
       * }
       *
       * given the following Automation configuration:
       *
       * (Trigger A)
       * |
       * (Action B) // namespace = "action_b_1"
       * |
       * (Action B) // namespace = "action_b_2"
       * |
       * (Action C)
       *
       *
       * the available fields that Action C will be able to use to map to it's input fields will be:
       * {
       * "someField": "50",
       * "someBoolean": true,
       * "action_b_1": {
       * "message": "hello"
       * },
       * "action_b_2": {
       * "message": "hello"
       * }
       * }
       * so the user can select which specific action output to use (action_b_1.message or action_b_2.message, in the case above)
       */
      namespace?: string | null;
  }
  /** @oneof */
  interface AutomationConfigurationActionInfoOneOf {
      /** App defined Action (via RPC, HTTP or Velo) */
      appDefinedInfo?: AppDefinedAction;
      /** Condition action */
      conditionInfo?: ConditionAction;
      /** Delay action */
      delayInfo?: DelayAction;
      /** Rate limiting action */
      rateLimitInfo?: RateLimitAction;
      /**
       * Output action
       * @internal
       */
      outputInfo?: OutputAction;
  }
  enum Origin {
      /** default value. this is unused */
      UNKNOWN_ORIGIN = "UNKNOWN_ORIGIN",
      /** user created automation */
      USER = "USER",
      /** automation created by application (site specific) */
      APPLICATION = "APPLICATION",
      /** preinstalled application automation */
      PREINSTALLED = "PREINSTALLED"
  }
  interface ApplicationOrigin {
      /** identifier for the application */
      appId?: string;
  }
  interface PreinstalledOrigin {
      /** identifier for the application */
      appId?: string;
      /** application component ID */
      componentId?: string;
      /** application component Version */
      componentVersion?: number;
      /**
       * is this a user modified preinstalled automation (on a specific site) or the original one
       * @readonly
       */
      override?: boolean | null;
  }
  interface AutomationSettings {
      /** sets if the automation is hidden from users */
      hidden?: boolean;
      /** sets if the automation is readonly */
      readonly?: boolean;
      /** sets if deleting the automation is disabled */
      disableDelete?: boolean;
      /** sets if changing the automation status is disabled (from active to inactive and vice versa) */
      disableStatusChange?: boolean;
      /** Automation's action settings */
      actionSettings?: ActionSettings;
  }
  interface ActivationStatus {
      /** Activation's ID. */
      _id?: string;
      /** Configuration's ID. */
      configurationId?: string;
      /** Configuration's Correlation ID. */
      configurationCorrelationId?: string;
      /** Activation's status. */
      status?: Status;
      /** Activation's error reason (if there is one). */
      errorReason?: string | null;
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      STARTED = "STARTED",
      ENDED = "ENDED",
      ERROR = "ERROR",
      SCHEDULED = "SCHEDULED",
      FROM_SCHEDULER = "FROM_SCHEDULER",
      RETRY = "RETRY",
      RESUMED = "RESUMED",
      PAUSED = "PAUSED",
      ACTION_SKIPPED = "ACTION_SKIPPED"
  }
  interface ActivationStatusChanged extends ActivationStatusChangedStatusInfoOneOf {
      /** Initiated status information */
      initiatedInfo?: InitiatedStatusInfo;
      /** Scheduled status information */
      scheduledInfo?: ScheduledStatusInfo;
      /** Cancelled status information */
      cancelledInfo?: CancelledStatusInfo;
      /** Failed status information */
      failedInfo?: ActivationStatusChangedFailedStatusInfo;
      /** Activation */
      activation?: Activation;
      /** Activation status */
      status?: ActivationStatusChangedStatus;
      /** Change event created date */
      statusChangedDate?: Date;
  }
  /** @oneof */
  interface ActivationStatusChangedStatusInfoOneOf {
      /** Initiated status information */
      initiatedInfo?: InitiatedStatusInfo;
      /** Scheduled status information */
      scheduledInfo?: ScheduledStatusInfo;
      /** Cancelled status information */
      cancelledInfo?: CancelledStatusInfo;
      /** Failed status information */
      failedInfo?: ActivationStatusChangedFailedStatusInfo;
  }
  enum Target {
      UNKNOWN_TARGET = "UNKNOWN_TARGET",
      SCHEDULE = "SCHEDULE",
      IMMEDIATE = "IMMEDIATE"
  }
  enum CancellationReason {
      UNKNOWN_CANCELLATION_REASON = "UNKNOWN_CANCELLATION_REASON",
      /** Indicating that the activation was cancelled directly */
      EVENT_CANCELLED = "EVENT_CANCELLED",
      /** Indicating that the activation is cancelled because the automation was deactivated */
      AUTOMATION_DEACTIVATED = "AUTOMATION_DEACTIVATED",
      /** Indicating that the activation is cancelled because the automation was deleted */
      AUTOMATION_DELETED = "AUTOMATION_DELETED"
  }
  interface Identity {
      /** User ID */
      userId?: string | null;
      /** App ID */
      appId?: string | null;
  }
  enum ActivationStatusChangedStatus {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** This indicates activation is not started yet (no action has run yet) */
      INITIATED = "INITIATED",
      /** The activation is in scheduled status when the automation has future date or debounce defined and we're in the waiting stage (no action has run yet) */
      SCHEDULED = "SCHEDULED",
      /** This indicates the automation activation has started and currently in progress */
      STARTED = "STARTED",
      /** This indicates all the automation actions were handled either by invoking them, skipping them etc. */
      ENDED = "ENDED",
      /** This indicates the activation was cancelled */
      CANCELLED = "CANCELLED",
      /**
       * This indicates the activation failed to start
       * Note that failure in the activation of a single action will not result a failure in activation of the entire automation
       */
      FAILED = "FAILED"
  }
  interface InitiatedStatusInfo {
      /** Activation target */
      target?: Target;
      /** Event payload */
      payload?: Record<string, any> | null;
      /** External entity ID */
      externalEntityId?: string | null;
      /** Unique identifier for the request that initiated the automation */
      requestId?: string;
  }
  interface ScheduledStatusInfo {
      /** Schedule identifier */
      scheduleId?: string;
      /** Indicating when the activation should start */
      date?: Date;
  }
  interface CancelledStatusInfo {
      /** Cancellation reason */
      reason?: CancellationReason;
      /** The identity (such as user, app etc.) that caused the cancellation */
      initiator?: Identity;
  }
  interface ActivationStatusChangedFailedStatusInfo {
      /**
       * Error description
       * @readonly
       */
      errorDescription?: string;
      /**
       * Error code
       * @readonly
       */
      errorCode?: string | null;
  }
  interface ScheduleRequest {
      schedule: Schedule;
  }
  interface Schedule {
      /** @readonly */
      _id?: string | null;
      /** doesn't have to be unique. example: triggerName+entityId */
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      scheduledAction?: ScheduledAction;
      /** Raw domain event, not enriched */
      eventPayload?: string;
      /** @readonly */
      scheduleStatus?: ScheduleStatus;
      /** @readonly */
      scheduleDate?: Date;
      /** @readonly */
      _createdDate?: Date;
      /** @readonly */
      _updatedDate?: Date;
      overrideable?: boolean | null;
      triggerInfo?: TriggerInfo;
      automation?: Automation;
  }
  interface ScheduledAction {
      /** Action's id. */
      _id?: string;
      /** decide how long we should wait */
      delay?: Delay;
  }
  interface Delay extends DelayOfOneOf {
      simple?: SimpleDelay;
      /**
       * jsonata expression - sleep until the given date
       * for example: $toMillis(MyObject.Date) + 2*1000*60*60*24) -> will schedule 2 days after MyObject.Date
       */
      dateExpression?: string;
  }
  /** @oneof */
  interface DelayOfOneOf {
      simple?: SimpleDelay;
      /**
       * jsonata expression - sleep until the given date
       * for example: $toMillis(MyObject.Date) + 2*1000*60*60*24) -> will schedule 2 days after MyObject.Date
       */
      dateExpression?: string;
  }
  interface SimpleDelay {
      value?: number;
      units?: Units;
      /** Optional, used if provided: Jsonata expression that evaluates to a number of milliseconds to wait */
      delayExpression?: string | null;
  }
  enum Units {
      UNKNOWN = "UNKNOWN",
      MINUTES = "MINUTES",
      HOURS = "HOURS",
      DAYS = "DAYS"
  }
  enum ScheduleStatus {
      UNKNOWN_SCHEDULE_STATUS = "UNKNOWN_SCHEDULE_STATUS",
      PENDING = "PENDING",
      CANCELLED = "CANCELLED",
      DONE = "DONE"
  }
  interface TriggerInfo {
      /** App id of the initial trigger. */
      appId?: string;
      /** Trigger key of the initial trigger. */
      triggerKey?: string;
  }
  interface ScheduleResponse {
      _id?: string;
  }
  interface CancelPendingScheduleRequest extends CancelPendingScheduleRequestByOneOf {
      _id?: string;
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      identifierPattern?: string;
  }
  /** @oneof */
  interface CancelPendingScheduleRequestByOneOf {
      _id?: string;
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      identifierPattern?: string;
  }
  interface CancelPendingScheduleResponse {
  }
  interface UpdatePendingSchedulesPayloadRequest {
      identifier?: string;
      eventPayload?: string;
  }
  interface UpdatePendingSchedulesPayloadResponse {
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
  interface ActivationRequest {
      /** Activation's ID. */
      activationId?: string;
      /** Configuration's ID. */
      configurationId?: string;
      configurationCorrelationId?: string;
      /** Received event name. */
      eventName?: string;
      /** Received event slug. */
      eventSlug?: string | null;
      /** Received event payload. */
      eventPayload?: string | null;
      /** List of action data. */
      actions?: ActionData[];
      /** External ID. */
      externalId?: string;
      /** The source of this activation */
      source?: ActivationSource;
      /** Actions tree */
      actionsMap?: ActionsData;
      /** Automation V2. Used for reporting domain event until activation request will be deprecated. */
      automation?: Automation;
      /** Trigger entity for the activation, available for v2 and v3 automations only */
      triggerSchema?: Record<string, any> | null;
  }
  interface Runtime {
  }
  interface Scheduler {
      scheduleId?: string | null;
  }
  interface AsyncAction {
  }
  interface ActionData {
      /**
       * Action's id.
       * @readonly
       */
      _id?: string | null;
      /** Action's data. */
      action?: Action;
  }
  interface Action extends ActionActionOneOf {
      service?: Service;
      systemHelper?: SystemHelper;
      spiAction?: SpiAction;
  }
  /** @oneof */
  interface ActionActionOneOf {
      service?: Service;
      systemHelper?: SystemHelper;
      spiAction?: SpiAction;
  }
  interface ServiceMapping {
      /** Sevice name. */
      name?: string;
      /** Method name. */
      method?: string;
  }
  interface IfFilter {
      /** If filter's condition. */
      condition?: string;
      /** If's true post actions. */
      truePostActions?: ActionData[];
      /** If's false post actions. */
      falsePostActions?: ActionData[];
      /** If's true post actions ids. */
      truePostActionsIds?: string[];
      /** If's false post actions ids. */
      falsePostActionsIds?: string[];
  }
  interface SwitchFilter {
      /** Switch's filter cases. */
      cases?: Case[];
  }
  interface Case {
      /** Case's condition. */
      condition?: any;
      /** Case's post actions. */
      postActions?: ActionData[];
      /** Case's post actions ids. */
      postActionsIds?: string[];
  }
  interface DelayHelper {
      /** jsonata expression, for example: triggerName + eventId */
      scheduleIdentifier?: string;
      /** decide how long we should wait */
      delay?: Delay;
      /** Delay's post actions. */
      postActions?: ActionData[];
      /**
       * Optional: if true, any new schedule with the same schedule identifier will override the existing one.
       * If false, the new schedule will be ignored.
       */
      overrideable?: boolean | null;
      /** Delay's post actions ids. */
      postActionsIds?: string[];
  }
  interface RateLimiting {
      /** The maximum number of activations allowed in the given time frame */
      maxNumOfActivations?: number;
      /** Optional, used if provided: A jsonata expression that evaluates to the maximum number of activations allowed in the given time frame */
      maxNumOfActivationsExpression?: string | null;
      /** If given - the time frame in minutes, otherwise, for life */
      timeFrameInMinutes?: number | null;
      /** Optional, used if provided - A jsonata expression that evaluates to the time frame in minutes, otherwise, for life */
      timeFrameInMinutesExpression?: string | null;
      /** The jsonata to use to extract the entity/resource key from the enriched event payload */
      keyJsonata?: string;
      /** The actions to perform if this rate limiting action succeeded - meaning we are still in the allowed number of activations in the given time frame */
      postActions?: ActionData[];
      /** The ids of actions to perform if this rate limiting action succeeded - meaning we are still in the allowed number of activations in the given time frame */
      postActionsIds?: string[];
  }
  interface ConditionFilter {
      /** condition evaluates to `true` if either of the blocks evaluate to `true` (aka OR between all). */
      conditionBlocks?: ConditionBlock[];
      /** Actions to perform when condition_blocks evaluates to `true`. */
      postActions?: ActionData[];
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** Actions to perform when condition_blocks evaluates to `false`. */
      elsePostActions?: ActionData[];
  }
  enum BlockType {
      UNKNOWN = "UNKNOWN",
      OR = "OR",
      AND = "AND"
  }
  interface ConditionBlock {
      type?: BlockType;
      lineExpressions?: string[];
  }
  interface Output {
      /** The jsonata to use to produce the output */
      outputMapping?: string;
  }
  interface Service {
      /** Action's service mapping. */
      serviceMapping?: ServiceMapping;
      /**
       * Action's input mapping.
       * Jsonata description of the input this service gets.
       */
      inputMapping?: string | null;
      /**
       * Action's output mapping.
       * Jsonata description of the output this service returns.
       */
      outputMapping?: string | null;
      /** Action's post actions. */
      postActions?: ActionData[];
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** The namespace of the action */
      namespace?: string | null;
  }
  interface SystemHelper extends SystemHelperHelperOneOf {
      ifFilter?: IfFilter;
      switchFilter?: SwitchFilter;
      delay?: DelayHelper;
      rateLimiting?: RateLimiting;
      conditionFilter?: ConditionFilter;
      output?: Output;
  }
  /** @oneof */
  interface SystemHelperHelperOneOf {
      ifFilter?: IfFilter;
      switchFilter?: SwitchFilter;
      delay?: DelayHelper;
      rateLimiting?: RateLimiting;
      conditionFilter?: ConditionFilter;
      output?: Output;
  }
  interface SpiAction {
      /** The App Def Id of the action provider */
      appDefId?: string;
      /** Identifier for this action - human readable action key - unique per app def id */
      actionKey?: string;
      /** The configuration of the user for this action, can include params that are taken from the trigger event payload */
      userActionConfig?: string | null;
      /** The post action to execute after this action */
      postActions?: ActionData[];
      /** The output configuration of the user for this action, can include params that are taken from the trigger event payload */
      userOutputActionConfig?: string | null;
      /**
       * optional skip condition expression for current action
       * decides whether to skip the action before executing it's post actions
       */
      skipConditionExpression?: string | null;
      /** Action's post actions ids. */
      postActionsIds?: string[];
      /** The namespace of the action */
      namespace?: string | null;
  }
  interface ActivationSource extends ActivationSourceOfOneOf {
      runtime?: Runtime;
      scheduler?: Scheduler;
      asyncAction?: AsyncAction;
  }
  /** @oneof */
  interface ActivationSourceOfOneOf {
      runtime?: Runtime;
      scheduler?: Scheduler;
      asyncAction?: AsyncAction;
  }
  interface ActionsData {
      /** Ids of the first level actions. */
      rootActionIds?: string[];
      /** Map of action id to action data. */
      actions?: Record<string, Action>;
  }
  interface ActionStatus {
      /** Action's status. */
      _id?: string;
      /** Activation's ID. */
      activationId?: string;
      /** Action's name. */
      actionName?: string | null;
      /** Action's status. */
      status?: Status;
      /** Action's error reason (if there is one). */
      errorReason?: string | null;
      /** Activation external id. */
      activationExternalId?: string;
      /** Trigger app id. */
      triggerAppId?: string | null;
      /** Trigger key. */
      triggerKey?: string | null;
      /** The configuration correlation id */
      configurationCorrelationId?: string | null;
  }
  interface BatchActivationRequest {
      /** List of Activation-Request. */
      activationRequests?: ActivationRequest[];
      /**
       * Time of the Batch-Activation-Request creation: used for crm monitoring migration only
       * @internal
       */
      creationDate?: Date;
  }
  interface Empty {
  }
  interface ActivationActionStatusChanged extends ActivationActionStatusChangedStatusInfoOneOf {
      /** Started status information */
      startedInfo?: StartedStatusInfo;
      /** Ended status information */
      endedInfo?: EndedStatusInfo;
      /** Failed status information */
      failedInfo?: FailedStatusInfo;
      /** Action ID */
      _id?: string;
      /** Activation ID */
      activationId?: string;
      /** Automation info */
      automationInfo?: AutomationInfo;
      /** Action type */
      type?: Type;
      /** Event date */
      statusChangedDate?: Date;
      /** Action activation status */
      status?: ActivationActionStatusChangedStatus;
  }
  /** @oneof */
  interface ActivationActionStatusChangedStatusInfoOneOf {
      /** Started status information */
      startedInfo?: StartedStatusInfo;
      /** Ended status information */
      endedInfo?: EndedStatusInfo;
      /** Failed status information */
      failedInfo?: FailedStatusInfo;
  }
  interface StartedStatusInfoAppDefinedActionInfo {
      /** Action input */
      input?: Record<string, any> | null;
  }
  interface DelayActionInfo {
      /** Indicates when this action becomes completed and the activation will move to the post actions */
      date?: Date;
  }
  interface ExpressionEvaluationResult {
      /** Indicates if the expression was evaluated to true or false */
      passed?: boolean;
      /** Indicates if there was an error in the evaluation process */
      error?: boolean;
  }
  interface AppDefinedActionInfo {
      /** The output that the action implementer returned */
      output?: Record<string, any> | null;
  }
  interface ConditionActionInfo {
      /** Indicates that the condition `if` clause evaluated to `true` */
      passed?: boolean;
      /** Collects results per each expression evaluation that took place */
      expressionResults?: Record<string, ExpressionEvaluationResult>;
  }
  interface RateLimitActionInfo {
      /** Indicates if the rate limiter passed (not reached the quota) */
      passed?: boolean;
  }
  interface AutomationInfo extends AutomationInfoOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin;
      /** Automation ID */
      _id?: string;
      /** Origin type */
      origin?: Origin;
  }
  /** @oneof */
  interface AutomationInfoOriginInfoOneOf {
      /** Application info */
      applicationInfo?: ApplicationOrigin;
      /** Preinstalled info */
      preinstalledInfo?: PreinstalledOrigin;
  }
  enum ActivationActionStatusChangedStatus {
      UNKNOWN_ACTION_ACTIVATION_STATUS = "UNKNOWN_ACTION_ACTIVATION_STATUS",
      /**
       * Indicating that action activation has been started and it's in progress
       * Relevant to action types: APP_DEFINED, DELAY
       */
      STARTED = "STARTED",
      /**
       * Indicating that the action activation is completed without errors
       * Relevant to action types: APP_DEFINED, DELAY, CONDITION, RATE_LIMIT
       */
      ENDED = "ENDED",
      /**
       * Indicating that the action is skipped and post actions will not start
       * Relevant to action types: APP_DEFINED
       */
      SKIPPED = "SKIPPED",
      /**
       * Indicating that the action failed
       * Relevant to action types: APP_DEFINED, DELAY, RATE_LIMIT
       */
      FAILED = "FAILED"
  }
  interface StartedStatusInfo extends StartedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: StartedStatusInfoAppDefinedActionInfo;
      /** Delay action additional info */
      delayActionInfo?: DelayActionInfo;
  }
  /** @oneof */
  interface StartedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: StartedStatusInfoAppDefinedActionInfo;
      /** Delay action additional info */
      delayActionInfo?: DelayActionInfo;
  }
  interface EndedStatusInfo extends EndedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: AppDefinedActionInfo;
      /** Condition action additional info */
      conditionActionInfo?: ConditionActionInfo;
      /** Rate limit action additional info */
      rateLimitActionInfo?: RateLimitActionInfo;
  }
  /** @oneof */
  interface EndedStatusInfoTypeInfoOneOf {
      /** APP DEFINED action additional info */
      appDefinedActionInfo?: AppDefinedActionInfo;
      /** Condition action additional info */
      conditionActionInfo?: ConditionActionInfo;
      /** Rate limit action additional info */
      rateLimitActionInfo?: RateLimitActionInfo;
  }
  interface FailedStatusInfo {
      /** Error description */
      errorDescription?: string;
      /** Error code */
      errorCode?: string | null;
  }
  interface ActivationResumeAfterDelay {
      /** Activation identifier */
      _id?: string;
      /** Activation schedule identifier */
      scheduleId?: string;
      /** Activation schedule due date */
      scheduleDate?: Date;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation;
      /** Scheduled action identifier - with the intent to execute that action's post actions */
      scheduledActionId?: string;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
  }
  interface ActionCompletedRequest {
      /** The execution identifier that was given to the spi provider when we invoked the action */
      executionIdentifier: string;
      /** The result of invoking the action. Must conform to the output schema configured by the action provider. */
      result?: Record<string, any> | null;
  }
  interface RefreshPayloadRequest {
      /** Application definition ID. */
      appDefId?: string;
      /** Trigger key. */
      triggerKey?: string;
      /** Payload to refresh. */
      payload?: Record<string, any> | null;
      /** External entity ID. */
      externalEntityId?: string | null;
  }
  interface RefreshPayloadResponse {
      /** Updated payload. */
      payload?: Record<string, any> | null;
      /** If the automation activation should be canceled (default is false) */
      cancelActivation?: boolean | null;
  }
  interface RunAutomationRequest {
      /** App of the automation trigger */
      appId?: string;
      /** Trigger key of the action */
      triggerKey?: string;
      /** Payload of the triggered event */
      triggerPayload?: Record<string, any> | null;
      /** Specific automation id to run */
      automationId?: string;
  }
  interface RunAutomationResponse {
      /** Automation activation output payload */
      output?: Record<string, any> | null;
  }
  interface ActivationScheduleRequested {
      /** Activation identifier */
      _id?: string;
      /** Activation schedule request date */
      requestedDate?: Date;
      /** Activation schedule due date */
      scheduleDate?: Date;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
  }
  interface ActivationContinuedAfterSchedule {
      /** Activation identifier */
      _id?: string;
      /** Activation Automation */
      automation?: Automation;
  }
  interface ReportEventRequest {
      /**
       * Trigger key as defined in your app's trigger configuration
       * in the Wix Developers Center.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload?: Record<string, any> | null;
      /**
       * ID of the related resource in GUID format.
       * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
       *
       * Required if your app needs to
       * [cancel the event](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/cancel-event)
       * if the automation becomes no longer relevant.
       *
       * Typically, this ID is defined in your system,
       * but you can also use any Wix resource GUID,
       * such as contact ID, member ID, or invoice ID.
       * See
       * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#about-canceling-events)
       * for more information.
       */
      externalEntityId?: string | null;
      /** Idempotency information for the event */
      idempotency?: Idempotency;
  }
  interface Idempotency {
      /**
       * A unique identifier for the event.
       * If you send the same idempotency key in multiple report event requests, for the same trigger key and app id,
       * consecutive requests will be ignored after the first one. Note that the idempotency key is kept for a week before it expires.
       */
      key?: string;
      /** Optional. The time to live (TTL) in milliseconds before the key will expire. Default is a week. */
      ttlInMilliseconds?: string | null;
  }
  interface ReportEventResponse {
      /** The activation IDs of triggered ReportEvents. */
      activationIds?: string[];
  }
  interface BulkReportEventRequest {
      /**
       * Trigger key as defined in your app's trigger configuration
       * in the Wix Developers Center.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
      /** Repeated list of event details for bulk reporting */
      eventsInfo: EventInfo[];
  }
  interface EventInfo {
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       */
      payload?: Record<string, any> | null;
      /** ID of the related resource in GUID format. */
      externalEntityId?: string | null;
      /** Idempotency information for the event */
      idempotency?: Idempotency;
  }
  interface BulkReportEventResponse {
      /** Trigger key associated with the event */
      triggerKey?: string;
      /** List of results for each item in the bulk report event request */
      results?: BulkReportEventResult[];
      /** Metadata for the overall bulk action, including success and failure counts */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkReportEventResult {
      /** Metadata for the individual item in the request */
      itemMetadata?: ItemMetadata;
      /** Event details for the item in the request */
      eventInfo?: EventInfo;
      /** The activation IDs of triggered ReportEvents. */
      activationIds?: string[];
  }
  interface ItemMetadata {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError;
  }
  interface ApplicationError {
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
  interface BulkCancelEventRequest {
      /**
       * Trigger key whose events you want to cancel.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
      /** Repeated list of external_entity_id, representing the related resources' IDs */
      externalEntityIds: string[];
  }
  interface BulkCancelEventResponse {
      /** Trigger key related to the cancelled event */
      triggerKey?: string;
      /** List of results for each item in the bulk cancel event request */
      results?: BulkCancelEventResult[];
      /** Metadata for the overall bulk action, including success and failure counts */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkCancelEventResult {
      /** Metadata of the item, including its ID and success or failure status */
      itemMetadata?: ItemMetadata;
      /** ID of the related resource in GUID format */
      externalEntityId?: string;
  }
  interface CancelEventRequest {
      /**
       * ID of the related resource in GUID format.
       * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
       *
       * Typically, this ID is defined in your system,
       * but you can also use any Wix resource GUID,
       * such as contact ID, member ID, or invoice ID.
       * See
       * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#choose-the-right-externalentityid)
       * for more information.
       */
      externalEntityId: string;
      /**
       * Trigger key whose event you want to cancel.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
  }
  interface CancelEventResponse {
  }
  interface V1RunAutomationRequest extends V1RunAutomationRequestIdentifierOneOf {
      /** a preinstalled automation identifier */
      preinstalledIdentifier?: PreinstalledIdentifier;
      /** a automation of any type identifier that will be available in future */
      automationIdentifier?: AutomationIdentifier;
      /** identifier MUST be either AUTOMATION or PREINSTALLED */
      identifierType: IdentifierType;
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload: Record<string, any> | null;
  }
  /** @oneof */
  interface V1RunAutomationRequestIdentifierOneOf {
      /** a preinstalled automation identifier */
      preinstalledIdentifier?: PreinstalledIdentifier;
      /** a automation of any type identifier that will be available in future */
      automationIdentifier?: AutomationIdentifier;
  }
  enum IdentifierType {
      UNKNOWN_IDENTIFIER = "UNKNOWN_IDENTIFIER",
      PREINSTALLED = "PREINSTALLED",
      AUTOMATION = "AUTOMATION"
  }
  interface PreinstalledIdentifier {
      /** identifier for the application of the preinstalled */
      appId?: string;
      /** application component id */
      componentId?: string;
  }
  interface AutomationIdentifier {
      /** automation id */
      automationId?: string;
  }
  interface V1RunAutomationResponse {
  }
  interface ReportDomainEventRequest {
      /** trigger app id */
      triggerAppId: string;
      /** report event request */
      reportEventRequest: ReportEventRequest;
  }
  interface ReportDomainEventResponse {
  }
  interface ExecuteFromActionRequest {
      /** Requested action id */
      actionId?: string;
      /** Optional: an activation id to link this action to */
      activationId?: string | null;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Configuration correlation id to run this action from */
      configurationCorrelationId?: string;
      /** Optional - schedule id that this action was scheduled from */
      scheduleId?: string | null;
      /** Optional - an external entity id that this execution is related to */
      externalEntityId?: string | null;
      /** Optional - Activation automation */
      automation?: Automation;
  }
  interface ExecuteFromActionResponse {
  }
  interface ActivationScheduleCompleted {
      /** Activation identifier */
      _id?: string;
      /** Activation schedule identifier */
      scheduleId?: string;
      /** Activation schedule due date */
      scheduleDate?: Date;
      /** Activation payload */
      payload?: Record<string, any> | null;
      /** Activation Automation */
      automation?: Automation;
      /** Optional - external entity id that this activation is related to */
      externalEntityId?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField schedule
   * @requiredField schedule.scheduledAction
   * @adminMethod
   */
  function schedule(schedule: Schedule): Promise<ScheduleResponse>;
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function cancelPendingSchedule(options?: CancelPendingScheduleOptions): Promise<void>;
  interface CancelPendingScheduleOptions extends CancelPendingScheduleRequestByOneOf {
      _id?: string;
      identifier?: string;
      configurationCorrelationId?: string;
      activationId?: string;
      identifierPattern?: string;
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function updatePendingSchedulesPayload(options?: UpdatePendingSchedulesPayloadOptions): Promise<void>;
  interface UpdatePendingSchedulesPayloadOptions {
      identifier?: string;
      eventPayload?: string;
  }
  /** @param executionIdentifier - The execution identifier that was given to the spi provider when we invoked the action
   * @internal
   * @documentationMaturity preview
   * @requiredField executionIdentifier
   * @adminMethod
   */
  function actionCompleted(executionIdentifier: string, options?: ActionCompletedOptions): Promise<void>;
  interface ActionCompletedOptions {
      /** The result of invoking the action. Must conform to the output schema configured by the action provider. */
      result?: Record<string, any> | null;
  }
  /**
   * Reports an event and activates site automations with the specified trigger key.
   *
   *
   * Only the app that created a trigger can report events for it.
   * This means other apps can't report events for your triggers,
   * and you can't report events for another app's triggers.
   *
   * If your app supports canceling events,
   * `externalEntityId` must be provided.
   * `externalEntityId` is required when calling [Cancel Event](#cancel-event).
   *
   * > You cannot try out this endpoint because
   * > it can be called only by the app that created the specified `triggerKey`.
   * > So please ignore the **Try It Out** button.
   *
   * <blockquote class="important">
   *
   * __Permissions__
   * This endpoint requires the Manage Your App
   * [permission scope](https://devforum.wix.com/en/article/available-permissions).
   *
   * </blockquote>
   * @param triggerKey - Trigger key as defined in your app's trigger configuration
   * in the Wix Developers Center.
   * For example, `form_submitted` or `invoice_due`.
   * @public
   * @documentationMaturity preview
   * @requiredField triggerKey
   * @adminMethod
   */
  function reportEvent(triggerKey: string, options?: ReportEventOptions): Promise<ReportEventResponse>;
  interface ReportEventOptions {
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload?: Record<string, any> | null;
      /**
       * ID of the related resource in GUID format.
       * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
       *
       * Required if your app needs to
       * [cancel the event](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/cancel-event)
       * if the automation becomes no longer relevant.
       *
       * Typically, this ID is defined in your system,
       * but you can also use any Wix resource GUID,
       * such as contact ID, member ID, or invoice ID.
       * See
       * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#about-canceling-events)
       * for more information.
       */
      externalEntityId?: string | null;
      /** Idempotency information for the event */
      idempotency?: Idempotency;
  }
  /**
   * Bulk reports events and activates site automations with the specified trigger key.
   * @param triggerKey - Trigger key as defined in your app's trigger configuration
   * in the Wix Developers Center.
   * For example, `form_submitted` or `invoice_due`.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.eventsInfo
   * @requiredField triggerKey
   * @adminMethod
   */
  function bulkReportEvent(triggerKey: string, options: BulkReportEventOptions): Promise<BulkReportEventResponse>;
  interface BulkReportEventOptions {
      /** Repeated list of event details for bulk reporting */
      eventsInfo: EventInfo[];
  }
  /**
   * Bulk cancels any remaining actions for a trigger and external entities.
   * @param triggerKey - Trigger key whose events you want to cancel.
   * For example, `form_submitted` or `invoice_due`.
   * @public
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.externalEntityIds
   * @requiredField triggerKey
   * @adminMethod
   */
  function bulkCancelEvent(triggerKey: string, options: BulkCancelEventOptions): Promise<BulkCancelEventResponse>;
  interface BulkCancelEventOptions {
      /** Repeated list of external_entity_id, representing the related resources' IDs */
      externalEntityIds: string[];
  }
  /**
   * Cancels any remaining actions for a trigger and external entity.
   *
   *
   * Events are not cancelable by default.
   * To make an event cancelable,
   * you must first pass an `externalEntityId`
   * and the applicable `triggerKey` to [Report Event](#report-event).
   * When you call Cancel Event with the same `externalEntityId` and `triggerKey`,
   * the event is canceled,
   * as are all other events that share the `externalEntityId` and `triggerKey`.
   * See
   * [Reporting and Canceling Events](#reporting-and-canceling-events)
   * for more information.
   *
   * > You cannot try out this endpoint because
   * > it can be called only by the app that created the specified `triggerKey`.
   * > So please ignore the **Try It Out** button.
   *
   * <blockquote class="important">
   *
   * __Permissions__
   * This endpoint requires the Manage Your App
   * [permission scope](https://devforum.wix.com/en/article/available-permissions).
   *
   * </blockquote>
   * @param externalEntityId - ID of the related resource in GUID format.
   * For example, `fc81a355-3429-50fc-a4c7-def486e828f3`.
   *
   * Typically, this ID is defined in your system,
   * but you can also use any Wix resource GUID,
   * such as contact ID, member ID, or invoice ID.
   * See
   * [Choose the right `externalEntityId`](https://dev.wix.com/docs/rest/business-management/automations/triggered-events/reporting-and-canceling-events#choose-the-right-externalentityid)
   * for more information.
   * @public
   * @documentationMaturity preview
   * @requiredField externalEntityId
   * @requiredField options
   * @requiredField options.triggerKey
   * @adminMethod
   */
  function cancelEvent(externalEntityId: string, options: CancelEventOptions): Promise<void>;
  interface CancelEventOptions {
      /**
       * Trigger key whose event you want to cancel.
       * For example, `form_submitted` or `invoice_due`.
       */
      triggerKey: string;
  }
  /**
   * Runs an automation manually.
   *
   * This gives a user the ability to trigger the automation manually,
   * without requiring an event to be reported to start the automation.
   * As an example,
   * consider an automation that sends a confirmation for a hotel booking when a user submits a reservation online.
   * However, if the user calls the hotel directly to make the reservation, the automation isn't triggered.
   * The site owner needs a way to send the automated confirmation without the user making an online booking.
   * Run Automation provides this functionality.
   *
   *
   * <blockquote class="important">
   * __Permissions__
   * This endpoint requires the Manage Your App
   * [permission scope](https://devforum.wix.com/en/article/available-permissions).
   * </blockquote>
   * @param identifierType - identifier MUST be either AUTOMATION or PREINSTALLED
   * @internal
   * @documentationMaturity preview
   * @requiredField identifierType
   * @requiredField options.payload
   * @adminMethod
   */
  function esbConfigResolverRunAutomation(identifierType: IdentifierType, options?: EsbConfigResolverRunAutomationOptions): Promise<void>;
  interface EsbConfigResolverRunAutomationOptions extends V1RunAutomationRequestIdentifierOneOf {
      /** a preinstalled automation identifier */
      preinstalledIdentifier?: PreinstalledIdentifier;
      /** a automation of any type identifier that will be available in future */
      automationIdentifier?: AutomationIdentifier;
      /**
       * Event payload, formatted as key:value pairs.
       * Must comply with the payload schema
       * if you provided one when configuring your trigger.
       *
       * Key names can include only alphanumeric characters or underscores
       * (`A-Z`, `a-z`, `0-9`, `_`).
       * They cannot start with an underscore.
       *
       * Values can be strings, numbers, integers, booleans, or arrays.
       * If a value is an array, the array items must be objects,
       * and nested object properties must be
       * strings, numbers, integers, or booleans only.
       */
      payload: Record<string, any> | null;
  }
  /**
   * Report domain event
   * @param triggerAppId - trigger app id
   * @internal
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.reportEventRequest
   * @requiredField options.reportEventRequest.triggerKey
   * @requiredField triggerAppId
   * @adminMethod
   */
  function reportDomainEvent(triggerAppId: string, options: ReportDomainEventOptions): Promise<void>;
  interface ReportDomainEventOptions {
      /** report event request */
      reportEventRequest: ReportEventRequest;
  }
  
  type automationsV2Activation_universal_d_Activation = Activation;
  type automationsV2Activation_universal_d_Automation = Automation;
  type automationsV2Activation_universal_d_AutomationOriginInfoOneOf = AutomationOriginInfoOneOf;
  type automationsV2Activation_universal_d_ActionSettings = ActionSettings;
  type automationsV2Activation_universal_d_AuditInfo = AuditInfo;
  type automationsV2Activation_universal_d_AuditInfoIdOneOf = AuditInfoIdOneOf;
  type automationsV2Activation_universal_d_AutomationConfiguration = AutomationConfiguration;
  type automationsV2Activation_universal_d_TimeUnit = TimeUnit;
  const automationsV2Activation_universal_d_TimeUnit: typeof TimeUnit;
  type automationsV2Activation_universal_d_Filter = Filter;
  type automationsV2Activation_universal_d_FutureDateActivationOffset = FutureDateActivationOffset;
  type automationsV2Activation_universal_d_ConditionExpressionGroup = ConditionExpressionGroup;
  type automationsV2Activation_universal_d_Operator = Operator;
  const automationsV2Activation_universal_d_Operator: typeof Operator;
  type automationsV2Activation_universal_d_Type = Type;
  const automationsV2Activation_universal_d_Type: typeof Type;
  type automationsV2Activation_universal_d_AppDefinedAction = AppDefinedAction;
  type automationsV2Activation_universal_d_ConditionAction = ConditionAction;
  type automationsV2Activation_universal_d_DelayAction = DelayAction;
  type automationsV2Activation_universal_d_RateLimitAction = RateLimitAction;
  type automationsV2Activation_universal_d_OutputAction = OutputAction;
  type automationsV2Activation_universal_d_AutomationConfigurationStatus = AutomationConfigurationStatus;
  const automationsV2Activation_universal_d_AutomationConfigurationStatus: typeof AutomationConfigurationStatus;
  type automationsV2Activation_universal_d_Trigger = Trigger;
  type automationsV2Activation_universal_d_AutomationConfigurationAction = AutomationConfigurationAction;
  type automationsV2Activation_universal_d_AutomationConfigurationActionInfoOneOf = AutomationConfigurationActionInfoOneOf;
  type automationsV2Activation_universal_d_Origin = Origin;
  const automationsV2Activation_universal_d_Origin: typeof Origin;
  type automationsV2Activation_universal_d_ApplicationOrigin = ApplicationOrigin;
  type automationsV2Activation_universal_d_PreinstalledOrigin = PreinstalledOrigin;
  type automationsV2Activation_universal_d_AutomationSettings = AutomationSettings;
  type automationsV2Activation_universal_d_ActivationStatus = ActivationStatus;
  type automationsV2Activation_universal_d_Status = Status;
  const automationsV2Activation_universal_d_Status: typeof Status;
  type automationsV2Activation_universal_d_ActivationStatusChanged = ActivationStatusChanged;
  type automationsV2Activation_universal_d_ActivationStatusChangedStatusInfoOneOf = ActivationStatusChangedStatusInfoOneOf;
  type automationsV2Activation_universal_d_Target = Target;
  const automationsV2Activation_universal_d_Target: typeof Target;
  type automationsV2Activation_universal_d_CancellationReason = CancellationReason;
  const automationsV2Activation_universal_d_CancellationReason: typeof CancellationReason;
  type automationsV2Activation_universal_d_Identity = Identity;
  type automationsV2Activation_universal_d_ActivationStatusChangedStatus = ActivationStatusChangedStatus;
  const automationsV2Activation_universal_d_ActivationStatusChangedStatus: typeof ActivationStatusChangedStatus;
  type automationsV2Activation_universal_d_InitiatedStatusInfo = InitiatedStatusInfo;
  type automationsV2Activation_universal_d_ScheduledStatusInfo = ScheduledStatusInfo;
  type automationsV2Activation_universal_d_CancelledStatusInfo = CancelledStatusInfo;
  type automationsV2Activation_universal_d_ActivationStatusChangedFailedStatusInfo = ActivationStatusChangedFailedStatusInfo;
  type automationsV2Activation_universal_d_ScheduleRequest = ScheduleRequest;
  type automationsV2Activation_universal_d_Schedule = Schedule;
  type automationsV2Activation_universal_d_ScheduledAction = ScheduledAction;
  type automationsV2Activation_universal_d_Delay = Delay;
  type automationsV2Activation_universal_d_DelayOfOneOf = DelayOfOneOf;
  type automationsV2Activation_universal_d_SimpleDelay = SimpleDelay;
  type automationsV2Activation_universal_d_Units = Units;
  const automationsV2Activation_universal_d_Units: typeof Units;
  type automationsV2Activation_universal_d_ScheduleStatus = ScheduleStatus;
  const automationsV2Activation_universal_d_ScheduleStatus: typeof ScheduleStatus;
  type automationsV2Activation_universal_d_TriggerInfo = TriggerInfo;
  type automationsV2Activation_universal_d_ScheduleResponse = ScheduleResponse;
  type automationsV2Activation_universal_d_CancelPendingScheduleRequest = CancelPendingScheduleRequest;
  type automationsV2Activation_universal_d_CancelPendingScheduleRequestByOneOf = CancelPendingScheduleRequestByOneOf;
  type automationsV2Activation_universal_d_CancelPendingScheduleResponse = CancelPendingScheduleResponse;
  type automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadRequest = UpdatePendingSchedulesPayloadRequest;
  type automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadResponse = UpdatePendingSchedulesPayloadResponse;
  type automationsV2Activation_universal_d_DomainEvent = DomainEvent;
  type automationsV2Activation_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type automationsV2Activation_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type automationsV2Activation_universal_d_UndeleteInfo = UndeleteInfo;
  type automationsV2Activation_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type automationsV2Activation_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type automationsV2Activation_universal_d_ActionEvent = ActionEvent;
  type automationsV2Activation_universal_d_MessageEnvelope = MessageEnvelope;
  type automationsV2Activation_universal_d_IdentificationData = IdentificationData;
  type automationsV2Activation_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type automationsV2Activation_universal_d_WebhookIdentityType = WebhookIdentityType;
  const automationsV2Activation_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type automationsV2Activation_universal_d_ActivationRequest = ActivationRequest;
  type automationsV2Activation_universal_d_Runtime = Runtime;
  type automationsV2Activation_universal_d_Scheduler = Scheduler;
  type automationsV2Activation_universal_d_AsyncAction = AsyncAction;
  type automationsV2Activation_universal_d_ActionData = ActionData;
  type automationsV2Activation_universal_d_Action = Action;
  type automationsV2Activation_universal_d_ActionActionOneOf = ActionActionOneOf;
  type automationsV2Activation_universal_d_ServiceMapping = ServiceMapping;
  type automationsV2Activation_universal_d_IfFilter = IfFilter;
  type automationsV2Activation_universal_d_SwitchFilter = SwitchFilter;
  type automationsV2Activation_universal_d_Case = Case;
  type automationsV2Activation_universal_d_DelayHelper = DelayHelper;
  type automationsV2Activation_universal_d_RateLimiting = RateLimiting;
  type automationsV2Activation_universal_d_ConditionFilter = ConditionFilter;
  type automationsV2Activation_universal_d_BlockType = BlockType;
  const automationsV2Activation_universal_d_BlockType: typeof BlockType;
  type automationsV2Activation_universal_d_ConditionBlock = ConditionBlock;
  type automationsV2Activation_universal_d_Output = Output;
  type automationsV2Activation_universal_d_Service = Service;
  type automationsV2Activation_universal_d_SystemHelper = SystemHelper;
  type automationsV2Activation_universal_d_SystemHelperHelperOneOf = SystemHelperHelperOneOf;
  type automationsV2Activation_universal_d_SpiAction = SpiAction;
  type automationsV2Activation_universal_d_ActivationSource = ActivationSource;
  type automationsV2Activation_universal_d_ActivationSourceOfOneOf = ActivationSourceOfOneOf;
  type automationsV2Activation_universal_d_ActionsData = ActionsData;
  type automationsV2Activation_universal_d_ActionStatus = ActionStatus;
  type automationsV2Activation_universal_d_BatchActivationRequest = BatchActivationRequest;
  type automationsV2Activation_universal_d_Empty = Empty;
  type automationsV2Activation_universal_d_ActivationActionStatusChanged = ActivationActionStatusChanged;
  type automationsV2Activation_universal_d_ActivationActionStatusChangedStatusInfoOneOf = ActivationActionStatusChangedStatusInfoOneOf;
  type automationsV2Activation_universal_d_StartedStatusInfoAppDefinedActionInfo = StartedStatusInfoAppDefinedActionInfo;
  type automationsV2Activation_universal_d_DelayActionInfo = DelayActionInfo;
  type automationsV2Activation_universal_d_ExpressionEvaluationResult = ExpressionEvaluationResult;
  type automationsV2Activation_universal_d_AppDefinedActionInfo = AppDefinedActionInfo;
  type automationsV2Activation_universal_d_ConditionActionInfo = ConditionActionInfo;
  type automationsV2Activation_universal_d_RateLimitActionInfo = RateLimitActionInfo;
  type automationsV2Activation_universal_d_AutomationInfo = AutomationInfo;
  type automationsV2Activation_universal_d_AutomationInfoOriginInfoOneOf = AutomationInfoOriginInfoOneOf;
  type automationsV2Activation_universal_d_ActivationActionStatusChangedStatus = ActivationActionStatusChangedStatus;
  const automationsV2Activation_universal_d_ActivationActionStatusChangedStatus: typeof ActivationActionStatusChangedStatus;
  type automationsV2Activation_universal_d_StartedStatusInfo = StartedStatusInfo;
  type automationsV2Activation_universal_d_StartedStatusInfoTypeInfoOneOf = StartedStatusInfoTypeInfoOneOf;
  type automationsV2Activation_universal_d_EndedStatusInfo = EndedStatusInfo;
  type automationsV2Activation_universal_d_EndedStatusInfoTypeInfoOneOf = EndedStatusInfoTypeInfoOneOf;
  type automationsV2Activation_universal_d_FailedStatusInfo = FailedStatusInfo;
  type automationsV2Activation_universal_d_ActivationResumeAfterDelay = ActivationResumeAfterDelay;
  type automationsV2Activation_universal_d_ActionCompletedRequest = ActionCompletedRequest;
  type automationsV2Activation_universal_d_RefreshPayloadRequest = RefreshPayloadRequest;
  type automationsV2Activation_universal_d_RefreshPayloadResponse = RefreshPayloadResponse;
  type automationsV2Activation_universal_d_RunAutomationRequest = RunAutomationRequest;
  type automationsV2Activation_universal_d_RunAutomationResponse = RunAutomationResponse;
  type automationsV2Activation_universal_d_ActivationScheduleRequested = ActivationScheduleRequested;
  type automationsV2Activation_universal_d_ActivationContinuedAfterSchedule = ActivationContinuedAfterSchedule;
  type automationsV2Activation_universal_d_ReportEventRequest = ReportEventRequest;
  type automationsV2Activation_universal_d_Idempotency = Idempotency;
  type automationsV2Activation_universal_d_ReportEventResponse = ReportEventResponse;
  type automationsV2Activation_universal_d_BulkReportEventRequest = BulkReportEventRequest;
  type automationsV2Activation_universal_d_EventInfo = EventInfo;
  type automationsV2Activation_universal_d_BulkReportEventResponse = BulkReportEventResponse;
  type automationsV2Activation_universal_d_BulkReportEventResult = BulkReportEventResult;
  type automationsV2Activation_universal_d_ItemMetadata = ItemMetadata;
  type automationsV2Activation_universal_d_ApplicationError = ApplicationError;
  type automationsV2Activation_universal_d_BulkActionMetadata = BulkActionMetadata;
  type automationsV2Activation_universal_d_BulkCancelEventRequest = BulkCancelEventRequest;
  type automationsV2Activation_universal_d_BulkCancelEventResponse = BulkCancelEventResponse;
  type automationsV2Activation_universal_d_BulkCancelEventResult = BulkCancelEventResult;
  type automationsV2Activation_universal_d_CancelEventRequest = CancelEventRequest;
  type automationsV2Activation_universal_d_CancelEventResponse = CancelEventResponse;
  type automationsV2Activation_universal_d_V1RunAutomationRequest = V1RunAutomationRequest;
  type automationsV2Activation_universal_d_V1RunAutomationRequestIdentifierOneOf = V1RunAutomationRequestIdentifierOneOf;
  type automationsV2Activation_universal_d_IdentifierType = IdentifierType;
  const automationsV2Activation_universal_d_IdentifierType: typeof IdentifierType;
  type automationsV2Activation_universal_d_PreinstalledIdentifier = PreinstalledIdentifier;
  type automationsV2Activation_universal_d_AutomationIdentifier = AutomationIdentifier;
  type automationsV2Activation_universal_d_V1RunAutomationResponse = V1RunAutomationResponse;
  type automationsV2Activation_universal_d_ReportDomainEventRequest = ReportDomainEventRequest;
  type automationsV2Activation_universal_d_ReportDomainEventResponse = ReportDomainEventResponse;
  type automationsV2Activation_universal_d_ExecuteFromActionRequest = ExecuteFromActionRequest;
  type automationsV2Activation_universal_d_ExecuteFromActionResponse = ExecuteFromActionResponse;
  type automationsV2Activation_universal_d_ActivationScheduleCompleted = ActivationScheduleCompleted;
  const automationsV2Activation_universal_d_schedule: typeof schedule;
  const automationsV2Activation_universal_d_cancelPendingSchedule: typeof cancelPendingSchedule;
  type automationsV2Activation_universal_d_CancelPendingScheduleOptions = CancelPendingScheduleOptions;
  const automationsV2Activation_universal_d_updatePendingSchedulesPayload: typeof updatePendingSchedulesPayload;
  type automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadOptions = UpdatePendingSchedulesPayloadOptions;
  const automationsV2Activation_universal_d_actionCompleted: typeof actionCompleted;
  type automationsV2Activation_universal_d_ActionCompletedOptions = ActionCompletedOptions;
  const automationsV2Activation_universal_d_reportEvent: typeof reportEvent;
  type automationsV2Activation_universal_d_ReportEventOptions = ReportEventOptions;
  const automationsV2Activation_universal_d_bulkReportEvent: typeof bulkReportEvent;
  type automationsV2Activation_universal_d_BulkReportEventOptions = BulkReportEventOptions;
  const automationsV2Activation_universal_d_bulkCancelEvent: typeof bulkCancelEvent;
  type automationsV2Activation_universal_d_BulkCancelEventOptions = BulkCancelEventOptions;
  const automationsV2Activation_universal_d_cancelEvent: typeof cancelEvent;
  type automationsV2Activation_universal_d_CancelEventOptions = CancelEventOptions;
  const automationsV2Activation_universal_d_esbConfigResolverRunAutomation: typeof esbConfigResolverRunAutomation;
  type automationsV2Activation_universal_d_EsbConfigResolverRunAutomationOptions = EsbConfigResolverRunAutomationOptions;
  const automationsV2Activation_universal_d_reportDomainEvent: typeof reportDomainEvent;
  type automationsV2Activation_universal_d_ReportDomainEventOptions = ReportDomainEventOptions;
  namespace automationsV2Activation_universal_d {
    export {
      automationsV2Activation_universal_d_Activation as Activation,
      automationsV2Activation_universal_d_Automation as Automation,
      automationsV2Activation_universal_d_AutomationOriginInfoOneOf as AutomationOriginInfoOneOf,
      automationsV2Activation_universal_d_ActionSettings as ActionSettings,
      automationsV2Activation_universal_d_AuditInfo as AuditInfo,
      automationsV2Activation_universal_d_AuditInfoIdOneOf as AuditInfoIdOneOf,
      automationsV2Activation_universal_d_AutomationConfiguration as AutomationConfiguration,
      automationsV2Activation_universal_d_TimeUnit as TimeUnit,
      automationsV2Activation_universal_d_Filter as Filter,
      automationsV2Activation_universal_d_FutureDateActivationOffset as FutureDateActivationOffset,
      automationsV2Activation_universal_d_ConditionExpressionGroup as ConditionExpressionGroup,
      automationsV2Activation_universal_d_Operator as Operator,
      automationsV2Activation_universal_d_Type as Type,
      automationsV2Activation_universal_d_AppDefinedAction as AppDefinedAction,
      automationsV2Activation_universal_d_ConditionAction as ConditionAction,
      automationsV2Activation_universal_d_DelayAction as DelayAction,
      automationsV2Activation_universal_d_RateLimitAction as RateLimitAction,
      automationsV2Activation_universal_d_OutputAction as OutputAction,
      automationsV2Activation_universal_d_AutomationConfigurationStatus as AutomationConfigurationStatus,
      automationsV2Activation_universal_d_Trigger as Trigger,
      automationsV2Activation_universal_d_AutomationConfigurationAction as AutomationConfigurationAction,
      automationsV2Activation_universal_d_AutomationConfigurationActionInfoOneOf as AutomationConfigurationActionInfoOneOf,
      automationsV2Activation_universal_d_Origin as Origin,
      automationsV2Activation_universal_d_ApplicationOrigin as ApplicationOrigin,
      automationsV2Activation_universal_d_PreinstalledOrigin as PreinstalledOrigin,
      automationsV2Activation_universal_d_AutomationSettings as AutomationSettings,
      automationsV2Activation_universal_d_ActivationStatus as ActivationStatus,
      automationsV2Activation_universal_d_Status as Status,
      automationsV2Activation_universal_d_ActivationStatusChanged as ActivationStatusChanged,
      automationsV2Activation_universal_d_ActivationStatusChangedStatusInfoOneOf as ActivationStatusChangedStatusInfoOneOf,
      automationsV2Activation_universal_d_Target as Target,
      automationsV2Activation_universal_d_CancellationReason as CancellationReason,
      automationsV2Activation_universal_d_Identity as Identity,
      automationsV2Activation_universal_d_ActivationStatusChangedStatus as ActivationStatusChangedStatus,
      automationsV2Activation_universal_d_InitiatedStatusInfo as InitiatedStatusInfo,
      automationsV2Activation_universal_d_ScheduledStatusInfo as ScheduledStatusInfo,
      automationsV2Activation_universal_d_CancelledStatusInfo as CancelledStatusInfo,
      automationsV2Activation_universal_d_ActivationStatusChangedFailedStatusInfo as ActivationStatusChangedFailedStatusInfo,
      automationsV2Activation_universal_d_ScheduleRequest as ScheduleRequest,
      automationsV2Activation_universal_d_Schedule as Schedule,
      automationsV2Activation_universal_d_ScheduledAction as ScheduledAction,
      automationsV2Activation_universal_d_Delay as Delay,
      automationsV2Activation_universal_d_DelayOfOneOf as DelayOfOneOf,
      automationsV2Activation_universal_d_SimpleDelay as SimpleDelay,
      automationsV2Activation_universal_d_Units as Units,
      automationsV2Activation_universal_d_ScheduleStatus as ScheduleStatus,
      automationsV2Activation_universal_d_TriggerInfo as TriggerInfo,
      automationsV2Activation_universal_d_ScheduleResponse as ScheduleResponse,
      automationsV2Activation_universal_d_CancelPendingScheduleRequest as CancelPendingScheduleRequest,
      automationsV2Activation_universal_d_CancelPendingScheduleRequestByOneOf as CancelPendingScheduleRequestByOneOf,
      automationsV2Activation_universal_d_CancelPendingScheduleResponse as CancelPendingScheduleResponse,
      automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadRequest as UpdatePendingSchedulesPayloadRequest,
      automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadResponse as UpdatePendingSchedulesPayloadResponse,
      automationsV2Activation_universal_d_DomainEvent as DomainEvent,
      automationsV2Activation_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      automationsV2Activation_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      automationsV2Activation_universal_d_UndeleteInfo as UndeleteInfo,
      automationsV2Activation_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      automationsV2Activation_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      automationsV2Activation_universal_d_ActionEvent as ActionEvent,
      automationsV2Activation_universal_d_MessageEnvelope as MessageEnvelope,
      automationsV2Activation_universal_d_IdentificationData as IdentificationData,
      automationsV2Activation_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      automationsV2Activation_universal_d_WebhookIdentityType as WebhookIdentityType,
      automationsV2Activation_universal_d_ActivationRequest as ActivationRequest,
      automationsV2Activation_universal_d_Runtime as Runtime,
      automationsV2Activation_universal_d_Scheduler as Scheduler,
      automationsV2Activation_universal_d_AsyncAction as AsyncAction,
      automationsV2Activation_universal_d_ActionData as ActionData,
      automationsV2Activation_universal_d_Action as Action,
      automationsV2Activation_universal_d_ActionActionOneOf as ActionActionOneOf,
      automationsV2Activation_universal_d_ServiceMapping as ServiceMapping,
      automationsV2Activation_universal_d_IfFilter as IfFilter,
      automationsV2Activation_universal_d_SwitchFilter as SwitchFilter,
      automationsV2Activation_universal_d_Case as Case,
      automationsV2Activation_universal_d_DelayHelper as DelayHelper,
      automationsV2Activation_universal_d_RateLimiting as RateLimiting,
      automationsV2Activation_universal_d_ConditionFilter as ConditionFilter,
      automationsV2Activation_universal_d_BlockType as BlockType,
      automationsV2Activation_universal_d_ConditionBlock as ConditionBlock,
      automationsV2Activation_universal_d_Output as Output,
      automationsV2Activation_universal_d_Service as Service,
      automationsV2Activation_universal_d_SystemHelper as SystemHelper,
      automationsV2Activation_universal_d_SystemHelperHelperOneOf as SystemHelperHelperOneOf,
      automationsV2Activation_universal_d_SpiAction as SpiAction,
      automationsV2Activation_universal_d_ActivationSource as ActivationSource,
      automationsV2Activation_universal_d_ActivationSourceOfOneOf as ActivationSourceOfOneOf,
      automationsV2Activation_universal_d_ActionsData as ActionsData,
      automationsV2Activation_universal_d_ActionStatus as ActionStatus,
      automationsV2Activation_universal_d_BatchActivationRequest as BatchActivationRequest,
      automationsV2Activation_universal_d_Empty as Empty,
      automationsV2Activation_universal_d_ActivationActionStatusChanged as ActivationActionStatusChanged,
      automationsV2Activation_universal_d_ActivationActionStatusChangedStatusInfoOneOf as ActivationActionStatusChangedStatusInfoOneOf,
      automationsV2Activation_universal_d_StartedStatusInfoAppDefinedActionInfo as StartedStatusInfoAppDefinedActionInfo,
      automationsV2Activation_universal_d_DelayActionInfo as DelayActionInfo,
      automationsV2Activation_universal_d_ExpressionEvaluationResult as ExpressionEvaluationResult,
      automationsV2Activation_universal_d_AppDefinedActionInfo as AppDefinedActionInfo,
      automationsV2Activation_universal_d_ConditionActionInfo as ConditionActionInfo,
      automationsV2Activation_universal_d_RateLimitActionInfo as RateLimitActionInfo,
      automationsV2Activation_universal_d_AutomationInfo as AutomationInfo,
      automationsV2Activation_universal_d_AutomationInfoOriginInfoOneOf as AutomationInfoOriginInfoOneOf,
      automationsV2Activation_universal_d_ActivationActionStatusChangedStatus as ActivationActionStatusChangedStatus,
      automationsV2Activation_universal_d_StartedStatusInfo as StartedStatusInfo,
      automationsV2Activation_universal_d_StartedStatusInfoTypeInfoOneOf as StartedStatusInfoTypeInfoOneOf,
      automationsV2Activation_universal_d_EndedStatusInfo as EndedStatusInfo,
      automationsV2Activation_universal_d_EndedStatusInfoTypeInfoOneOf as EndedStatusInfoTypeInfoOneOf,
      automationsV2Activation_universal_d_FailedStatusInfo as FailedStatusInfo,
      automationsV2Activation_universal_d_ActivationResumeAfterDelay as ActivationResumeAfterDelay,
      automationsV2Activation_universal_d_ActionCompletedRequest as ActionCompletedRequest,
      automationsV2Activation_universal_d_RefreshPayloadRequest as RefreshPayloadRequest,
      automationsV2Activation_universal_d_RefreshPayloadResponse as RefreshPayloadResponse,
      automationsV2Activation_universal_d_RunAutomationRequest as RunAutomationRequest,
      automationsV2Activation_universal_d_RunAutomationResponse as RunAutomationResponse,
      automationsV2Activation_universal_d_ActivationScheduleRequested as ActivationScheduleRequested,
      automationsV2Activation_universal_d_ActivationContinuedAfterSchedule as ActivationContinuedAfterSchedule,
      automationsV2Activation_universal_d_ReportEventRequest as ReportEventRequest,
      automationsV2Activation_universal_d_Idempotency as Idempotency,
      automationsV2Activation_universal_d_ReportEventResponse as ReportEventResponse,
      automationsV2Activation_universal_d_BulkReportEventRequest as BulkReportEventRequest,
      automationsV2Activation_universal_d_EventInfo as EventInfo,
      automationsV2Activation_universal_d_BulkReportEventResponse as BulkReportEventResponse,
      automationsV2Activation_universal_d_BulkReportEventResult as BulkReportEventResult,
      automationsV2Activation_universal_d_ItemMetadata as ItemMetadata,
      automationsV2Activation_universal_d_ApplicationError as ApplicationError,
      automationsV2Activation_universal_d_BulkActionMetadata as BulkActionMetadata,
      automationsV2Activation_universal_d_BulkCancelEventRequest as BulkCancelEventRequest,
      automationsV2Activation_universal_d_BulkCancelEventResponse as BulkCancelEventResponse,
      automationsV2Activation_universal_d_BulkCancelEventResult as BulkCancelEventResult,
      automationsV2Activation_universal_d_CancelEventRequest as CancelEventRequest,
      automationsV2Activation_universal_d_CancelEventResponse as CancelEventResponse,
      automationsV2Activation_universal_d_V1RunAutomationRequest as V1RunAutomationRequest,
      automationsV2Activation_universal_d_V1RunAutomationRequestIdentifierOneOf as V1RunAutomationRequestIdentifierOneOf,
      automationsV2Activation_universal_d_IdentifierType as IdentifierType,
      automationsV2Activation_universal_d_PreinstalledIdentifier as PreinstalledIdentifier,
      automationsV2Activation_universal_d_AutomationIdentifier as AutomationIdentifier,
      automationsV2Activation_universal_d_V1RunAutomationResponse as V1RunAutomationResponse,
      automationsV2Activation_universal_d_ReportDomainEventRequest as ReportDomainEventRequest,
      automationsV2Activation_universal_d_ReportDomainEventResponse as ReportDomainEventResponse,
      automationsV2Activation_universal_d_ExecuteFromActionRequest as ExecuteFromActionRequest,
      automationsV2Activation_universal_d_ExecuteFromActionResponse as ExecuteFromActionResponse,
      automationsV2Activation_universal_d_ActivationScheduleCompleted as ActivationScheduleCompleted,
      automationsV2Activation_universal_d_schedule as schedule,
      automationsV2Activation_universal_d_cancelPendingSchedule as cancelPendingSchedule,
      automationsV2Activation_universal_d_CancelPendingScheduleOptions as CancelPendingScheduleOptions,
      automationsV2Activation_universal_d_updatePendingSchedulesPayload as updatePendingSchedulesPayload,
      automationsV2Activation_universal_d_UpdatePendingSchedulesPayloadOptions as UpdatePendingSchedulesPayloadOptions,
      automationsV2Activation_universal_d_actionCompleted as actionCompleted,
      automationsV2Activation_universal_d_ActionCompletedOptions as ActionCompletedOptions,
      automationsV2Activation_universal_d_reportEvent as reportEvent,
      automationsV2Activation_universal_d_ReportEventOptions as ReportEventOptions,
      automationsV2Activation_universal_d_bulkReportEvent as bulkReportEvent,
      automationsV2Activation_universal_d_BulkReportEventOptions as BulkReportEventOptions,
      automationsV2Activation_universal_d_bulkCancelEvent as bulkCancelEvent,
      automationsV2Activation_universal_d_BulkCancelEventOptions as BulkCancelEventOptions,
      automationsV2Activation_universal_d_cancelEvent as cancelEvent,
      automationsV2Activation_universal_d_CancelEventOptions as CancelEventOptions,
      automationsV2Activation_universal_d_esbConfigResolverRunAutomation as esbConfigResolverRunAutomation,
      automationsV2Activation_universal_d_EsbConfigResolverRunAutomationOptions as EsbConfigResolverRunAutomationOptions,
      automationsV2Activation_universal_d_reportDomainEvent as reportDomainEvent,
      automationsV2Activation_universal_d_ReportDomainEventOptions as ReportDomainEventOptions,
    };
  }
  
  export { automationsV2Activation_universal_d as activations };
}
