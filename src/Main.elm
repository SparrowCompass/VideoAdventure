module Main exposing (Msg(..), main, update, view)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


main =
    Browser.sandbox { init = 0, update = update, view = view }


type Msg
    = Increment
    | Decrement


update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1


view model =
    div []
        [ button [ class "btn-increment", onClick Decrement ] [ text "-" ]
        , div [ class "count" ] [ text (String.fromInt model) ]
        , button [ class "btn-decrement", onClick Increment ] [ text "+" ]
        ]
