"""
Migration: Replace file_data BLOB with s3_key column in stored_files table
"""

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "replace_file_data_with_s3_key"
down_revision = "b5d1d17df847"
branch_labels = None
depends_on = None


def upgrade():
    # Add s3_key column
    op.add_column(
        "stored_files",
        sa.Column("s3_key", sa.String(length=512), nullable=False, server_default=""),
    )
    # Remove file_data column
    op.drop_column("stored_files", "file_data")


def downgrade():
    # Add file_data column back (as BLOB)
    op.add_column(
        "stored_files", sa.Column("file_data", sa.LargeBinary(), nullable=False)
    )
    # Remove s3_key column
    op.drop_column("stored_files", "s3_key")
