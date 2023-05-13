module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


{-| This repo has a lot of what I'll need and it's even focused on interacting with a media element.
<https://github.com/vjousse/blog-nikola/tree/master/code/elm-audio/ports-elm-arch>

TL;DR: Use ports to interact with the DOM (where not supported by ELM) using JS. Probably I'll want
to figure out how to type-safe my JS with a build tool.

-}



-- MAIN


main =
    Browser.sandbox { init = init, update = update, view = view }


type alias Model =
    { isPaused : Bool }


init : Model
init =
    Model False


type Msg
    = Pause


update : Msg -> Model -> Model
update msg model =
    case msg of
        Pause ->
            { model | isPaused = not model.isPaused }


view : Model -> Html Msg
view model =
    div [ class "full-width" ]
        [ div [ class "absolute m-12 p-12", onClick Pause ]
            [ text
                (if model.isPaused then
                    "paused"

                 else
                    "not paused"
                )
            ]
        , video
            [ id "my-autoplay-player"
            , autoplay True
            , controls False
            , loop False
            , class "full-width"
            , attribute "crossorigin" "anonymous"
            , attribute "muted" "muted"
            ]
            [ source [ src "https://assets.imgix.video/videos/girl-reading-book-in-library.mp4?fm=mp4", type_ "video/mp4" ] [] ]
        ]
