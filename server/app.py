from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS
from graphql_apis.schema import schema
from restful_apis import restful_apis

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://numida-fse.vercel.app"]}})

app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

app.register_blueprint(restful_apis)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
