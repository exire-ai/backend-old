/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

function getShuffledArr (array){
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

allCategories = [
      {
        "title" : "Poke",
        "code" : "poke",
        "url" : "https://www.kitchensanctuary.com/wp-content/uploads/2018/01/Seared-Beef-Poke-Bowl-Recipe-tall-FS.jpg"
      },
      {
        "title" : "Barbeque",
        "code" : "barbeque",
        "url" : "https://www.smokedmeatsunday.com/wp-content/uploads/2019/06/BBQ-Chicken-Lollipops-1024x683.jpg"
      },
      {
        "title" : "Pizza",
        "code" : "pizza",
        "url" : "https://www.williams-sonoma.com/wsimgs/rk/images/dp/recipe/201935/0004/img1l.jpg"
      },
      {
        "title" : "Burgers",
        "code" : "burgers",
        "url" : "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps28800_UG143377D12_18_1b_RMS-696x696.jpg"
      },
      {
        "title" : "Cafe",
        "code" : "cafe",
        "url" : "https://visit.gent.be/sites/default/files/styles/header_mobile/public/img/poi/hero/PuurGent-DT007776.JPG?itok=HdM0jHs9"
      },
      {
        "title" : "Chinese",
        "code" : "chinese",
        "url" : "https://images2.minutemediacdn.com/image/upload/c_crop,h_695,w_1237,x_0,y_58/f_auto,q_auto,w_1100/v1554992472/shape/mentalfloss/521724-istock-545286388.jpg"
      },
      {
        "title" : "Italian",
        "code" : "italian",
        "url" : "https://bstatic.com/xdata/images/xphoto/1182x887/68794608.jpg?k=155689446d1aa48adbda2d0977fcd6d7608a9f9151562b5055f4baa366583eed&o=?size=S"
      },
      {
        "title" : "Japanese",
        "code" : "japanese",
        "url" : "https://www.restaurant-hospitality.com/sites/restaurant-hospitality.com/files/styles/article_featured_retina/public/pei-wei-bento-promo.gif?itok=D8HtDhgK"
      },
      {
        "title" : "Markets",
        "code" : "markets",
        "url" : "https://media.guestofaguest.com/t_article_content/gofg-media/2018/03/1/50605/chelsea.jpg"
      },
      {
        "title" : "Mexican",
        "code" : "mexican",
        "url" : "https://cdn.vox-cdn.com/thumbor/n-o6I2U_grf0OeAXY00igRIV2vI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/16182432/mannys_016.jpg"
      },
      {
        "title" : "Oriental",
        "code" : "oriental",
        "url" : "https://img.pixers.pics/pho_wat(s3:700/FO/42/16/16/65/700_FO42161665_9db43869012602dcfe07536f972af498.jpg,700,525,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,475,jpg)/wall-murals-oriental-food-indian-takeaway-at-a-london-s-market.jpg.jpg"
      },
      {
        "title" : "Sandwiches",
        "code" : "sandwiches",
        "url" : "https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/18742-italian-sub-600x600.jpg?ext=.jpg"
      },
      {
        "title" : "Sushi",
        "code" : "sushi",
        "url" : "https://qph.fs.quoracdn.net/main-qimg-0b24908e40c736744a109fba7b46234a"
      },
      {
        "title" : "American",
        "code" : "newamerican",
        "url" : "https://assets3.thrillist.com/v1/image/2752632/size/gn-gift_guide_variable_c.jpg"
      },
      {
        "title" : "Art",
        "code" : "artmuseums",
        "url" : "https://www.denverpost.com/wp-content/uploads/2016/04/20150402__20150405_E1_AE29FAFREEp1.jpg?w=620"
      },
      {
        "title" : "Museums",
        "code" : "museums",
        "url" : "https://img-aws.ehowcdn.com/700x/cdn.onlyinyourstate.com/wp-content/uploads/2019/01/35347215_10155317267210458_7349652585009119232_n-700x700.jpg"
      },
      {
        "title" : "Parks",
        "code" : "parks",
        "url" : "https://media.cntraveler.com/photos/543d39db00ac583c0af232ce/4:5/w_767,c_limit/central%2520park-0.jpg"
      },
      {
        "title" : "Galleries",
        "code" : "artgalleries",
        "url" : "https://img.theculturetrip.com/768x432/wp-content/uploads/2019/04/feature_vertical-gallery-chicago-_-8.jpg"
      },
      {
        "title" : "Arcades",
        "code" : "arcades",
        "url" : "https://cdn.vox-cdn.com/thumbor/seYFBo5tCxUbGwgE7q7oShZvIUU=/0x0:4000x2667/1200x900/filters:focal(1680x1014:2320x1654)/cdn.vox-cdn.com/uploads/chorus_image/image/56631551/shutterstock_636086801.1505195483.jpg"
      },
      {
        "title" : "Rock Climbing",
        "code" : "rockclimbing",
        "url" : "https://media.timeout.com/images/103425622/630/472/image.jpg"
      },
      {
        "title" : "Spa",
        "code" : "spa",
        "url" : "https://img.grouponcdn.com/iam/NG2PuHCH332Ax1sL19w4GDDyvyE/NG-1500x900/v1/c700x420.jpg"
      },
      {
        "title" : "Yoga",
        "code" : "yoga",
        "url" : "https://cdn.doyouyoga.com/articles/the-10-most-important-yoga-poses-for-beginners-25270-bbaRsJ6k.jpg=w768"
      },
        {
          "title" : "Extreme",
          "code" : "extreme",
          "url" : "https://images.squarespace-cdn.com/content/v1/59e802b9be42d61a159cbf16/1555322883123-F6FIUKYSUACRNM6G2640/ke17ZwdGBToddI8pDm48kB4nORySMPwEDaddUNIRril7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0jRb3i7UjwNNySrgFE_nWau3eoIbt6T219qcqUWV36JU8EtheewCadFuc6Byd4Wlqw/Caroline+Hsu+-+Head+Down+Movement.jpg"
        },
        {
            "title" : "Dancing",
            "code" : "dancing",
            "url" : "https://i.ytimg.com/vi/RXR1AojWh40/maxresdefault.jpg"
        },
      {
        "title" : "Acai",
        "code" : "acaibowl",
        "url" : "https://blog.williams-sonoma.com/wp-content/uploads/2016/12/jan-7-Acai-Bowl-with-Berries-and-Coconut.jpg"
      },
      {
        "title" : "Ice Cream",
        "code" : "icecream",
        "url" : "https://www.awesomealpharetta.com/wp-content/uploads/2018/07/icecream.jpg"
      },
      {
        "title" : "Bakeries",
        "code" : "bakeries",
        "url" : "https://d2j8c2rj2f9b78.cloudfront.net/uploads/poster-images/Sunflour-Baking-Company-22-of-91-resized.jpg"
      },
      {
        "title" : "Tea",
        "code" : "tea",
        "url" : "https://upload.wikimedia.org/wikipedia/commons/3/37/Nice_Cup_of_Tea.jpg"
      },
      {
        "title" : "Bars",
        "code" : "bars",
        "url" : "https://www.history.com/.image/t_share/MTU4NTE1Nzg2MDcwMTA3Mzk0/beer-oldest.jpg"
      },
      {
        "title" : "Pubs",
        "code" : "pubs",
        "url" : "https://ichef.bbci.co.uk/wwfeatures/live/624_351/images/live/p0/73/0p/p0730pfm.jpg"
      },
      {
        "title" : "Cocktails",
        "code" : "cocktailbars",
        "url" : "https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/09/30/10/cocktails.jpg?width=1000&height=614&fit=bounds&format=pjpg&auto=webp&quality=70&crop=16:9,offset-y0.5"
      },
      {
        "title" : "Speakeasies",
        "code" : "speakeasies",
        "url" : "https://blog.noblehousehotels.com/wp-content/uploads/2016/10/Bourbon-Branch_featured.jpg"
      },
      {
        "title" : "Clubs",
        "code" : "danceclubs",
        "url" : "https://media.timeout.com/images/102841498/630/472/image.jpg"
      },
      {
        "title" : "Karaoke",
        "code" : "karaoke",
        "url" : "https://cdn.vox-cdn.com/thumbor/e3hAjv2YiXVCxImynRxc4KgsVOQ=/0x0:1612x1072/1200x800/filters:focal(678x408:934x664)/cdn.vox-cdn.com/uploads/chorus_image/image/64036835/Event1.0.png"
      },
      {
        "title" : "Wine",
        "code" : "wine_bars",
        "url" : "https://www.kendall.edu/wp-content/uploads/2019/07/wine-professional-course-2.jpg"
      },
      {
        "title" : "Gelato",
        "code" : "gelato",
        "url" : "https://www.phillymag.com/wp-content/uploads/sites/3/2019/06/best-gelato-philadelphia-gran-caffe-laquila.jpg"
      }
]

module.exports = async function (req, res) {
  getShuffledArr(allCategories)
  res.json(
    allCategories
  )
}
