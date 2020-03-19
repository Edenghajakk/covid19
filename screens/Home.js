import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { connect } from "react-redux";
import {
  updateResults,
  updateTotal,
  updateCountries
} from "../redux/actions/userReducer";

import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");
import products from "../constants/products";
import axios from "axios";

class Home extends React.Component {
  componentDidMount() {
    axios({
      method: "GET",
      url: "https://api-hoaxy.p.rapidapi.com/articles",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
        "x-rapidapi-key": "3d441973b3msh022be63635ed551p19e279jsn9e3bd8a1b48d"
      },
      params: {
        sort_by: "relevant",
        use_lucene_syntax: "true",
        query: "covid 19"
      }
    })
      .then(response => {
        const { updateResults } = this.props;
        // console.log(response.data.articles);
        const results = response.data.articles;
        updateResults(results);
      })
      .catch(error => {
        console.log(error);
      });

    axios({
      method: "GET",
      url: "https://coronavirus-19-api.herokuapp.com/all",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        const { updateTotal } = this.props;
        // console.log(response.data);
        const results = response.data;
        updateTotal(results);
      })
      .catch(err => {
        console.log(err);
      });

    axios({
      method: "GET",
      url: "https://coronavirus-19-api.herokuapp.com/countries",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        const { updateCountries } = this.props;
        // console.log(response.data);
        const results = response.data;
        updateCountries(results);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate("Pro")}
      />
    );
  };

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              Categories
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="camera-18"
              family="GalioExtra"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              Best Deals
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderProducts = () => {
    const { results, viewPage, cases, countries, priceColor } = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        {viewPage === "NEWS" ? (
          <Block flex>
            {/* <Text>Latest News</Text> */}
            {results.map((data, index) => (
              <Product
                product={products[0]}
                data={data}
                horizontal
                key={index}
              />
            ))}
            {/* <Block flex row>
            <Product
              product={products[1]}
              style={{ marginRight: theme.SIZES.BASE, flex: 0.5, flexGrow: 0.5 }}
            />
            <Product
              product={products[2]}
              style={{ marginRight: theme.SIZES.BASE, flex: 0.5, flexGrow: 0.5 }}
            />
          </Block> */}
          </Block>
        ) : (
          <Block flex>
            <Block card flex>
              {/* {[styles.product, styles.shadow]} */}
              <TouchableWithoutFeedback>
                <Block flex space="between" style={styles.productDescription}>
                  <Block flex>
                    <Text size={14} style={styles.productTitle}>
                      Worldwide:
                    </Text>
                    <Text size={14} style={styles.productNumber}>
                      {cases.cases}
                    </Text>
                  </Block>
                  <Block flex>
                    <Text size={14} style={styles.productTitle}>
                      Recovered:
                    </Text>
                    <Text size={14} style={styles.productNumber}>
                      {cases.recovered}
                    </Text>
                  </Block>
                  <Block>
                    <Text size={14} style={styles.productTitle}>
                      Deaths:
                    </Text>
                    <Text size={14} style={styles.productNumber}>
                      {cases.deaths}
                    </Text>
                  </Block>
                </Block>
              </TouchableWithoutFeedback>
            </Block>
            <Block>
              {countries.map((c, index) => (
                <Block card flex style={[styles.product, styles.shadow]}>
                  <Block
                    flex
                    space="between"
                    style={styles.productDescription2}
                    key={index}
                  >
                    <Text size={16} style={styles.productTitleCountry}>
                      {c.country}
                    </Text>
                    <Block
                      flex
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginBottom: 6
                      }}
                    >
                      <Text size={12} style={styles.productSubTitle}>
                        Cases:{" "}
                        <Text style={{ fontWeight: "700" }}>{c.cases}</Text>
                      </Text>
                      <Text size={12} style={styles.productSubTitle}>
                        Active:{" "}
                        <Text style={{ fontWeight: "700" }}>{c.active}</Text>
                      </Text>
                      <Text size={12} style={styles.productSubTitle}>
                        Deaths:{" "}
                        <Text style={{ fontWeight: "700" }}>{c.deaths}</Text>
                      </Text>
                      <Text size={12} style={styles.productSubTitle}>
                        Critical:{" "}
                        <Text style={{ fontWeight: "700" }}>{c.critical}</Text>
                      </Text>
                    </Block>
                    <Block
                      flex
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginBottom: 6
                      }}
                    >
                      <Text size={12} style={styles.productSubTitle}>
                        Today's case:{" "}
                        <Text style={{ fontWeight: "700" }}>
                          {c.todayCases}
                        </Text>
                      </Text>
                      <Text size={12} style={styles.productSubTitle}>
                        Today's death:{" "}
                        <Text style={{ fontWeight: "700" }}>
                          {c.todayDeaths}
                        </Text>
                      </Text>
                      <Text size={12} style={styles.productSubTitle}>
                        Recovered:{" "}
                        <Text style={{ fontWeight: "700" }}>{c.recovered}</Text>
                      </Text>
                    </Block>
                  </Block>
                </Block>
              ))}
            </Block>
          </Block>
        )}
      </ScrollView>
    );
  };

  render() {
    const { results } = this.props;
    if (!results) {
      return (
        <Block flex center style={styles.home}>
          <Text>Please wait while we gather articles</Text>
        </Block>
      );
    }
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const mstp = ({ userReducer }) => ({
  results: userReducer.results,
  viewPage: userReducer.viewPage,
  cases: userReducer.cases,
  countries: userReducer.countries
});

const mdtp = {
  updateResults,
  updateTotal,
  updateCountries
};

export default connect(mstp, mdtp)(Home);

const styles = StyleSheet.create({
  home: {
    width: width
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300"
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  productDescription2: {
    padding: theme.SIZES.BASE / 2
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap"
    // paddingBottom: 6
  },
  productTitleCountry: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    fontWeight: "700",
    textAlign: "center"
  },
  productNumber: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
    fontWeight: "700"
  },
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2
  }
});
