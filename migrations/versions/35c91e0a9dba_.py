"""empty message

Revision ID: 35c91e0a9dba
Revises: c1dda6f4e75c
Create Date: 2023-12-24 22:14:15.628274

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35c91e0a9dba'
down_revision = 'c1dda6f4e75c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fundraiser', schema=None) as batch_op:
        batch_op.add_column(sa.Column('end_date', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('target_funds', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fundraiser', schema=None) as batch_op:
        batch_op.drop_column('target_funds')
        batch_op.drop_column('end_date')

    # ### end Alembic commands ###
