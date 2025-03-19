import graphene
from .loan import LoanQueries

schema = graphene.Schema(query=LoanQueries,)