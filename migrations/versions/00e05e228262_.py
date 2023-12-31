"""empty message

Revision ID: 00e05e228262
Revises: dc1469b7c469
Create Date: 2023-12-30 09:33:15.941547

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00e05e228262'
down_revision = 'dc1469b7c469'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('contributions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('timestamp', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('contributions', schema=None) as batch_op:
        batch_op.drop_column('timestamp')

    # ### end Alembic commands ###
