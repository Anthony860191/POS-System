GRANT USAGE, SELECT ON SEQUENCE auth_group_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE auth_group_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE auth_group_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE auth_group_id_seq TO csce315_904_hillis;


GRANT USAGE, SELECT ON SEQUENCE auth_group_permissions_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE auth_group_permissions_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE auth_group_permissions_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE auth_group_permissions_id_seq TO csce315_904_hillis;

GRANT USAGE, SELECT ON SEQUENCE auth_user_user_permissions_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE auth_user_user_permissions_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE auth_user_user_permissions_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE auth_user_user_permissions_id_seq TO csce315_904_hillis;

GRANT USAGE, SELECT ON SEQUENCE auth_user_groups_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE auth_user_groups_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE auth_user_groups_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE auth_user_groups_id_seq TO csce315_904_hillis;

GRANT USAGE, SELECT ON SEQUENCE django_admin_log_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE django_admin_log_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE django_admin_log_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE django_admin_log_id_seq TO csce315_904_hillis;

GRANT USAGE, SELECT ON SEQUENCE django_content_type_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE django_content_type_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE django_content_type_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE django_content_type_id_seq TO csce315_904_hillis;

GRANT USAGE, SELECT ON SEQUENCE django_migrations_id_seq TO csce315_904_mercado;
GRANT USAGE, SELECT ON SEQUENCE django_migrations_id_seq TO csce315_904_thorat;
GRANT USAGE, SELECT ON SEQUENCE django_migrations_id_seq TO csce315_904_carver;
GRANT USAGE, SELECT ON SEQUENCE django_migrations_id_seq TO csce315_904_hillis;

SELECT * from grant_permissions_to_table('auth_group');
SELECT * from grant_permissions_to_table('auth_group_permissions');
SELECT * from grant_permissions_to_table('auth_permission');
SELECT * from grant_permissions_to_table('auth_user');
SELECT * from grant_permissions_to_table('auth_user_groups');
SELECT * from grant_permissions_to_table('auth_user_user_permissions');
SELECT * from grant_permissions_to_table('django_admin_log');
SELECT * from grant_permissions_to_table('django_content_type');
SELECT * from grant_permissions_to_table('django_migrations');
SELECT * from grant_permissions_to_table('django_session');


