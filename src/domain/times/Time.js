'use strict'

module.exports = class {
    constructor(id = null, user_id, project_id, started_at, ended_at) {
        this.id = id
        this.user_id = user_id
        this.project_id = project_id
        this.started_at = started_at
        this.ended_at = ended_at
    }
}
