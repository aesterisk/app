CREATE SCHEMA aesterisk;

CREATE TABLE aesterisk.roles (
	role_id SERIAL PRIMARY KEY NOT NULL,
	role_name VARCHAR(255) NOT NULL,
	role_parent INTEGER DEFAULT NULL,
	CONSTRAINT fk_roles FOREIGN KEY(role_parent) REFERENCES aesterisk.roles(role_id)
);

CREATE TABLE aesterisk.permissions (
	permission_id SERIAL PRIMARY KEY NOT NULL,
	permission_name VARCHAR(255) NOT NULL
);

CREATE TABLE aesterisk.role_permissions (
	role_id INTEGER NOT NULL,
	permission_id INTEGER NOT NULL,
	CONSTRAINT fk_roles FOREIGN KEY(role_id) REFERENCES aesterisk.roles(role_id),
	CONSTRAINT fk_permissions FOREIGN KEY(permission_id) REFERENCES aesterisk.permissions(permission_id),
	PRIMARY KEY(role_id, permission_id)
);

CREATE INDEX ix_role_permissions_permission ON aesterisk.role_permissions(permission_id);

CREATE TABLE aesterisk.nodes (
	node_id SERIAL PRIMARY KEY NOT NULL,
	node_name VARCHAR(255) NOT NULL,
	node_last_active_at TIMESTAMP DEFAULT NULL,
	node_token VARCHAR(128) NOT NULL,
	node_salt VARCHAR(128) NOT NULL,
	node_last_external_ip VARCHAR(15) NOT NULL,
	node_ip_locked BOOLEAN NOT NULL,
	node_uuid VARCHAR(32) NOT NULL,
	node_network_ip_range VARCHAR(15) NOT NULL
);

CREATE INDEX ix_nodes_uuid ON aesterisk.nodes(node_uuid);

CREATE TABLE aesterisk.networks (
	network_id SERIAL PRIMARY KEY NOT NULL,
	network_name VARCHAR(255) NOT NULL,
	network_docker_id VARCHAR(255) NOT NULL,
	network_local_ip VARCHAR(15) NOT NULL
);

CREATE TABLE aesterisk.node_networks (
	node_id INTEGER NOT NULL,
	network_id INTEGER NOT NULL,
	CONSTRAINT fk_nodes FOREIGN KEY(node_id) REFERENCES aesterisk.nodes(node_id),
	CONSTRAINT fk_networks FOREIGN KEY(network_id) REFERENCES aesterisk.networks(network_id),
	PRIMARY KEY(node_id, network_id)
);

CREATE INDEX ix_node_networks_network ON aesterisk.node_networks(network_id);

CREATE TABLE aesterisk.servers (
	server_id SERIAL PRIMARY KEY NOT NULL,
	server_docker_id VARCHAR(255) NOT NULL,
	server_network INTEGER NOT NULL,
	CONSTRAINT fk_networks FOREIGN KEY(server_network) REFERENCES aesterisk.networks(network_id)
);

CREATE INDEX ix_servers_network ON aesterisk.servers(server_network);

CREATE TABLE aesterisk.node_servers (
	node_id INTEGER NOT NULL,
	server_id INTEGER NOT NULL,
	CONSTRAINT fk_nodes FOREIGN KEY(node_id) REFERENCES aesterisk.nodes(node_id),
	CONSTRAINT fk_servers FOREIGN KEY(server_id) REFERENCES aesterisk.servers(server_id),
	PRIMARY KEY(node_id, server_id)
);

CREATE INDEX ix_node_servers_server ON aesterisk.node_servers(server_id);

CREATE TABLE aesterisk.teams (
	team_id SERIAL PRIMARY KEY NOT NULL,
	team_path VARCHAR(255),
	team_name VARCHAR(255) NOT NULL,
	team_plan INTEGER NOT NULL,
	team_is_personal BOOLEAN NOT NULL,
	team_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aesterisk.team_nodes (
	team_id INTEGER NOT NULL,
	node_id INTEGER NOT NULL,
	CONSTRAINT fk_teams FOREIGN KEY(team_id) REFERENCES aesterisk.teams(team_id),
	CONSTRAINT fk_nodes FOREIGN KEY(node_id) REFERENCES aesterisk.nodes(node_id),
	PRIMARY KEY(team_id, node_id)
);

CREATE INDEX ix_team_nodes_node ON aesterisk.team_nodes(node_id);

CREATE TABLE aesterisk.accounts (
	account_id SERIAL PRIMARY KEY NOT NULL,
	account_gh_id VARCHAR(255) NOT NULL,
	account_email VARCHAR(255) NOT NULL,
	account_first_name VARCHAR(255) NOT NULL,
	account_last_name VARCHAR(255) DEFAULT NULL,
	account_avatar TEXT DEFAULT NULL,
	account_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	account_last_active_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	account_personal_team INTEGER NOT NULL,
	CONSTRAINT fk_teams FOREIGN KEY(account_personal_team) REFERENCES aesterisk.teams(team_id)
);

CREATE INDEX ix_accounts_gh_id ON aesterisk.accounts(account_gh_id);

CREATE TABLE aesterisk.users (
	user_id SERIAL PRIMARY KEY NOT NULL,
	user_account INTEGER NOT NULL,
	user_team INTEGER NOT NULL,
	user_joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_owner BOOLEAN NOT NULL,
	CONSTRAINT fk_accounts FOREIGN KEY(user_account) REFERENCES aesterisk.accounts(account_id),
	CONSTRAINT fk_teams FOREIGN KEY(user_team) REFERENCES aesterisk.teams(team_id)
);

CREATE INDEX ix_users_account ON aesterisk.users(user_account);
CREATE INDEX ix_users_team ON aesterisk.users(user_team);

CREATE TABLE aesterisk.user_roles (
	user_id INTEGER NOT NULL,
	role_id INTEGER NOT NULL,
	CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES aesterisk.users(user_id),
	CONSTRAINT fk_roles FOREIGN KEY(role_id) REFERENCES aesterisk.roles(role_id),
	PRIMARY KEY(user_id, role_id)
);

CREATE INDEX ix_user_roles_role ON aesterisk.user_roles(role_id);
